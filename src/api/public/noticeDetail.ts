export type NoticeDetail = {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string;
  category: { id: number; name: string };
  tags: { id: number; name: string }[];
  images: { file_name: string; url: string; is_main: boolean }[];
};
