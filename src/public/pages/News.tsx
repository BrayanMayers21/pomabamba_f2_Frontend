// src/public/pages/AllNews.tsx
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import { fetchNews } from "../../api/public/news";
import type { NewsItem } from "../data/news";
import { API_URL } from "../../config";

const Spinner: React.FC = () => (
  <div className="flex justify-center items-center py-10 gap-2">
    <div className="w-10 h-10 border-4 border-t-blue-700 border-gray-200 rounded-full animate-spin" />
    <span className="text-gray-600">Cargando noticias...</span>
  </div>
);

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
        // Adaptar al tipo NewsItem si tu fetchNews devuelve el objeto { data, total }
        const adapted: NewsItem[] = res.data.map((item: any) => ({
          id: item.slug,
          title: item.title,
          summary: item.body
            .replace(/<[^>]+>/g, "") // si viene con HTML, lo quitas
            .slice(0, 120)
            .trim() + "...",
          image: item.main_image ? API_URL + item.main_image.url : "/placeholder.jpg",
          date: item.date,
          link: `/noticias/${item.slug}`,
        }));
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

  return (
    <section className="bg-gray-100 min-h-[75vh] px-4 py-8">
      <div className="container mx-auto">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Todas las noticias</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <p className="text-gray-600 mb-6 text-sm">
          Aquí encontrarás todas las noticias y actualizaciones de la UGEL Pomabamba.
        </p>

        {loading && <Spinner />}

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {news.length
                ? news.map((item) => (
                    <NewsCard key={item.id} {...item} />
                  ))
                : (
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
