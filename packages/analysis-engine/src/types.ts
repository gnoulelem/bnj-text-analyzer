export type TAnalysisStatus = "ok" | "alert" | "error";

export interface IAnalysisResponse {
  score: number;
  status: TAnalysisStatus;
}