import { FastifyRequest, FastifyReply } from "fastify";
import { AnalysisService } from "../services";

const service = new AnalysisService();

/**
 * Handle text analysis request
 * @param {FastifyRequest<{ Body: { text: string } }>} request 
 * @param {FastifyReply} reply 
 * @returns {Promise<FastifyReply>}
 */
export const analyzeHandler = async (
  request: FastifyRequest<{ Body: { text: string } }>,
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const { text } = request.body;
    const { score, status } = await service.processAnalysis(text);

    return reply.code(200).send({
      score,
      status
    });
  } catch (error) {
    return reply.code(500).send({ status: "error", message: "Internal Server Error" });
  }
};

/**
 * Handle text analysis history
 * @param {FastifyRequest<{ Querystring: { skip: string } }>} request 
 * @param {FastifyReply} reply 
 * @returns {Promise<FastifyReply>}
 */
export const historyHandler = async (
  request: FastifyRequest<{ Querystring: { skip: string } }>, 
  reply: FastifyReply
): Promise<FastifyReply> => {
  try {
    const { skip } = request.query;
    const history = await service.getHistory(Number.parseInt(skip));
    
    return reply.code(200).send(history);
  } catch (error) {
    console.error(error);
    return reply.code(500).send({ status: "error", message: "Error fetching history" });
  }
};