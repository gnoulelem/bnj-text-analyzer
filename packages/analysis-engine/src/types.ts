import { ObjectId } from "mongodb";
export type TAnalysisStatus = "ok" | "alert" | "error";

export interface IAnalysisResponse {
  _id: ObjectId;
  text: string;
  score: number;
  status: TAnalysisStatus;
  createdAt: Date;
}