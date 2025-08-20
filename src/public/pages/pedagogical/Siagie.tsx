import {
  FaExternalLinkAlt,
  FaInfoCircle,
  FaBook,
  FaUserGraduate,
  FaDatabase,
} from "react-icons/fa";

const siagieUrl = "https://siagie.minedu.gob.pe/";
const manualUrl = "/public/pdf/g_suite/manual.pdf";

const Siagie = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto max-w-5xl shadow-lg rounded-xl bg-white p-8">
        {/* Título y breadcrumb */}
        <div className="flex items-center gap-3 mb-4">
          <FaBook className="text-green-600 text-3xl" />
          <h1 className="text-4xl font-bold text-green-800 tracking-tight">
            SIAGIE
          </h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-blue-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
            Sistema de Información de Apoyo a la Gestión de la Institución
            Educativa
          </span>
        </div>
        <hr className="border-blue-200 my-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-2">
                <FaInfoCircle className="text-green-500" /> ¿Qué es el SIAGIE?
              </h2>
              <p className="text-base text-gray-700 text-justify">
                El <b>SIAGIE</b> es el aplicativo informático oficial del
                Ministerio de Educación del Perú, diseñado para gestionar la
                información de los procesos de matrícula, asistencia y
                evaluación de estudiantes en instituciones educativas públicas y
                privadas a nivel nacional.
              </p>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-2">
                <FaDatabase className="text-green-500" /> Funcionalidades
                principales
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Gestión de matrícula de estudiantes.</li>
                <li>Registro y control de asistencia.</li>
                <li>Evaluación académica y generación de reportes.</li>
                <li>Base de datos nacional para toma de decisiones.</li>
                <li>Aplicación estandarizada del marco normativo educativo.</li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-2">
                <FaUserGraduate className="text-green-500" /> Beneficios
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>Facilita la gestión escolar y administrativa.</li>
                <li>Mejora la transparencia y trazabilidad de los procesos.</li>
                <li>
                  Permite el acceso a información actualizada y confiable.
                </li>
                <li>
                  Apoya la toma de decisiones en todos los niveles educativos.
                </li>
              </ul>
            </section>
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2 mb-2">
                <FaBook className="text-green-500" /> Recursos útiles
              </h2>
              <ul className="pl-1">
                <li className="mb-2">
                  <a
                    href={siagieUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-1"
                  >
                    Acceso al SIAGIE oficial{" "}
                    <FaExternalLinkAlt className="inline text-xs" />
                  </a>
                </li>
                <li>
                  <a
                    href={manualUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline flex items-center gap-1"
                  >
                    Manual de usuario SIAGIE (PDF){" "}
                    <FaExternalLinkAlt className="inline text-xs" />
                  </a>
                </li>
              </ul>
            </section>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/public/images/interested_links/siagie.jpg"
              alt="SIAGIE"
              className="rounded-lg shadow-md w-full max-w-xs mb-6"
            />
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-green-700 font-semibold">¿Necesitas ayuda?</p>
              <p className="text-gray-600 text-sm">
                Contacta a la UGEL Pomabamba para soporte y orientación sobre el
                uso del SIAGIE.
              </p>
              <a
                href="mailto:ugel.pomabamba@minedu.gob.pe"
                className="text-green-600 hover:underline mt-2 inline-block"
              >
                ugel.pomabamba@minedu.gob.pe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Siagie;
