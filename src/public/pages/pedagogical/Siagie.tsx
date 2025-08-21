import { Mail, User, Building2 } from "lucide-react";
import {
  FaExternalLinkAlt,
  FaInfoCircle,
  FaBook,
  FaUserGraduate,
  FaDatabase,
} from "react-icons/fa";

const Siagie = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">SIAGIE</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  SIAGIE:
                </h3>
              </div>
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-amber-600 flex items-center gap-2 mb-2">
                  <FaInfoCircle className="text-amber-700" /> ¿Qué es el SIAGIE?
                </h2>
                <p className="text-base text-gray-700 text-justify">
                  El <b>SIAGIE</b> es el aplicativo informático oficial del
                  Ministerio de Educación del Perú, diseñado para gestionar la
                  información de los procesos de matrícula, asistencia y
                  evaluación de estudiantes en instituciones educativas públicas
                  y privadas a nivel nacional.
                </p>
              </section>
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-amber-600 flex items-center gap-2 mb-2">
                  <FaDatabase className="text-amber-700" /> Funcionalidades
                  principales
                </h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Gestión de matrícula de estudiantes.</li>
                  <li>Registro y control de asistencia.</li>
                  <li>Evaluación académica y generación de reportes.</li>
                  <li>Base de datos nacional para toma de decisiones.</li>
                  <li>
                    Aplicación estandarizada del marco normativo educativo.
                  </li>
                </ul>
              </section>
              <section className="mb-6">
                <h2 className="text-xl font-semibold text-amber-600 flex items-center gap-2 mb-2">
                  <FaUserGraduate className="text-amber-700" /> Beneficios
                </h2>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Facilita la gestión escolar y administrativa.</li>
                  <li>
                    Mejora la transparencia y trazabilidad de los procesos.
                  </li>
                  <li>
                    Permite el acceso a información actualizada y confiable.
                  </li>
                  <li>
                    Apoya la toma de decisiones en todos los niveles educativos.
                  </li>
                </ul>
              </section>
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-amber-200/30 overflow-hidden border border-amber-100/20 backdrop-blur-sm">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h6 className="text-2xl font-bold text-center tracking-wide">
                      CONTACTO
                    </h6>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-6">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-amber-600" />
                      <a
                        href="mailto:ppampa@ugelpomabamba.gob.pe"
                        className="text-amber-700 font-semibold hover:text-red-800 transition-colors duration-200 hover:underline"
                      >
                        informes@ugelpomabamba.gob.pe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Espaciado inferior */}
        <div className="py-12"></div>
      </div>
    </div>
  );
};

export default Siagie;
