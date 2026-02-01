import { Collection, ObjectId } from "mongodb";
import { db } from "../libs";

export interface IAnalysisDocument {
  _id: ObjectId;
  text: string;
  score: number;
  status: string;
  createdAt: Date;
}

export class AnalysisRepository {
  /**
   * Get MongoDB collection
   * @returns {Collection<IAnalysisDocument>}
   */
  private get collection(): Collection<Omit<IAnalysisDocument, '_id'>> {
    return db.collection<Omit<IAnalysisDocument, '_id'>>("analyses");
  }

  /**
   * Save analysis
   * @param {Omit<IAnalysisDocument, "_id" | "createdAt">} data 
   * @returns {Promise<IAnalysisDocument>}
   */
  async save(data: Omit<IAnalysisDocument, "_id" | "createdAt">): Promise<IAnalysisDocument> {
    const doc: Omit<IAnalysisDocument, '_id'> = {
      ...data,
      createdAt: new Date()
    };
    
    const result = await this.collection.insertOne(doc);
    return { ...doc, _id: result.insertedId };
  }

  /**
   * Find analysis
   * @param {number} skip 
   * @param {number} limit 
   * @returns {Promise<IAnalysisDocument[]>}
   */
  async findAll(skip: number = 0, limit: number = 5): Promise<IAnalysisDocument[]> {
    return await this.collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }
}