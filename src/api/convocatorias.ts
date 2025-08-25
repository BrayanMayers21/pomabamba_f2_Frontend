import client from "./axios";

export const getConvocatorias = (params?: Record<string, any>) =>
  client.get("/core/convocatorias/", { params });
export const getDetalleConvocatorias = (id: number) =>
  client.get(`/core/convocatorias/${id}/`);
export const createConvocatoria = (data: FormData) =>
  client.post("/core/convocatorias/", data);
export const updateConvocatoria = (id: number, data: FormData) =>
  client.put(`/core/convocatorias/${id}/`, data);
export const deleteConvocatoria = (id: number) =>
  client.delete(`/core/convocatorias/${id}/`);
