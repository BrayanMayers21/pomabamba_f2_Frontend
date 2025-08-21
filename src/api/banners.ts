import client from "./axios";
import type { Banner } from "../types/banner";

// Interfaz para la respuesta paginada de la API
interface PaginatedBannerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Banner[];
}

// Interfaz para los parámetros de consulta
interface BannerQueryParams {
  page?: number;
  page_size?: number;
  search?: string;
}

// Métodos para consumir endpoints de banners
export const getBanners = (params?: BannerQueryParams) => {
  const queryParams = new URLSearchParams();

  if (params?.page) {
    queryParams.append("page", params.page.toString());
  }

  if (params?.page_size) {
    queryParams.append("page_size", params.page_size.toString());
  }

  if (params?.search && params.search.trim()) {
    queryParams.append("search", params.search.trim());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `/core/banners/?${queryString}` : "/core/banners/";

  return client.get<PaginatedBannerResponse>(url);
};

export const createBanner = (data: FormData) =>
  client.post<Banner>("/core/banners/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const updateBanner = (id: number, data: FormData) =>
  client.put<Banner>(`/core/banners/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteBanner = (id: number) =>
  client.delete(`/core/banners/${id}/`);
