import z from "zod";

export const LinksPostSchema = {
  schema: {
    summary: "Generate a link",
    body: z.object({
      url: z.string().url(),
      shortUrl: z.string().optional(),
    }),
    response: {
      200: z.object({
        message: z.string(),
        shortUrl: z.string(),
      }),
      400: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LinksDeleteSchema = {
  schema: {
    summary: "Delete a link",
    params: z.object({
      id: z.string().uuid(),
    }),
    response: {
      200: z.object({
        message: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LinksGetUrlOriginalSchema = {
  schema: {
    summary: "Get original URL from code",
    params: z.object({
      code: z.string(),
    }),
    response: {
      200: z.object({
        originalUrl: z.string(),
        id: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LinksListSchema = {
  schema: {
    summary: "Get all links",
    response: {
      200: z.object({
        links: z.array(
          z.object({
            id: z.string(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            createdAt: z.date(),
            visits: z.number(),
          })
        ),
      }),
      404: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LinksIncrementVisitSchema = {
  schema: {
    summary: "Increment visit count for a short URL",
    params: z.object({
      id: z.string().uuid(),
    }),
    response: {
      200: z.object({
        message: z.string(),
        visits: z.number(),
      }),
      404: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};

export const LinksExportCsvSchema = {
  schema: {
    summary: "Export links to CSV",
    response: {
      200: z.object({
        url: z.string(),
      }),
      404: z.object({
        message: z.string(),
      }),
      500: z.object({
        message: z.string(),
      }),
    },
  },
};
