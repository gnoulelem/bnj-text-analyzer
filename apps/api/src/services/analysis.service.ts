import { analyzeText, IAnalysisResponse } from "@bnj/analysis-engine";
import { AnalysisRepository, IAnalysisDocument } from "../repositories";

export class AnalysisService {
  private repository = new AnalysisRepository();

  /**
   * Process text analysis
   * @param {string} text 
   * @returns {Promise<IAnalysisResponse>}
   */
  async processAnalysis(text: string): Promise<IAnalysisResponse> {
    const score = analyzeText(text);

    const status = score > 40 ? "ok" : "alert";

    await this.repository.save({ text, score, status })

    return {
      score,
      status
    };
  }

  /**
   * Get analysis history
   * @param {number} skip 
   * @returns {Promise<IAnalysisDocument[]>}
   */
  async getHistory(skip: number): Promise<IAnalysisDocument[]> {
    const limit = 10;
    const documents = await this.repository.findAll(skip, limit);

    return documents.map(doc => ({
      id: doc._id?.toString(),
      text: doc.text,
      score: doc.score,
      status: doc.status,
      createdAt: doc.createdAt
    }));
  }
}