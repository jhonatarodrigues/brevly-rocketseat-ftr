import "./env.ts";
import fastifyCors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastify from "fastify";
import scalarUi from "@scalar/fastify-api-reference";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

//routes
import { ControllerLinks } from "./controller/link.ts";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    return reply
      .status(400)
      .send({ error: "Invalid request", details: error.validation });
  }

  console.error(error);
  reply.status(500).send({ error: "Internal Server Error" });
});

app.register(fastifyCors, {
  origin: "*",
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Brevly API",
      description: "API documentation for Brevly",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});

app.get("/openapi.json", () => app.swagger());
app.register(scalarUi, {
  routePrefix: "/docs",
});

app.register(ControllerLinks);

//insert bd
// await db.insert(schema.links).values({})

app.listen(
  { port: Number(process.env.PORT) ?? 3000, host: "0.0.0.0" },
  (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Server listening at ${address}`);
  }
);
