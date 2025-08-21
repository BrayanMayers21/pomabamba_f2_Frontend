export default interface Notice {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string;
  category: { id: number; name: string };
  tags: { id: number; name: string }[];
  main_image: { url: string; file_name: string };
}

export interface NoticesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notice[];
}
