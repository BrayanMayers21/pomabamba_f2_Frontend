// src/data/news.ts

// src/data/news.ts

export interface NewsItem {
  id: string;         // identificador único (slug para la ruta)
  title: string;      // título de la noticia
  summary: string;    // resumen o introducción
  image: string;      // imagen principal
  date: string;       // fecha en formato ISO
  link: string;       // ruta completa (ej. /news/robotica-2025)
}


export const dummyNews: NewsItem[] = [
  {
    id: "pabellon-academico",
    title: "UNASAM inaugura moderno pabellón académico",
    summary:
      "La universidad presentó su nuevo pabellón con laboratorios equipados, destinado a mejorar la experiencia educativa.",
    image: "https://cdn.pixabay.com/photo/2022/01/18/23/53/reptile-6948539_960_720.jpg",
    date: "2025-06-15",
    link: "/news/pabellon-academico",
  },
  {
    id: "biblioteca-horario",
    title: "Nuevo horario extendido para la biblioteca central",
    summary:
      "La Biblioteca Central ahora atenderá hasta las 10:00 p.m. para brindar mayor apoyo a los estudiantes.",
    image: "https://media.istockphoto.com/id/530825560/photo/stuff-of-little-baby-crocodiles-are-hatching-from-eggs.jpg?s=1024x1024&w=is&k=20&c=CAjWj9SQuNhCliSQEdMoDyXYhjlMoldoTWqXf6X2ynY=",
    date: "2025-06-20",
    link: "/news/biblioteca-horario",
  },
  {
    id: "graduacion-2025",
    title: "Egresados celebran su ceremonia de graduación",
    summary:
      "Más de 300 estudiantes participaron de la ceremonia de graduación del semestre 2025-I.",
    image: "https://cdn.pixabay.com/photo/2025/06/27/07/36/dragon-9683286_1280.jpg",
    date: "2025-06-28",
    link: "/news/graduacion-2025",
  },
  {
    id: "centro-innovacion",
    title: "Lanzamiento del Centro de Innovación Tecnológica",
    summary:
      "Con equipos de última generación, este centro fomentará el desarrollo de proyectos de alto impacto.",
    image: "https://cdn.pixabay.com/photo/2013/10/19/05/22/sculpture-197773_1280.jpg",
    date: "2025-07-01",
    link: "/news/centro-innovacion",
  },
  {
    id: "robotica-premiada",
    title: "Equipo de robótica gana concurso regional",
    summary:
      "Estudiantes de Ingeniería Electrónica destacaron con su robot autónomo en una competencia regional.",
    image: "https://cdn.pixabay.com/photo/2016/09/27/13/06/sculpture-1698293_1280.jpg",
    date: "2025-07-03",
    link: "/news/robotica-premiada",
  },
];

