import React from "react";
import { Badge } from "../../../../../components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import type Notice from "../../types/type";

// Interfaz tipada fuertemente para las columnas de Notice
export interface NoticeColumnConfig {
  key: keyof Notice | string; // keyof Notice para campos directos, string para campos anidados
  label: string | React.ReactNode;
  width?: string;
  isNumeric?: boolean;
  render?: (row: Notice) => React.ReactNode;
}

// Función helper para formatear fecha
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("es-ES");
};

// Función helper para truncar texto
const truncateText = (text: string, maxLength: number = 100) => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Configuración de columnas para Noticias - Sistema simplificado y tipado
export const NOTICE_COLUMNS: NoticeColumnConfig[] = [
  {
    key: "date",
    label: (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Fecha
      </div>
    ),
    width: "w-[140px]",
    render: (notice) => (
      <span className="text-muted-foreground">{formatDate(notice.date)}</span>
    ),
  },
  {
    key: "title",
    label: "Título",
    width: "min-w-[200px]",
    render: (notice) => (
      <div className="flex flex-col">
        <span className="font-semibold">{notice.title}</span>
        <span className="text-xs text-muted-foreground">{notice.slug}</span>
      </div>
    ),
  },

  {
    key: "category",
    label: "Categoría",
    width: "w-[120px]",
    render: (notice) => (
      <Badge variant="secondary">{notice.category.name}</Badge>
    ),
  },
  {
    key: "tags",
    label: (
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Etiquetas
      </div>
    ),
    render: (notice) => (
      <div className="flex flex-wrap gap-1">
        {notice.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="text-xs">
            {tag.name}
          </Badge>
        ))}
      </div>
    ),
  },
];

// Para compatibilidad con el código existente
export interface TableColumn {
  key: string;
  header: string | React.ReactNode;
  width?: string;
  render: (item: any) => React.ReactNode;
}

// Función para convertir NoticeColumnConfig a TableColumn
export const convertNoticeColumnsToTable = (
  configs: NoticeColumnConfig[]
): TableColumn[] => {
  return configs.map((config) => ({
    key: config.key as string,
    header: config.label,
    width: config.width,
    render: config.render || ((item) => item[config.key as keyof Notice]),
  }));
};

// Exportación principal para compatibilidad
export const defaultColumns = convertNoticeColumnsToTable(NOTICE_COLUMNS);
