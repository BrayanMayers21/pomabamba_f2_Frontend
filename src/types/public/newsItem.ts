export interface NewsItem {
  id: string;         // identificador único (slug para la ruta)
  title: string;      // título de la noticia
  summary: string;    // resumen o introducción
  image: string;      // imagen principal
  date: string;       // fecha en formato ISO
  link: string;       // ruta completa (ej. /news/robotica-2025)
}