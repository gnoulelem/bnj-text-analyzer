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

    const saved = await this.repository.save({ text, score, status })

    return {
      _id: saved._id,
      text: saved.text,
      score,
      status,
      createdAt: saved.createdAt
    };
  }

  /**
   * Get analysis history
   * @param {number} skip 
   * @returns {Promise<IAnalysisDocument[]>}
   */
  async getHistory(skip: number): Promise<IAnalysisDocument[]> {
    const documents = await this.repository.findAll(skip);

    return documents.map(doc => ({
      _id: doc._id,
      text: doc.text,
      score: doc.score,
      status: doc.status,
      createdAt: doc.createdAt
    }));
  }
}