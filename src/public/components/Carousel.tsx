import React, { useState, useEffect } from 'react';

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
  autoPlayDelay = 1000
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
    console.log('Botón anterior clickeado, índice actual:', currentIndex);
    setUserInteracted(true);
    handleTransition(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === 0 ? items.length - 1 : prevIndex - 1;
        console.log('Nuevo índice:', newIndex);
        return newIndex;
      });
    });
  };

  const goToNext = () => {
    if (isTransitioning) return;
    console.log('Botón siguiente clickeado, índice actual:', currentIndex);
    setUserInteracted(true);
    handleTransition(() => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex === items.length - 1 ? 0 : prevIndex + 1;
        console.log('Nuevo índice:', newIndex);
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
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">No hay elementos para mostrar</p>
      </div>
    );
  }

  const currentItem = items[currentIndex];

  return (
    <div className="relative w-full mx-auto bg-white shadow-lg overflow-hidden">
      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Imagen principal */}
      <div className="relative h-96 overflow-hidden">
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
        >
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay gradiente más fuerte */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Botones de navegación principales */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToPrevious();
          }}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-3 pt-3 pb-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-xl'
            }`}
          aria-label="Anterior"
          type="button"
          disabled={isTransitioning}
        >
          <i className="fas fa-chevron-left text-xl"></i>
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            goToNext();
          }}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 px-3 pt-3 pb-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 z-10 ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:shadow-xl'
            }`}
          aria-label="Siguiente"
          type="button"
          disabled={isTransitioning}
        >
          <i className="fas fa-chevron-right text-xl"></i>
        </button>

        {/* Control de reproducción */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white px-3 pt-2 pb-1 rounded-full backdrop-blur-sm transition-all duration-200 hover:scale-110"
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
        >
          {isPlaying ? (
            <i className="fas fa-pause text-lg"></i>
          ) : (
            <i className="fas fa-play text-lg"></i>
          )}
        </button>

        {/* Indicadores - ahora dentro de la imagen */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2 z-10">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? 'bg-white scale-110 shadow-lg'
                  : 'bg-white/50 hover:bg-white/70 hover:scale-105'
                } ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}
              aria-label={`Ir al slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>

        {/* Contenido superpuesto */}
        <div className={`absolute px-16 bottom-0 left-0 right-0 pt-6 pb-16 text-white transition-all duration-500 ${isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
          }`}>
          <div className="mb-4">
            <h2 className="text-3xl font-bold mb-3 leading-tight drop-shadow-lg">
              {currentItem.title}
            </h2>
            <p className="text-white/90 text-lg leading-relaxed drop-shadow-md max-w-2xl">
              {currentItem.description}
            </p>
          </div>

          {/* Botón de acción */}
          <button
            onClick={currentItem.buttonAction}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {currentItem.buttonText}
          </button>
        </div>

        {/* Barra de progreso */}
        {isPlaying && !userInteracted && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
            <div
              className="h-full bg-green-500 transition-all duration-100 ease-linear"
              style={{
                width: `${((Date.now() % autoPlayDelay) / autoPlayDelay) * 100}%`,
                animation: `progress ${autoPlayDelay}ms linear infinite`
              }}
            />
          </div>
        )}
      </div>

      {/* Estilos CSS para animaciones */}
      <style>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

// Componente de ejemplo con datos de demostración
const Carousel: React.FC = () => {
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "CONTRATO DE PERSONAL EN EL RÉGIMEN 276 - 2022",
      description: "La Unidad de Gestión Educativa Local de Pomabamba, pone en conocimiento el proceso de selección para contrato de personal en el régimen laboral 276 - 2022, se adjunta el cuadro de plazas vacantes de la convocatoria.",
      image: "https://www.ugelelcollao.edu.pe/contenido/uploads/2022/04/comunicado_imagen.jpg.crdownload.jpg",
      buttonText: "Explorar Destinos",
      buttonAction: () => alert("Redirigiendo a destinos...")
    },
    {
      id: 2,
      title: "Tecnología Innovadora",
      description: "Mantente a la vanguardia con las últimas innovaciones tecnológicas que están transformando nuestro mundo.",
      image: "https://5092991.fs1.hubspotusercontent-na1.net/hubfs/5092991/Blog%20notas%20maestrias%20y%20diplomados/Innovaci%C3%B3n%20tecnol%C3%B3gica.jpg",
      buttonText: "Ver Tecnología",
      buttonAction: () => alert("Redirigiendo a tecnología...")
    },
    {
      id: 3,
      title: "Gastronomía Exquisita",
      description: "Sumérgete en sabores únicos y experiencias culinarias que despertarán todos tus sentidos.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=400&fit=crop",
      buttonText: "Descubrir Recetas",
      buttonAction: () => alert("Redirigiendo a recetas...")
    },
    {
      id: 4,
      title: "Naturaleza Salvaje",
      description: "Conecta con la naturaleza en su estado más puro y experimenta la belleza del mundo natural.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      buttonText: "Explorar Naturaleza",
      buttonAction: () => alert("Redirigiendo a naturaleza...")
    }
  ];

  return (
    <div className="container mx-auto mt-4">
      <ImageCarousel
        items={carouselItems}
        autoPlay={true}
        autoPlayDelay={10000}
      />
    </div>
  );
};

export default Carousel;