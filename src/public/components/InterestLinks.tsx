import React, { useState, useEffect, useRef } from 'react';

interface CarouselItem {
  id: number;
  image: string;
  url: string;
  alt: string;
}

const InterestLinks: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Datos de ejemplo - actualiza estas rutas según tus imágenes
  const items: CarouselItem[] = [
    {
      id: 1,
      image: "/images/interested_links/region_ancash.jpg",
      url: "https://www.gob.pe/regionancash",
      alt: "Gobierno Regional de Áncash"
    },
    {
      id: 2,
      image: "/images/interested_links/evaluacion_docente.jpg",
      url: "https://evaluaciondocente.perueduca.pe/",
      alt: "Evaluación Docente"
    },
    {
      id: 3,
      image: "/images/interested_links/peru_educa.jpg",
      url: "https://www.perueduca.pe/",
      alt: "Perú Educa"
    },
    {
      id: 4,
      image: "/images/interested_links/mi_mantenimiento.png",
      url: "https://mimantenimiento.pronied.gob.pe/sismantex/#/login",
      alt: "Mi Mantenimiento"
    },
    {
      id: 5,
      image: "/images/interested_links/beca_18.jpg",
      url: "https://www.gob.pe/pronabec",
      alt: "Beca 18"
    },
    {
      id: 6,
      image: "/images/interested_links/minedu.jpg",
      url: "https://www.gob.pe/minedu",
      alt: "Ministerio de Educación"
    },
    {
      id: 7,
      image: "/images/interested_links/qali_warma.jpg",
      url: "https://www.gob.pe/wasimikuna",
      alt: "Qali Warma"
    },
    {
      id: 8,
      image: "/images/interested_links/defensoria_usuario.jpg",
      url: "https://www.gob.pe/39284-defensoria-del-usuario-del-minedu",
      alt: "Defensoría del Usuario del Minedu"
    },
    {
      id: 9,
      image: "/images/interested_links/identicole.jpg",
      url: "https://identicole.minedu.gob.pe/",
      alt: "IdentiCole"
    },
    {
      id: 10,
      image: "/images/interested_links/siseve.jpg",
      url: "https://www.siseve.pe/web/",
      alt: "Siseve - Sistema de Vigilancia Escolar"
    },
    {
      id: 11,
      image: "/images/interested_links/escale.jpg",
      url: "https://escale.minedu.gob.pe/",
      alt: "Escale - Escala de Evaluación Docente"
    },
    {
      id: 12,
      image: "/images/interested_links/semaforo_escuela.jpg",
      url: "https://www.minedu.gob.pe/semaforo-escuela/",
      alt: "Semáforo Escolar"
    },
    {
      id: 13,
      image: "/images/interested_links/indecopi.jpg",
      url: "https://www.gob.pe/indecopi",
      alt: "Indecopi"
    },
    {
      id: 14,
      image: "/images/interested_links/sunat.jpg",
      url: "https://www.sunat.gob.pe/",
      alt: "Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)"
    },
    {
      id: 15,
      image: "/images/interested_links/sunarp.jpg",
      url: "https://www.gob.pe/sunarp",
      alt: "Superintendencia Nacional de los Registros Públicos (SUNARP)"
    },
    {
      id: 16,
      image: "/images/interested_links/fondep.jpg",
      url: "https://www.fondep.gob.pe/",
      alt: "FONDEP - Fondo Nacional de Desarrollo de la Educación Peruana"
    },
    {
      id: 17,
      image: "/images/interested_links/haku_yachaq.jpg",
      url: "https://hakuyachaq.minedu.gob.pe/user",
      alt: "Haku Yachaq - Plataforma de Aprendizaje"
    },
    {
      id: 18,
      image: "/images/interested_links/siagie.jpg",
      url: "https://siagie.minedu.gob.pe/inicio/",
      alt: "SIAGIE - Sistema de Información de Apoyo a la Gestión de la Institución Educativa"
    },
    {
      id: 19,
      image: "/images/interested_links/wasichay.jpg",
      url: "http://wasichay.perueduca.pe/",
      alt: "Wasichay - Plataforma de Recursos Educativos"
    },
    {
      id: 19,
      image: "/images/interested_links/banco_de_la_nacion.jpg",
      url: "https://www.bn.com.pe/",
      alt: "Banco de la Nación"
    },
    {
      id: 20,
      image: "/images/interested_links/observatorio_nacional_textos.jpg",
      url: "https://obnate.minedu.gob.pe/",
      alt: "Observatorio Nacional de Textos Escolares"
    },
    {
      id: 21,
      image: "/images/interested_links/contraloria.jpg",
      url: "https://www.gob.pe/contraloria",
      alt: "Contraloría General de la República"
    },
    {
      id: 22,
      image: "/images/interested_links/osce.jpg",
      url: "https://www.gob.pe/oece",
      alt: "Organismo Supervisor de las Contrataciones del Estado (OSCE)"
    },
    
  ];

  // Configuración del carrusel
  const itemsPerView = 4;
  
  // Crear items duplicados para el efecto infinito
  const extendedItems = [...items, ...items, ...items];

  // Función para iniciar el auto-scroll
  const startAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      if (!isDragging) {
        goToNext();
      }
    }, 5000);
  };

  // Función para reiniciar el auto-scroll con delay
  const resetAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setTimeout(() => {
      startAutoScroll();
    }, 5000);
  };

  // Inicializar auto-scroll
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isDragging]);

  // Función para manejar la transición infinita - MEJORADA
  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    // Calcular el punto medio exacto para reiniciar
    const middleSetStart = items.length;
    const middleSetEnd = items.length * 2;
    
    if (currentIndex >= middleSetEnd) {
      // Si estamos al final, volver al conjunto del medio
      const overflowAmount = currentIndex - middleSetEnd;
      setCurrentIndex(middleSetStart + overflowAmount);
    } else if (currentIndex < middleSetStart) {
      // Si estamos al principio, ir al conjunto del medio
      const underflowAmount = middleSetStart - currentIndex;
      setCurrentIndex(middleSetEnd - underflowAmount);
    }
  };

  // Funciones de navegación
  const goToNext = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex + itemsPerView);
  };

  const goToPrevious = () => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => prevIndex - itemsPerView);
  };

  const goToSlide = (pageIndex: number) => {
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    const targetIndex = items.length + (pageIndex * itemsPerView);
    setCurrentIndex(targetIndex);
    resetAutoScroll();
  };

  // Funciones de drag - Mouse (MEJORADAS)
  const handleMouseDown = (e: React.MouseEvent) => {
    // Solo iniciar drag si no es un click directo en un enlace
    if ((e.target as HTMLElement).tagName === 'A') {
      return;
    }
    
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const currentX = e.clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    
    if (Math.abs(dragOffset) > threshold) {
      e.preventDefault();
      e.stopPropagation();
      
      if (dragOffset > 0) {
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex - itemsPerView);
      } else {
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex + itemsPerView);
      }
      resetAutoScroll();
    }
    
    setDragOffset(0);
  };

  // Funciones de drag - Touch (MEJORADAS)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50;
    
    if (Math.abs(dragOffset) > threshold) {
      e.preventDefault();
      e.stopPropagation();
      
      if (dragOffset > 0) {
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex - itemsPerView);
      } else {
        setIsTransitioning(true);
        setCurrentIndex(prevIndex => prevIndex + itemsPerView);
      }
      resetAutoScroll();
    }
    
    setDragOffset(0);
  };

  // Manejar clicks en las flechas
  const handlePreviousClick = () => {
    goToPrevious();
    resetAutoScroll();
  };

  const handleNextClick = () => {
    goToNext();
    resetAutoScroll();
  };

  // Inicializar en el medio
  useEffect(() => {
    setCurrentIndex(items.length);
  }, [items.length]);

  // Calcular el índice actual para los indicadores
  const getCurrentIndicatorIndex = () => {
    const normalizedIndex = ((currentIndex - items.length) % items.length + items.length) % items.length;
    return Math.floor(normalizedIndex / itemsPerView);
  };

  // Calcular el número total de páginas/grupos
  const totalPages = Math.ceil(items.length / itemsPerView);

  // Calcular la transformación incluyendo el drag offset
  const getTransform = () => {
    const baseTransform = currentIndex * (100 / itemsPerView);
    const dragTransform = isDragging ? -(dragOffset / (carouselRef.current?.offsetWidth || 1)) * 100 : 0;
    return baseTransform + dragTransform;
  };

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6">LINKS DE INTERÉS</h2>
      
      <div className="relative">
        {/* Contenedor principal del carrusel */}
        <div 
          ref={carouselRef}
          className="relative overflow-hidden p-4 select-none"
          style={{ touchAction: 'pan-y' }}
        >
          {/* Contenedor de slides */}
          <div 
            className={`flex ${isTransitioning && !isDragging ? 'transition-transform duration-700 ease-in-out' : ''}`}
            style={{ transform: `translateX(-${getTransform()}%)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 px-3 relative"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 h-32 p-4"
                  onClick={(e) => {
                    // Prevenir navegación si se hizo drag
                    if (Math.abs(dragOffset) > 10) {
                      e.preventDefault();
                    }
                  }}
                  onDragStart={(e) => e.preventDefault()}
                >
                  <div className="h-full flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="max-h-full max-w-full object-contain pointer-events-none select-none"
                      onError={(e) => {
                        // Fallback en caso de error al cargar la imagen
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                      draggable={false}
                    />
                    {/* Fallback text si la imagen no carga */}
                    <div className="hidden text-center text-gray-500 text-sm">
                      {item.alt}
                    </div>
                  </div>
                </a>
                
                {/* Overlay invisible para manejar el drag */}
                <div
                  className="absolute inset-0 cursor-grab z-10"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ 
                    cursor: isDragging ? 'grabbing' : 'grab',
                    pointerEvents: isDragging ? 'all' : 'none'
                  }}
                />
              </div>
            ))}
          </div>
          
          {/* Overlay global para capturar el drag */}
          <div
            className="absolute inset-0 cursor-grab z-5"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              cursor: isDragging ? 'grabbing' : 'grab',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Controles de navegación */}
        <button
          onClick={handlePreviousClick}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNextClick}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors z-10"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicadores de puntos */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 hover:scale-110 ${
              getCurrentIndicatorIndex() === index
                ? 'bg-blue-500' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Versión responsive para móviles */}
      <style>{`
        @media (max-width: 768px) {
          .flex-shrink-0 {
            width: 50% !important;
          }
        }
        @media (max-width: 480px) {
          .flex-shrink-0 {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default InterestLinks;