import {
  FaFacebookF,
  FaWhatsapp,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-green-700 text-white overflow-hidden">
      {/* Patrón de fondo decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white rounded-full opacity-20"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white rounded-full opacity-10"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white rounded-full opacity-15"></div>
        <div className="absolute bottom-10 left-32 w-12 h-12 bg-white rounded-full opacity-20"></div>
      </div>

      <div className="relative z-10">
        {/* Contenido principal */}
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sección izquierda - Logo e información */}
            <div className="lg:col-span-1 space-y-6">
              <div className="transform transition-transform duration-300 hover:scale-105">
                <Logo />
              </div>

              <div className="space-y-3">
                <p className="text-white text-sm leading-relaxed max-w-md">
                  Unidad de Gestión Educativa Local de Pomabamba, comprometida
                  con la excelencia educativa y el desarrollo integral de
                  nuestra comunidad.
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-white ">
                    <FaMapMarkerAlt className="text-white flex-shrink-0" />
                    <span className="text-sm">
                      Jr. Comercio N° 234, Pomabamba, Ancash
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-white transition-colors duration-200">
                    <FaPhone className="text-white flex-shrink-0" />
                    <span className="text-sm">+51 996 982 234</span>
                  </div>

                  <div className="flex items-center gap-3 text-white transition-colors duration-200">
                    <FaEnvelope className="text-white flex-shrink-0" />
                    <span className="text-sm">
                      ugel.pomabamba@minedu.gob.pe
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección central - Enlaces rápidos */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 pb-2 mb-4">
                Enlaces Rápidos
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <a
                  href="/noticias"
                  className="flex items-center gap-2 text-white hover:text-white hover:translate-x-2 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                  <span className="text-sm">Noticias y Comunicados</span>
                </a>

                <a
                  href="/documentos"
                  className="flex items-center gap-2 text-white hover:text-white hover:translate-x-2 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                  <span className="text-sm">Documentos de Gestión</span>
                </a>

                <a
                  href="/servicios"
                  className="flex items-center gap-2 text-white hover:text-white hover:translate-x-2 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                  <span className="text-sm">Servicios Educativos</span>
                </a>

                <a
                  href="/mesa-de-partes"
                  className="flex items-center gap-2 text-white hover:text-white hover:translate-x-2 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                  <span className="text-sm">Mesa de Partes Virtual</span>
                </a>

                <a
                  href="/transparencia"
                  className="flex items-center gap-2 text-white hover:text-white hover:translate-x-2 transition-all duration-200 group"
                >
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full group-hover:bg-white transition-colors duration-200"></span>
                  <span className="text-sm">Transparencia</span>
                </a>
              </div>
            </div>

            {/* Sección derecha - Redes sociales y contacto */}
            <div className="lg:col-span-1 space-y-6">
              <h3 className="text-xl font-bold text-white border-b-2 pb-2 mb-4">
                Síguenos
              </h3>

              <div className="space-y-4">
                <p className="text-white text-sm">
                  Mantente actualizado con nuestras últimas noticias y eventos
                </p>

                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/pg/ugel.pomabamba.ancash/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="group relative"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50">
                      <FaFacebookF className="text-lg text-white" />
                    </div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      Facebook
                    </div>
                  </a>

                  <a
                    href="https://api.whatsapp.com/send?phone=51996982234&text=Hola,%20UGEL%20Pomabamba"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="group relative"
                  >
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-green-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/50">
                      <FaWhatsapp className="text-lg text-white" />
                    </div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      WhatsApp
                    </div>
                  </a>

                  <a
                    href="https://www.youtube.com/@ugelpomabamba4494"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="group relative"
                  >
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-red-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-red-500/50">
                      <FaYoutube className="text-lg text-white" />
                    </div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      YouTube
                    </div>
                  </a>
                </div>
              </div>

              {/* Horarios de atención */}
              <div className="bg-green-800/50 rounded-lg p-4 border border-green-600/30">
                <h4 className="font-semibold text-white mb-2">
                  Horarios de Atención
                </h4>
                <div className="space-y-1 text-sm text-white">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes:</span>
                    <span>8:00 AM - 4:30 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados:</span>
                    <span>8:00 AM - 12:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Línea separadora */}
        <div className="border-t border-blue-600/30">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 text-sm text-white">
                <span>&copy; {currentYear} UGEL Pomabamba.</span>
                <span className="hidden md:inline">|</span>
                <span>Todos los derechos reservados.</span>
              </div>

              <div className="flex items-center gap-6 text-xs text-blue-300">
                <a
                  href="/politica-privacidad"
                  className="text-white"
                >
                  Política de Privacidad
                </a>
                <a
                  href="/terminos-uso"
                  className="text-white"
                >
                  Términos de Uso
                </a>
                <a
                  href="/mapa-sitio"
                  className="text-white"
                >
                  Mapa del Sitio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
