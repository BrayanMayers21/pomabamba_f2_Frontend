import client from "./axios";

export const getAuthors = (
  page: number = 1,
  pageSize: number = 10,
  search: string = ""
) => {
  let url = `/core/authors/?page=${page}&page_size=${pageSize}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  return client.get(url);
};

export const createAuthor = (data: FormData) =>
  client.post("/core/authors/", data);

export const updateAuthor = (id: number, data: FormData) =>
  client.put(`/core/authors/${id}/`, data);

export const deleteAuthor = (id: number) =>
  client.delete(`/core/authors/${id}/`);
