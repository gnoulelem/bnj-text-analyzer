import { FastifyInstance } from "fastify";
import { analyzeHandler, historyHandler } from "../controllers";
import { AnalyzeSchema, HistoryQuerySchema } from "../schemas";

/**
 * Analysis HTTP routes
 * @param {FastifyInstance} fastify 
 * @returns {Promise<void>}
 */
export async function analysisRoutes(
  fastify: FastifyInstance
): Promise<void> {
  fastify.post("/analyze", {
    schema: AnalyzeSchema
  }, analyzeHandler);


  fastify.get("/history", {
    schema: HistoryQuerySchema
  }, historyHandler);
}