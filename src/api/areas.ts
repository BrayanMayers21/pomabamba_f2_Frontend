import client from "./axios";
import type { Area } from "../types/area";

// Métodos para consumir endpoints de áreas
export const getAreas = () => client.get<Area[]>("/areas/");
export const createArea = (data: Partial<Area>) => client.post("/areas/", data);
export const updateArea = (id: number, data: Partial<Area>) => client.put(`/areas/${id}`, data);
export const deleteArea = (id: number) => client.delete(`/areas/${id}`);
