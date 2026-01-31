import { FastifyInstance } from "fastify";
import { analyzeHandler } from "../controllers/analysis.controller.js";
import { AnalyzeSchema } from "../schemas/analysis.schema.js";

export async function analysisRoutes(fastify: FastifyInstance) {
  fastify.post("/analyze", { 
    schema: AnalyzeSchema
  }, analyzeHandler);


  fastify.get("/history", async (request, reply) => {
    return reply.send([]); 
  });
}