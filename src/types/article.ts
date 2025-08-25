export interface Article {
  id: number;
  title: string;
  summary?: string;
  content: string;
  main_image?: string;
  status: "publicado" | "borrador";
  publish_date?: string;
  created_at?: string;
  updated_at?: string;
  views?: number;
  likes?: number;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
  category_name?: string;
  tags?: { id: number; name: string }[];
  author?: {
    id: number;
    full_name: string;
    bio?: string;
    email?: string;
    avatar?: string;
  };
}

export interface ArticleCreate {
  title: string;
  content: string;
  author?: string;
  is_active?: boolean;
}
