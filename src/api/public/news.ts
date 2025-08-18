// src/api/news.ts
import axios from "axios";
import type { NewsItem } from "../../types/public/newsItem";
import { API_URL } from "../../config";

export interface PaginatedResponse {
  data: NewsItem[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchNews = async (page: number, limit: number = 6) => {
  const skip = (page - 1) * limit;
  const response = await axios.get<PaginatedResponse>(`${API_URL}/notices/`, {
    params: { skip, limit },
  });
  return response.data;
};
