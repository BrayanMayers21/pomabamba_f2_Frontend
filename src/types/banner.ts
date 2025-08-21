export interface Banner {
  id: number;
  title: string;
  text?: string; // Campo 'text' en lugar de 'description'
  image: string;
  link?: string;
  start_date: string;
  end_date: string;
  status: "active" | "inactive"; // Campo 'status' en lugar de 'is_active'
  order?: number;
  banner_type?: "static" | "animated"; // Valores correctos del backend
}
