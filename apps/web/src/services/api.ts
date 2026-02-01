import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export interface IAnalysisResult {
  id: string;
  text: string;
  score: number;
  status: 'ok' | 'alert' | 'error';
  createdAt: string;
}

export const analyzeText = async (text: string): Promise<IAnalysisResult> => {
  const { data } = await api.post('/analyze', { text });
  return data;
};

export const fetchHistory = async (skip: number = 0): Promise<IAnalysisResult[]> => {
  const { data } = await api.get(`/history?skip=${skip}`);
  return data;
};