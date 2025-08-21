import Logo from "./Logo";
import Navbar from "./Navbar";
import { FaUser } from "react-icons/fa";
import PortalTransparencia from "@/assets/images/pte_logo.svg";
import PortalGob from "@/assets/images/gob_pe_white.svg";
import LogoReclamo from "@/assets/images/libro_reclamo.svg";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-900 via-green-700 to-green-600 text-white shadow-2xl ">
      {/* Barra superior con enlaces institucionales */}
      <div className="bg-green-950/50 border-b border-green-600/30">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1 text-xs text-green-200">
              <span>🕒 Lun - Vie: 8:00 AM - 4:30 PM</span>
              <span className="hidden sm:inline">|</span>
              <span className="hidden sm:inline">📞 +51 996 982 234</span>
            </div>

            <div className="flex items-center space-x-4">
              {/* Enlaces institucionales mejorados */}
              <a
                href="https://www.transparencia.gob.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:bg-green-800/50 px-3 py-1 rounded-full transition-all duration-200"
                title="Portal de Transparencia"
              >
                <img
                  src={PortalTransparencia}
                  alt="Portal de Transparencia"
                  className="h-4 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="hidden md:inline text-xs text-green-200 group-hover:text-white">
                  Transparencia
                </span>
              </a>

              <a
                href="#libro-reclamaciones"
                className="group flex items-center gap-2 hover:bg-green-800/50 px-3 py-1 rounded-full transition-all duration-200"
                title="Libro de Reclamaciones"
              >
                <img
                  src={LogoReclamo}
                  alt="Libro de Reclamaciones"
                  className="h-5 w-auto transition-transform duration-200 group-hover:scale-110"
                />
                <span className="hidden md:inline text-xs text-green-200 group-hover:text-white">
                  Reclamos
                </span>
              </a>

              <a
                href="https://www.gob.pe/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 hover:bg-green-800/50 px-3 py-1 rounded-full transition-all duration-200"
                title="Portal del Estado Peruano"
              >
                <img
                  src={PortalGob}
                  alt="Portal del Gobierno del Perú"
                  className="h-4 transition-transform duration-200 group-hover:scale-110"
                />
                <span className="hidden md:inline text-xs text-green-200 group-hover:text-white">
                  gob.pe
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header principal */}
      <div className="relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5 transform translate-x-32 -translate-y-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full opacity-10 transform -translate-x-24 translate-y-24"></div>
        </div>

        <div className="relative z-10 container mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            {/* Logo y nombre de la institución */}
            <div className="flex items-center space-x-4">
              <div className="transform transition-transform duration-300 hover:scale-105">
                <Logo />
              </div>

              {/* Información adicional de la institución */}
              <div className="hidden lg:block">
                <div className="flex flex-col">
                  <h2 className="text-sm font-semibold text-green-100">
                    Ministerio de Educación
                  </h2>
                  <p className="text-xs text-green-300 mt-0.5">
                    Gobierno Regional de Ancash
                  </p>
                </div>
              </div>
            </div>

            {/* Sección derecha - Usuario */}
            <div className="flex items-center space-x-4">
              {/* Botón de usuario */}
              <a
                href="/login"
                className="group relative flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                title="Iniciar Sesión"
              >
                <FaUser className="text-sm" />
                <span className="hidden sm:inline text-sm font-medium">
                  Acceder
                </span>
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar integrado */}
      <Navbar />
    </header>
  );
}
