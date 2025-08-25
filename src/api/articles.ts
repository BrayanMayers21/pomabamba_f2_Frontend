import client from "./axios";

// Tipos básicos para artículos (ajusta según tu backend)
export interface Article {
  id: number;
  title: string;
  content: string;
  status: "publicado" | "borrador";
  main_image?: string;
  author?: string;
  created_at?: string;
  updated_at?: string;
  // Agrega más campos según tu modelo
}

export interface ArticleCreate {
  title: string;
  content: string;
  author?: string;
  // Otros campos requeridos
}

// API REST
export const getArticles = (params?: any) =>
  client.get("/core/articles/", { params });
export const createArticle = (data: FormData) =>
  client.post("/core/articles/", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateArticle = (id: number, data: Partial<ArticleCreate>) =>
  client.put(`/core/articles/${id}/`, data);
export const deleteArticle = (id: number) =>
  client.delete(`/core/articles/${id}/`);
// Si el backend tiene activar/desactivar, puedes agregar:
export const toggleArticleStatus = (id: number, is_active: boolean) =>
  client.patch(`/core/articles/${id}/`, { is_active });
