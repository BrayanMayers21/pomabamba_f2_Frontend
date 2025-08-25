import client from "./axios";
import type { Alert, AlertCreate } from "../types/alert";

export const getAlerts = () => client.get<Alert[]>("/core/alerts/");
export const createAlert = (data: AlertCreate) =>
  client.post("/core/alerts/", data);
export function updateAlert(id: number, data: Partial<AlertCreate>) {
  return client.put(`/core/alerts/${id}/`, data);
}
export const deleteAlert = (id: number) => client.delete(`/core/alerts/${id}/`);
export const toggleAlertStatus = (id: number, is_active: boolean) =>
  client.patch(`/core/alerts/${id}/`, { is_active });
