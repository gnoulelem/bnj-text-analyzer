import Fastify from "fastify";
import cors from "@fastify/cors";
import { 
  serializerCompiler, 
  validatorCompiler, 
  ZodTypeProvider 
} from "fastify-type-provider-zod";
import { analysisRoutes } from "./routes";
import { connectToDatabase } from './libs';

const server = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

await server.register(cors, { origin: true });
await server.register(analysisRoutes, { prefix: "/api" });

const start = async () => {
  try {
    // Initialize MongoDB connection
    await connectToDatabase();

    await server.listen({ port: 3001, host: "0.0.0.0" });
    console.log("🚀 API Gateway running on http://localhost:3001");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();