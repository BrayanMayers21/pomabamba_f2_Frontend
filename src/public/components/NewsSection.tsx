import { useState, useEffect } from 'react';
import NewsCard from './NewsCard';
import { Link } from "react-router-dom";
import { API_URL } from "../../config";

// Interfaz para los datos que vienen del API
interface NoticeImage {
  url: string | null;
  file_name: string | null;
}

interface NoticeCategory {
  id: number;
  name: string;
  slug: string;
}

interface NoticeTag {
  id: number;
  name: string;
  slug: string;
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
}

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Función para convertir los datos del API al formato interno
  const transformNoticeToNewsItem = (notice: NoticeFromAPI): NewsItem => {
    // Extraer un resumen del body (primeras 150 caracteres)
    const summary = notice.body.length > 150 
      ? notice.body.substring(0, 150) + '...' 
      : notice.body;

    // Usar imagen principal o una imagen por defecto
    const image = notice.main_image?.url 
      ? `${API_URL}${notice.main_image.url}`
      : 'https://via.placeholder.com/400x300?text=Sin+Imagen';

    return {
      id: notice.id.toString(),
      title: notice.title,
      summary: summary,
      image: image,
      date: notice.date,
      link: `/noticias/${notice.slug}` // Usando el slug para la URL
    };
  };

  // Función para obtener las noticias del API
  const fetchNews = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/notices/latest?limit=6`);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data: NoticeFromAPI[] = await response.json();
      const transformedNews = data.map(transformNoticeToNewsItem);
      setNews(transformedNews);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err instanceof Error ? err.message : 'Error desconocido al cargar las noticias');
    } finally {
      setLoading(false);
    }
  };

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNews();
  }, []);

  // Función para obtener el número de items por página según el tamaño de pantalla
  const getItemsPerPage = (): number => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) return 1; // móvil: 1 item
      return 2; // tablet/desktop: 2 items
    }
    return 2; // valor por defecto
  };

  const [itemsPerPage, setItemsPerPage] = useState<number>(getItemsPerPage());

  // Escuchar cambios en el tamaño de pantalla
  useEffect(() => {
    const handleResize = (): void => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages: number = Math.ceil(news.length / itemsPerPage);

  const nextSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex: number) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = (): void => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToSlide = (index: number): void => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Función para reintentar la carga
  const handleRetry = (): void => {
    fetchNews();
  };

  // Renderizado condicional para estados de carga y error
  if (loading) {
    return (
      <section className="bg-gray-100 py-8 px-4">
        <div className='container mx-auto'>
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">NOTICIAS</h2>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Cargando noticias...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 py-8 px-4">
        <div className='container mx-auto'>
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">NOTICIAS</h2>
          <div className="flex flex-col items-center py-12">
            <div className="text-red-600 mb-4">
              <i className="fas fa-exclamation-triangle text-4xl"></i>
            </div>
            <p className="text-gray-600 text-center mb-4">
              Error al cargar las noticias: {error}
            </p>
            <button 
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className="bg-gray-100 py-8 px-4">
        <div className='container mx-auto'>
          <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">NOTICIAS</h2>
          <div className="flex flex-col items-center py-12">
            <div className="text-gray-400 mb-4">
              <i className="fas fa-newspaper text-4xl"></i>
            </div>
            <p className="text-gray-600 text-center">
              No hay noticias disponibles en este momento.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-100 py-8 px-4">
      <div className='container mx-auto'>
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-6">NOTICIAS</h2>

        {/* Agregar FontAwesome CDN */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

        <div className="relative container mx-auto">
          {/* Contenedor del carrusel */}
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }, (_, pageIndex: number) => (
                <div
                  key={pageIndex}
                  className="w-full flex-shrink-0 flex gap-6 px-2"
                >
                  {news
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((newsItem: NewsItem, newsIndex: number) => (
                      <div
                        key={pageIndex * itemsPerPage + newsIndex}
                        className={`${itemsPerPage === 1 ? 'w-full' : 'w-1/2'} px-2`}
                      >
                        <NewsCard
                          image={newsItem.image}
                          title={newsItem.title}
                          summary={newsItem.summary}
                          link={newsItem.link}
                        />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Anterior"
              >
                <i className="fas fa-chevron-left text-gray-600 text-lg"></i>
              </button>

              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-10 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110"
                aria-label="Siguiente"
              >
                <i className="fas fa-chevron-right text-gray-600 text-lg"></i>
              </button>
            </>
          )}

          {/* Indicadores de página */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalPages }, (_, index: number) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`w-3 h-3 rounded-full transition-all duration-200 transform hover:scale-125 disabled:cursor-not-allowed ${index === currentIndex
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  aria-label={`Ir a la página ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className='flex justify-center mt-6'>
        <Link
          to="/noticias"
          className='bg-blue-700 text-white px-4 py-2 rounded font-semibold cursor-pointer'
        >
          Mas noticias
        </Link>
      </div>
    </section>
  );
};

export default NewsSection;