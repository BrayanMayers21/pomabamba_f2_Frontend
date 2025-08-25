export interface Alert {
  id: number;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  duration: number;
  image_url: string;
  link_url: string;
  is_active: boolean;
  priority: "low" | "medium" | "high" | "critical";
  start_date?: string;
  end_date?: string;
  target_audience?: string;
  
  created_at?: string;
  updated_at?: string;
}

export interface AlertCreate {
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  is_active: boolean;
  priority: "low" | "medium" | "high" | "critical";
  start_date?: string;
  end_date?: string;
  target_audience?: string;
}
