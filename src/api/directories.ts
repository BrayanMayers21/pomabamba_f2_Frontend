import client from "./axios";

export const getDirectories = (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  let url = `/core/directories/?page=${page}&page_size=${pageSize}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return client.get(url);
};

export const createDirectory = (data: FormData) =>
  client.post("/core/directories/", data);

export const updateDirectory = (id: number, data: FormData) =>
  client.put(`/core/directories/${id}/`, data);

export const deleteDirectory = (id: number) =>
  client.delete(`/core/directories/${id}/`);
