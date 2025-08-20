// src/api/news.ts
import axios from "axios";
import type { NewsItem } from "../../types/public/newsItem";
import { API_URL } from "../../config";

export interface PaginatedResponse {
  results: any[];
  count: number;
  next?: string;
  previous?: string;
}

export const fetchNews = async (page: number, limit: number = 6) => {
  try {
    const response = await axios.get<PaginatedResponse>(
      `${API_URL}/api/v1/core/notices/`,
      {
        params: {
          page: page,
          page_size: limit,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return {
      data: response.data.results || [],
      total: response.data.count || 0,
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};
