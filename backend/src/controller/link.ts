import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db, pg } from "#src/db/index.ts";
import { links } from "#src/db/schemas/links.ts";
import { desc, eq, like } from "drizzle-orm";
import { generateShortUrlFromUrl } from "#src/utils/functions.ts";
import {
  LinksDeleteSchema,
  LinksExportCsvSchema,
  LinksGetUrlOriginalSchema,
  LinksIncrementVisitSchema,
  LinksListSchema,
  LinksPostSchema,
} from "#src/controller/types/links.ts";
import { stringify } from "csv-stringify";
import { pipeline } from "node:stream/promises";
import { PassThrough, Transform } from "node:stream";
import { uploadFileToStorage } from "#src/storage/upload-file-to-storage.ts";

export const ControllerLinks: FastifyPluginAsyncZod = async (app) => {
  app.post("/generate-link", LinksPostSchema, async (request, reply) => {
    const { url, shortUrl } = request.body;

    try {
      let shortUrlData = shortUrl;
      const urlCheck = await db
        .select()
        .from(links)
        .where(eq(links.originalUrl, url))
        .limit(1);

      if (urlCheck.length > 0) {
        return reply.status(400).send({ message: "URL original já existente" });
      }

      let shortUrlCheck;

      if (shortUrl) {
        shortUrlCheck = await db
          .select()
          .from(links)
          .where(eq(links.shortUrl, shortUrl))
          .limit(1);
      } else {
        shortUrlData = generateShortUrlFromUrl(url);

        shortUrlCheck = await db
          .select()
          .from(links)
          .where(eq(links.shortUrl, shortUrlData))
          .limit(1);
      }

      if (shortUrlCheck.length > 0 && shortUrlCheck[0].originalUrl !== url) {
        return reply.status(400).send({
          message: "Short URL gerada já está em uso para outra URL",
        });
      }

      if (!shortUrlData) {
        reply.status(400).send({ message: "Short URL inválida" });
        return;
      }

      await db
        .insert(links)
        .values({ originalUrl: url, shortUrl: shortUrlData });

      reply.send({
        message: "Link gerado com sucesso",
        shortUrl: shortUrlData,
      });
    } catch (error) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.delete("/delete-link/:id", LinksDeleteSchema, async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const link = await db
        .select()
        .from(links)
        .where(eq(links.id, id))
        .limit(1);

      if (link.length === 0) {
        return reply.status(404).send({ message: "Link não encontrado" });
      }

      await db.delete(links).where(eq(links.id, id));

      reply.send({ message: "Link deletado com sucesso" });
    } catch (error) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.get(
    "/get-original-url",
    LinksGetUrlOriginalSchema,
    async (request, reply) => {
      const { code } = request.query as { code: string };

      try {
        const link = await db
          .select()
          .from(links)
          .where(like(links.shortUrl, `%${code}%`))
          .limit(1);

        if (link.length === 0) {
          return reply.status(404).send({ message: "Link não encontrado" });
        }

        reply.send({ originalUrl: link[0].originalUrl, id: link[0].id });
      } catch (error) {
        reply.status(500).send({ message: "Erro interno do servidor" });
      }
    }
  );

  app.get("/", LinksListSchema, async (_request, reply) => {
    try {
      const response = await db
        .select()
        .from(links)
        .orderBy(desc(links.createdAt));

      if (response.length === 0) {
        return reply.status(404).send({ message: "Nenhum link encontrado" });
      }

      reply.send({ links: response });
    } catch (error) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });

  app.put(
    "/increment-visit/:id",
    LinksIncrementVisitSchema,
    async (request, reply) => {
      const { id } = request.params as { id: string };

      try {
        const link = await db
          .select()
          .from(links)
          .where(eq(links.id, id))
          .limit(1);

        if (link.length === 0) {
          return reply.status(404).send({ message: "Link não encontrado" });
        }

        const updatedVisits = (link[0].visits || 0) + 1;

        await db
          .update(links)
          .set({ visits: updatedVisits })
          .where(eq(links.id, id));

        reply.send({
          message: "Contador de visitas incrementado com sucesso",
          visits: updatedVisits,
        });
      } catch (error) {
        reply.status(500).send({ message: "Erro interno do servidor" });
      }
    }
  );

  app.get("/export-csv", LinksExportCsvSchema, async (_request, reply) => {
    try {
      const { sql, params } = db
        .select({
          id: links.id,
          originalUrl: links.originalUrl,
          shortUrl: links.shortUrl,
          visits: links.visits,
          createdAt: links.createdAt,
        })
        .from(links)
        .toSQL();

      const cursor = pg.unsafe(sql, params as string[]).cursor(2);

      const csv = stringify({
        delimiter: ",",
        header: true,
        columns: [
          { key: "original_url", header: "Original URL" },
          { key: "short_url", header: "Short URL" },
          { key: "visits", header: "Visits" },
          { key: "created_at", header: "Created At" },
        ],
      });

      const uploadToStorageStream = new PassThrough();

      const convertToCSVPipeline = pipeline(
        cursor,
        new Transform({
          objectMode: true,
          transform(chunks: unknown[], encoding, callback) {
            for (const chunk of chunks) {
              this.push(chunk);
            }

            callback();
          },
        }),
        csv,
        uploadToStorageStream
      );

      const uploadToStorage = uploadFileToStorage({
        contentType: "text/csv",
        folder: "downloads",
        fileName: `${new Date().toISOString()}-uploads.csv`,
        contentStream: uploadToStorageStream,
      });

      const [{ url }] = await Promise.all([
        uploadToStorage,
        convertToCSVPipeline,
      ]);

      reply.send({ url });
    } catch (error) {
      reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });
};
