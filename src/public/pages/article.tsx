import { useState, useEffect } from "react";
import { Calendar, Clock, Eye } from "lucide-react";
import axios from "../../api/axios";
import type { Article } from "../../types/article";

const ArticleDetailPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [readingProgress, setReadingProgress] = useState(0);
  const [, setShowFloatingActions] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("/core/articles/");
        const articlesFromApi: Article[] = res.data.results;
        setArticles(articlesFromApi);
        // Selecciona el artículo con id 181 por defecto
        const mainArticle =
          articlesFromApi.find((a) => a.id === 181) || articlesFromApi[0];
        if (mainArticle) {
          setSelectedArticle(mainArticle);
          animateViews(mainArticle.views || 0);
        }
      } catch (error) {
        console.error("Error al cargar artículos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();

    const handleScroll = () => {
      const articleContent = document.querySelector(".article-content");
      if (articleContent) {
        const scrollTop = window.scrollY;
        const docHeight = articleContent.offsetHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = Math.max(
          0,
          Math.min(100, (scrollTop / (docHeight - winHeight)) * 100)
        );
        setReadingProgress(scrollPercent);
        setShowFloatingActions(scrollPercent > 20);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const animateViews = (targetViews) => {
    let currentViews = 0;
    const increment = Math.ceil(targetViews / 50);
    const timer = setInterval(() => {
      currentViews += increment;
      if (currentViews >= targetViews) {
        currentViews = targetViews;
        clearInterval(timer);
      }
      setViews(currentViews);
    }, 30);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-600 absolute inset-0"></div>
          </div>
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-4 w-48 rounded mx-auto"></div>
            <div className="animate-pulse bg-gray-200 h-3 w-32 rounded mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Artículo no encontrado
          </h2>
          <p className="text-gray-600 mb-8">
            El artículo que buscas no existe o ha sido eliminado.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative mt-20">
      {/* Barra de progreso de lectura */}
      <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-3">
            {/* Artículo */}
            <article className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden animate-fadeInUp article-content">
              {/* Hero section */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
                <img
                  src={selectedArticle.main_image}
                  alt={selectedArticle.title}
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Título sobre la imagen */}
                <div
                  className="absolute bottom-8 left-8 right-8 animate-slideInUp"
                  style={{ animationDelay: "0.3s" }}
                >
                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-2xl">
                    {selectedArticle.title}
                  </h1>
                </div>
              </div>

              {/* Contenido del artículo */}
              <div className="p-6 md:p-10">
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
                  <div
                    className="flex items-center space-x-3 animate-fadeInLeft"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <img
                      src={
                        selectedArticle.author?.avatar ||
                        "https://via.placeholder.com/80"
                      }
                      alt={selectedArticle.author?.full_name || "Autor"}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {selectedArticle.author?.full_name || "Autor"}
                      </p>
                      <p className="text-sm text-gray-500">Autor</p>
                    </div>
                  </div>

                  <div
                    className="flex flex-wrap gap-4 text-sm text-gray-600 animate-fadeInRight"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span>{formatDate(selectedArticle.publish_date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span>
                        Actualizado: {formatDate(selectedArticle.updated_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Contenido principal */}
                <div
                  className="prose prose-lg max-w-none animate-fadeInUp"
                  style={{ animationDelay: "0.7s" }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: selectedArticle.content,
                    }}
                    className="text-gray-700 leading-relaxed"
                  />
                </div>
              </div>
            </article>

            {/* Información del autor */}
            <div
              className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 mt-8 animate-fadeInUp"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-start space-x-6">
                <div className="relative">
                  <img
                    src={
                      typeof selectedArticle.author === "object" &&
                      selectedArticle.author?.avatar
                        ? selectedArticle.author.avatar
                        : "https://via.placeholder.com/80"
                    }
                    alt={
                      typeof selectedArticle.author === "object" &&
                      selectedArticle.author?.full_name
                        ? selectedArticle.author.full_name
                        : typeof selectedArticle.author === "string"
                          ? selectedArticle.author
                          : "Autor"
                    }
                    className="w-20 h-20 rounded-2xl object-cover border-4 border-blue-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-gray-800">
                      {typeof selectedArticle.author === "object" &&
                      selectedArticle.author?.full_name
                        ? selectedArticle.author.full_name
                        : typeof selectedArticle.author === "string"
                          ? selectedArticle.author
                          : "Autor"}
                    </h3>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Autor verificado
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mb-3">
                    {typeof selectedArticle.author === "object" &&
                    selectedArticle.author?.email
                      ? selectedArticle.author.email
                      : ""}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {typeof selectedArticle.author === "object" &&
                    selectedArticle.author?.bio
                      ? selectedArticle.author.bio
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              {/* Artículos relacionados */}
              <div
                className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-6 animate-fadeInUp"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-2 rounded-xl">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Otros artículos
                  </h3>
                </div>

                <div
                  className="space-y-6"
                  style={{
                    maxHeight: "400px",
                    overflowY: "auto",
                    paddingRight: "4px",
                  }}
                >
                  {articles
                    .filter((a) => a.id !== selectedArticle.id)
                    .map((article, index) => (
                      <div
                        key={article.id}
                        className="group cursor-pointer animate-slideInRight"
                        style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                        onClick={() => {
                          setSelectedArticle(article);
                          animateViews(article.views || 0);
                        }}
                      >
                        <div className="relative mb-3 overflow-hidden rounded-2xl">
                          <img
                            src={article.main_image}
                            alt={article.title}
                            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                              {article.category?.name || article.category_name}
                            </span>
                          </div>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {article.summary}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDateShort(article.publish_date)}</span>
                          </div>
                          <span className="text-blue-500 group-hover:text-blue-600 font-medium">
                            Ver &rarr;
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }

        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prose h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          margin: 2rem 0 1rem 0;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .prose ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .prose li {
          margin: 0.75rem 0;
          line-height: 1.7;
          position: relative;
        }

        .prose li::before {
          content: "▶";
          color: #3b82f6;
          position: absolute;
          left: -1.5rem;
          font-size: 0.8rem;
        }

        .prose strong {
          font-weight: 600;
          background: linear-gradient(135deg, #1f2937, #4b5563);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .prose p {
          margin: 1.5rem 0;
          line-height: 1.8;
          text-align: justify;
        }

        .prose em {
          font-style: italic;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #2563eb, #4f46e5);
        }
      `}</style>
    </div>
  );
};

export default ArticleDetailPage;
