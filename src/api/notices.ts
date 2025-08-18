import client from "./axios";
import type { Notice } from "../types/notice";

export const getNoticeCategories = () => client.get("/notice-categories/");
export const getTags = () => client.get("/tags/");

export const createNotice = (formData: FormData) =>
  client.post("/notices/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// api/notices.ts
export const getNotices = () => client.get<{ data: Notice[] }>("/notices/");
