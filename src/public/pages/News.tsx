// src/public/pages/News.tsx
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../../api/public/news";
import type { NewsItem } from "../../types/public/newsItem";
import { API_URL } from "../../config";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-10 gap-2">
    <div className="w-10 h-10 border-4 border-t-blue-700 border-gray-200 rounded-full animate-spin" />
    <span className="text-gray-600">Cargando noticias...</span>
  </div>
);

// Función para extraer texto plano de HTML
const extractTextFromHTML = (html: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

// Función para formatear fecha
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formateando fecha:", error);
    return dateString;
  }
};

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 3;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchNews(page, limit)
      .then((res) => {
        if (cancelled) return;

        // Transformar los datos del backend al formato NewsItem
        const adapted: NewsItem[] = res.data.map((item: any) => {
          // Extraer texto plano del HTML si es necesario
          const summary = item.body
            ? extractTextFromHTML(item.body).slice(0, 120).trim() + "..."
            : item.summary || "Sin resumen disponible";

          // Construir URL de imagen
          const image =
            item.main_image && item.main_image.url
              ? item.main_image.url.startsWith("http")
                ? item.main_image.url
                : `${API_URL}${item.main_image.url}`
              : "/placeholder.svg";

          return {
            id: item.slug || item.id.toString(),
            title: item.title,
            summary: summary,
            image: image,
            date: formatDate(item.date),
            link: `/noticias/${item.slug}`,
          };
        });

        setNews(adapted);
        setTotal(res.total);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error("Error cargando noticias:", e);
        setError("No se pudo cargar las noticias. Intenta de nuevo.");
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Función para refrescar noticias manualmente
  const handleRefresh = () => {
    setNews([]);
    setPage(1);
    // El useEffect se ejecutará automáticamente cuando page cambie
  };

  return (
    <section className="bg-gray-100 min-h-[75vh] px-4 py-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-800">
            Todas las noticias
          </h1>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            title="Actualizar noticias"
          >
            <i className="fas fa-sync-alt"></i>
            <span>Actualizar</span>
          </button>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 text-sm">
            {total > 0 ? (
              <>
                Mostrando {news.length} de {total} noticias
              </>
            ) : (
              <>
                Aquí encontrarás todas las noticias y actualizaciones de la UGEL
                Pomabamba.
              </>
            )}
          </p>
          {total > 0 && (
            <p className="text-gray-500 text-xs">
              Página {page} de {totalPages}
            </p>
          )}
        </div>

        {loading && <Spinner />}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
            <i className="fas fa-exclamation-triangle mr-2"></i>
            {error}
            <button
              onClick={handleRefresh}
              className="ml-3 text-sm underline hover:no-underline"
            >
              Intentar de nuevo
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.length ? (
                news.map((item) => <NewsCard key={item.id} {...item} />)
              ) : (
                <div className="col-span-full text-center text-gray-600">
                  No hay noticias para mostrar.
                </div>
              )}
            </div>

            {/* Paginación con flechas */}
            <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
              <button
                onClick={() => goTo(page - 1)}
                disabled={!canPrev}
                aria-label="Página anterior"
                className={`px-3 py-2 rounded flex items-center gap-1 font-medium border ${
                  canPrev
                    ? "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                Anterior
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i + 1)}
                  aria-label={`Ir a la página ${i + 1}`}
                  className={`px-4 py-2 rounded border font-medium ${
                    page === i + 1
                      ? "bg-blue-700 text-white border-blue-700"
                      : "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => goTo(page + 1)}
                disabled={!canNext}
                aria-label="Página siguiente"
                className={`px-3 py-2 rounded flex items-center gap-1 font-medium border ${
                  canNext
                    ? "bg-white text-blue-700 border-blue-700 hover:bg-blue-50"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Siguiente
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
