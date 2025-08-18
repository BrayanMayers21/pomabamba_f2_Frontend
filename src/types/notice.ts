import type { Tag } from "./tag";
import type { NoticeCategory } from "./noticeCategory";

export interface Notice {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string; // formato: YYYY-MM-DD
  notice_category: NoticeCategory;
  tags: Tag[];
  images: NoticeImage[];
  created_at: string;
  updated_at: string;
}

export interface NoticeImage {
  id: number;
  path: string;
  file_name: string;
  is_main: boolean;
  notice_id: number;
}
