"use client";

import type React from "react";

import { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

// Interfaz para los datos que vienen del API (actualizada para coincidir con el backend)
interface NoticeImage {
  url: string;
  file_name: string;
}

interface NoticeCategory {
  id: number;
  name: string;
}

interface NoticeTag {
  id: number;
  name: string;
}

interface NoticeFromAPI {
  id: number;
  title: string;
  slug: string;
  body: string;
  date: string;
  category: NoticeCategory;
  tags: NoticeTag[];
  main_image: NoticeImage | null;
}

// Interfaz para el formato interno del componente
interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  date: string;
  link: string;
  category: string;
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Función para formatear fecha
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString; // Si hay error, devolver la fecha original
    }
  };

  // Función para extraer texto plano del HTML (si el body contiene HTML)
  const extractTextFromHTML = (html: string): string => {
    try {
      // Crear un elemento temporal para extraer solo el texto
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      return tempDiv.textContent || tempDiv.innerText || "";
    } catch {
      return html; // Si hay error, devolver el contenido original
    }
  };

  // Función para convertir los datos del API al formato interno
  const transformNoticeToNewsItem = (notice: NoticeFromAPI): NewsItem => {
    // Extraer texto plano del body por si contiene HTML
    const plainTextBody = extractTextFromHTML(notice.body);

    // Extraer un resumen del body (primeras 150 caracteres)
    const summary =
      plainTextBody.length > 150
        ? plainTextBody.substring(0, 150) + "..."
        : plainTextBody;

    // Usar imagen principal o una imagen por defecto
    // Las URLs de imagen del backend ya incluyen la ruta completa
    const image = notice.main_image?.url
      ? notice.main_image.url.startsWith("http")
        ? notice.main_image.url // Si ya es una URL completa
        : `${API_URL}${notice.main_image.url}` // Si necesita el prefijo del API
      : "https://via.placeholder.com/400x300?text=Sin+Imagen";

    return {
      id: notice.id.toString(),
      title: notice.title,
      summary: summary,
      image: image,
      date: formatDate(notice.date),
      link: `/noticias/${notice.slug}`, // Usando el slug para la URL
      category: notice.category.name,
    };
  };

  // Función para obtener las noticias del API
  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      // Usar la URL correcta del backend
      const response = await fetch(`${API_URL}/api/v1/core/notices/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Datos recibidos del backend:", data);

      // Manejar tanto formato paginado como array directo
      const noticesArray = data.results || data;

      if (!Array.isArray(noticesArray)) {
        throw new Error("Los datos recibidos no tienen el formato esperado");
      }

      const transformedNews = noticesArray.map(transformNoticeToNewsItem);
      setNews(transformedNews);
    } catch (err) {
      console.error("Error fetching news:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar las noticias"
      );
    } finally {
      setLoading(false);
    }
  };

  // Función para recargar noticias manualmente
  const handleRetry = async () => {
    await fetchNews();
  };

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Autoplay del carrusel
  useEffect(() => {
    if (!isAutoPlaying || isPaused || news.length <= 1) {
      setProgress(0);
      return;
    }

    const duration = 5000; // 5 segundos
    const intervalTime = 50; // actualizar cada 50ms para suavidad
    const increment = (intervalTime / duration) * 100;

    const progressInterval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          setCurrentIndex((prevIndex: number) => {
            const totalPages = Math.ceil(news.length / getItemsPerPage());
            return prevIndex === totalPages - 1 ? 0 : prevIndex + 1;
          });
          return 0;
        }
        return prevProgress + increment;
      });
    }, intervalTime);

    return () => clearInterval(progressInterval);
  }, [isAutoPlaying, isPaused, news.length, currentIndex]);

  // Pausar autoplay cuando el usuario interactúa
  const handleUserInteraction = () => {
    setIsPaused(true);
    setProgress(0); // Reiniciar progreso
    setTimeout(() => setIsPaused(false), 10000); // Resume después de 10 segundos de inactividad
  };

  // Función para obtener el número de items por página según el tamaño de pantalla
  const getItemsPerPage = (): number => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) return 1; // móvil: 1 item
      if (window.innerWidth < 1024) return 2; // tablet: 2 items
      return 4; // desktop: 4 items
    }
    return 4; // valor por defecto
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());

  // Escuchar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = (): void => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages: number = Math.ceil(news.length / itemsPerPage);

  const nextSlide = (): void => {
    if (isAnimating) return;
    handleUserInteraction(); // Pausar autoplay temporalmente
    setIsAnimating(true);
    setCurrentIndex((prevIndex: number) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = (): void => {
    if (isAnimating) return;
    handleUserInteraction(); // Pausar autoplay temporalmente
    setIsAnimating(true);
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number): void => {
    if (isAnimating || index === currentIndex) return;
    handleUserInteraction(); // Pausar autoplay temporalmente
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Renderizado condicional para estados de carga y error
  if (loading) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
              NOTICIAS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto"></div>
          </div>
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="animate-spin h-16 w-16 border-4 border-green-200 border-t-green-600"></div>
              <div
                className="absolute inset-0 h-16 w-16 border-4 border-transparent border-t-green-400 animate-spin"
                style={{
                  animationDirection: "reverse",
                  animationDuration: "1.5s",
                }}
              ></div>
            </div>
            <span className="mt-6 text-gray-600 font-medium">
              Cargando noticias...
            </span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
              NOTICIAS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto"></div>
          </div>
          <div className="flex flex-col items-center py-16">
            <div className="bg-red-100 p-6 mb-6">
              <i className="fas fa-exclamation-triangle text-red-600 text-4xl"></i>
            </div>
            <p className="text-gray-600 text-center mb-8 max-w-md">
              Error al cargar las noticias: {error}
            </p>
            <button
              onClick={handleRetry}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-redo-alt mr-2"></i>
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="bg-gradient-to-br from-gray-50 to-green-50 py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-4">
              NOTICIAS
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto"></div>
          </div>
          <div className="flex flex-col items-center py-16">
            <div className="bg-gray-100 p-6 mb-6">
              <i className="fas fa-newspaper text-gray-400 text-4xl"></i>
            </div>
            <p className="text-gray-600 text-center max-w-md">
              No hay noticias disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-br  py-8 px-4 ">
      <div className="container mx-auto max-w-7xl  ">
        <div className="text-center mb-4 ">
          <div className="flex items-end justify-between border-green-700 border-l-4 px-2 ">
            <h2 className="text-4xl font-bold bg-green-600 bg-clip-text text-transparent">
              NOTICIAS
            </h2>
            <button
              onClick={handleRetry}
              className="bg-white hover:bg-green-50 text-green-700 px-4 py-2 transition-all duration-300 shadow-md hover:shadow-lg border-2 rounded-lg border-green-200 hover:border-green-300 transform hover:scale-105"
              title="Actualizar noticias"
            >
              <i className="fas fa-sync-alt mr-2"></i>
              Actualizar
            </button>
          </div>
        </div>

        <div className="relative">
          <div
            className="overflow-hidden  rounded-lg shadow-lg  p-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }, (_, pageIndex: number) => (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 flex gap-4 px-1"
                >
                  {news
                    .slice(
                      pageIndex * itemsPerPage,
                      (pageIndex + 1) * itemsPerPage
                    )
                    .map((newsItem: NewsItem, newsIndex: number) => (
                      <div
                        key={pageIndex * itemsPerPage + newsIndex}
                        className={`${
                          itemsPerPage === 1
                            ? "w-full"
                            : itemsPerPage === 2
                              ? "w-1/2"
                              : "w-1/4"
                        } px-1`}
                      >
                        <NewsCard
                          image={newsItem.image}
                          title={newsItem.title}
                          summary={newsItem.summary}
                          link={newsItem.link}
                          date={newsItem.date}
                          category={newsItem.category}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Barra de progreso del autoplay */}
          {totalPages > 1 && isAutoPlaying && !isPaused && (
            <div className="w-full bg-gray-200 h-1 mt-2">
              <div
                className="bg-gradient-to-r from-green-500 to-green-700 h-1 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 shadow-xl hover:shadow-2xl transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Anterior"
              >
                <i className="fas fa-chevron-left text-lg"></i>
              </button>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-3 shadow-xl hover:shadow-2xl transition-all duration-300 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Siguiente"
              >
                <i className="fas fa-chevron-right text-lg"></i>
              </button>
            </>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-6">
              <div className="flex space-x-3">
                {Array.from({ length: totalPages }, (_, index: number) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    disabled={isAnimating}
                    className={`w-4 h-4 transition-all duration-300 transform hover:scale-125 disabled:cursor-not-allowed shadow-md ${
                      index === currentIndex
                        ? "bg-gradient-to-r from-green-500 to-green-700 scale-110 shadow-lg"
                        : "bg-white hover:bg-green-100 border-2 border-green-200"
                    }`}
                    aria-label={`Ir a la página ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2 transition-all duration-300 transform hover:scale-110 shadow-md ${
                  isAutoPlaying
                    ? "bg-gradient-to-r from-green-500 to-green-700 text-white"
                    : "bg-white hover:bg-green-50 text-green-700 border-2 border-green-200"
                }`}
                title={isAutoPlaying ? "Pausar autoplay" : "Activar autoplay"}
                aria-label={
                  isAutoPlaying ? "Pausar autoplay" : "Activar autoplay"
                }
              >
                <i
                  className={`fas ${isAutoPlaying ? "fa-pause" : "fa-play"} text-sm`}
                ></i>
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            to="/noticias"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
          >
            <span>Más noticias</span>
            <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
