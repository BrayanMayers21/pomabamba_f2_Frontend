import { useEffect, useState } from "react";
import { getBanners } from "../../api/banners";
import type { Banner } from "../../types/banner";

export default function BannersCarousel() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getBanners();
        // Filtrar solo banners activos y ordenarlos
        const activeBanners = (data.results || [])
          .filter((banner: Banner) => banner.status === "active")
          .sort((a: Banner, b: Banner) => (a.order || 0) - (b.order || 0));
        setBanners(activeBanners);
      } catch (error) {
        console.error("Error al cargar banners:", error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === banners.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000); // Cambia cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [banners.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 mb-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (banners.length === 0) {
    return null; // No mostrar nada si no hay banners
  }

  return (
    <div className="relative mb-8">
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              {(banner.title || banner.text) && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  {banner.title && (
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {banner.title}
                    </h3>
                  )}
                  {banner.text && (
                    <p className="text-white/90 text-sm md:text-base">
                      {banner.text}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Indicadores */}
      {banners.length > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-green-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir al banner ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Botones de navegación */}
      {banners.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === 0 ? banners.length - 1 : currentIndex - 1
              )
            }
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Banner anterior"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() =>
              setCurrentIndex(
                currentIndex === banners.length - 1 ? 0 : currentIndex + 1
              )
            }
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Siguiente banner"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
