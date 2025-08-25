import client from "./axios";

export const getCategories = (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  let url = `/core/category/?page=${page}&page_size=${pageSize}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return client.get(url);
};
export const createCategory = (data: FormData) =>
  client.post("/core/category/", data);
export const updateCategory = (id: number, data: FormData) =>
  client.put(`/core/category/${id}/`, data);
export const deleteCategory = (id: number) =>
  client.delete(`/core/category/${id}/`);
