import client from "./axios";

export const getAuthors = () => client.get("/core/authors/");
export const getCategories = () => client.get("/core/category/");
