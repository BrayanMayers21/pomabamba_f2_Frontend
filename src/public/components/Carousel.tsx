import React, { useState, useEffect } from "react";
import { getBanners } from "../../api/banners";
import type { Banner } from "../../types/banner";

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonAction: () => void;
}

interface ImageCarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayDelay = 1000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Resetear la interacción del usuario después de un tiempo
  useEffect(() => {
    if (!userInteracted) return;

    const timeout = setTimeout(() => {
      setUserInteracted(false);
    }, autoPlayDelay * 2); // Pausa por el doble del tiempo de autoplay

    return () => clearTimeout(timeout);
  }, [userInteracted, autoPlayDelay]);

  useEffect(() => {
    if (!isPlaying || userInteracted) return;

    const interval = setInterval(() => {
      handleTransition(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === items.length - 1 ? 0 : prevIndex + 1
        );
      });
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [isPlaying, items.length, autoPlayDelay, userInteracted]);

  const handleTransition = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50);
    }, 150);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    console.log("Botón anterior clickeado, índice actual:", currentIndex);
    setUserInteracted(true);
    handleTransition(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
        console.log("Nuevo índice:", newIndex);
        return newIndex;
      });
    });
  };

  const goToNext = () => {
    if (isTransitioning) return;
    console.log("Botón siguiente clickeado, índice actual:", currentIndex);
    setUserInteracted(true);
    handleTransition(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
        console.log("Nuevo índice:", newIndex);
        return newIndex;
      });
    });
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setUserInteracted(true);
    handleTransition(() => {
      setCurrentIndex(index);
    });
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (items.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full mx-auto bg-white shadow-2xl overflow-hidden border border-gray-100 ">
      {/* Font Awesome CDN */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      {/* Imagen principal */}
      <div className="relative h-72 md:h-96 lg:h-[500px] overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            isTransitioning ? "opacity-0 scale-110" : "opacity-100 scale-100"
          }`}
        >
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
            onError={(e) => {
              // Fallback si la imagen no carga
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.jpg";
            }}
          />
        </div>

        {/* Overlay gradiente profesional */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

        {/* Botones de navegación profesionales */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrevious();
          }}
          className={`group absolute left-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white w-12 h-12 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/25 z-20 border-2 border-green-500/30 backdrop-blur-sm ${
            isTransitioning
              ? "opacity-50 cursor-not-allowed scale-95"
              : "opacity-90 hover:opacity-100"
          }`}
          aria-label="Anterior"
          type="button"
          disabled={isTransitioning}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <i className="fas fa-chevron-left text-lg transform transition-transform duration-300 group-hover:-translate-x-1"></i>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          className={`group absolute right-4 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white w-12 h-12 shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-green-500/25 z-20 border-2 border-green-500/30 backdrop-blur-sm ${
            isTransitioning
              ? "opacity-50 cursor-not-allowed scale-95"
              : "opacity-90 hover:opacity-100"
          }`}
          aria-label="Siguiente"
          type="button"
          disabled={isTransitioning}
        >
          <div className="relative flex items-center justify-center w-full h-full">
            <i className="fas fa-chevron-right text-lg transform transition-transform duration-300 group-hover:translate-x-1"></i>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </button>

        {/* Control de reproducción mejorado */}
        <button
          onClick={togglePlayPause}
          className="absolute top-6 right-6 bg-black/40 hover:bg-black/60 text-white w-12 h-12 backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
          aria-label={isPlaying ? "Pausar" : "Reproducir"}
        >
          {isPlaying ? (
            <i className="fas fa-pause text-sm"></i>
          ) : (
            <i className="fas fa-play text-sm ml-0.5"></i>
          )}
        </button>

        {/* Indicadores profesionales */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center space-x-3 z-20">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-400 ${
                index === currentIndex ? "w-10 h-3" : "w-3 h-3 hover:w-4"
              } ${isTransitioning ? "opacity-50" : "opacity-100"}`}
              aria-label={`Ir al slide ${index + 1}`}
              disabled={isTransitioning}
            >
              <div
                className={`w-full h-full transition-all duration-400 ${
                  index === currentIndex
                    ? "bg-white shadow-lg"
                    : "bg-white/60 hover:bg-white/80"
                }`}
              />
              {index === currentIndex && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-pulse" />
              )}
            </button>
          ))}
        </div>

        {/* Contenido superpuesto profesional */}
        <div
          className={`absolute px-6 md:px-12 lg:px-16 bottom-0 left-0 right-0 pt-8 pb-20 md:pb-24 text-white transition-all duration-700 ${
            isTransitioning
              ? "opacity-0 transform translate-y-8"
              : "opacity-100 transform translate-y-0"
          }`}
        >
          <div className="max-w-4xl">
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-green-600/80 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm">
                UGEL Pomabamba
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight drop-shadow-2xl">
              {currentItem.title}
            </h2>
            <p className="text-white/95 text-base md:text-lg lg:text-xl leading-relaxed drop-shadow-lg max-w-3xl mb-6 font-light">
              {currentItem.description}
            </p>

            {/* Botón de acción mejorado */}
            <button
              onClick={currentItem.buttonAction}
              className="group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 md:py-4 px-6 md:px-10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl hover:shadow-2xl text-sm md:text-base border border-green-500/30 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>{currentItem.buttonText}</span>
                <i className="fas fa-arrow-right transform transition-transform duration-300 group-hover:translate-x-1"></i>
              </span>
            </button>
          </div>
        </div>

        {/* Barra de progreso profesional */}
        {isPlaying && !userInteracted && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30 backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-100 ease-linear shadow-lg"
              style={{
                width: `${((Date.now() % autoPlayDelay) / autoPlayDelay) * 100}%`,
                animation: `progress ${autoPlayDelay}ms linear infinite`,
                boxShadow: "0 0 10px rgba(34, 197, 94, 0.5)",
              }}
            />
          </div>
        )}
      </div>

      {/* Estilos CSS para animaciones profesionales */}
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        @keyframes fadeInUp {
          0% { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes shimmer {
          0% { 
            background-position: -1000px 0; 
          }
          100% { 
            background-position: 1000px 0; 
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        /* Mejoras adicionales para hover effects */
        .group:hover .group-hover\\:translate-x-1 {
          transform: translateX(0.25rem);
        }
        
        /* Efectos de glassmorphism */
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
};

// Componente que consume la API de banners reales
const Carousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      console.log("🔄 Carousel: Iniciando carga...");

      try {
        setLoading(true);
        setError(null);

        // Timeout para evitar loading infinito
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          controller.abort();
          console.warn("⏰ Timeout: Mostrando contenido de fallback");
          setLoading(false); // Permitir que se muestre el fallback
        }, 5000); // 5 segundos timeout

        console.log("📡 Haciendo petición a la API...");
        const response = await getBanners({
          page_size: 10,
        });

        clearTimeout(timeoutId);
        console.log("✅ Respuesta recibida:", response.data);

        // Filtrar solo banners activos
        const activeBanners = (response.data.results || [])
          .filter((banner: Banner) => banner.status === "active")
          .sort((a: Banner, b: Banner) => (a.order || 0) - (b.order || 0));

        console.log(`📊 Banners activos: ${activeBanners.length}`);
        setBanners(activeBanners);
      } catch (error: any) {
        console.error("❌ Error en fetchBanners:", error);
        if (error.name === "AbortError") {
          setError(
            "La conexión está tardando demasiado. Verifica tu conexión."
          );
        } else {
          setError("Error al cargar banners. Inténtalo de nuevo.");
        }
        setBanners([]);
      } finally {
        console.log("🏁 Finalizando carga");
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Datos de fallback si la API falla
  const fallbackBanners: CarouselItem[] = [
    {
      id: 1,
      title: "UGEL Pomabamba",
      description:
        "Bienvenidos a la Unidad de Gestión Educativa Local de Pomabamba",
      image: "/public/images/institutional/pomabamba.png",
      buttonText: "Más información",
      buttonAction: () => alert("Sistema de banners en configuración"),
    },
  ];

  // Convertir banners a CarouselItems
  const carouselItems: CarouselItem[] =
    banners.length > 0
      ? banners.map((banner) => ({
          id: banner.id,
          title: banner.title,
          description:
            banner.text || "Información importante para la comunidad educativa",
          image: banner.image || "/placeholder.jpg",
          buttonText: banner.link ? "Ver más información" : "Más detalles",
          buttonAction: () => {
            if (banner.link) {
              // Si tiene enlace, abrirlo
              if (banner.link.startsWith("http")) {
                window.open(banner.link, "_blank");
              } else {
                // Para enlaces relativos, navegar dentro de la app
                window.location.href = banner.link;
              }
            } else {
              // Si no tiene enlace, mostrar más información
              const message = banner.text
                ? `${banner.title}\n\n${banner.text}`
                : `Más información sobre: ${banner.title}`;
              alert(message);
            }
          },
        }))
      : loading
        ? []
        : fallbackBanners; // Mostrar fallback solo si no está cargando

  if (loading && banners.length === 0) {
    return (
      <div className="w-full mx-auto mt-6 px-2">
        <div className="w-full h-72 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-xl border border-gray-200">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-green-200"></div>
              <div className="absolute inset-0 border-4 border-green-600 border-t-transparent animate-spin"></div>
            </div>
            <h3 className="text-gray-800 text-xl font-semibold mb-2">
              Cargando banners...
            </h3>
            <p className="text-gray-600 text-sm max-w-md mx-auto leading-relaxed">
              Estamos preparando el contenido más reciente para ti
            </p>
            <div className="mt-4 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 animate-bounce"></div>
              <div
                className="w-2 h-2 bg-green-500 animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-500 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto mt-6 px-2">
        <div className="w-full h-72 md:h-96 lg:h-[500px] bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center border-2 border-red-200 shadow-xl">
          <div className="text-center max-w-md">
            <div className="bg-red-100 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-exclamation-triangle text-red-500 text-3xl"></i>
            </div>
            <h3 className="text-red-800 text-xl font-semibold mb-3">
              Error de conexión
            </h3>
            <p className="text-red-600 text-base mb-6 leading-relaxed">
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-semibold transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              <i className="fas fa-redo-alt mr-2"></i>
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (carouselItems.length === 0) {
    return (
      <div className="w-full mx-auto mt-6 px-2">
        <div className="w-full h-72 md:h-96 lg:h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center shadow-xl border border-gray-200">
          <div className="text-center max-w-md">
            <div className="bg-gray-200 w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-images text-gray-500 text-3xl"></i>
            </div>
            <h3 className="text-gray-800 text-xl font-semibold mb-3">
              Sin contenido disponible
            </h3>
            <p className="text-gray-600 text-base leading-relaxed">
              No hay banners configurados en este momento.
              <br />
              <span className="text-sm text-gray-500 mt-2 inline-block">
                Configura banners desde el panel de administración
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20  ">
      <ImageCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayDelay={8000} // 8 segundos por slide
      />
    </div>
  );
};

export default Carousel;
