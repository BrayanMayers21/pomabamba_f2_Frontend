import { Mail, User, Building2 } from "lucide-react";
import NumberedList from "../../components/NumberedList";

const programaFunctions: string[] = [
  "Participar en la planificación y organización para las reuniones de evaluación de las actividades del PP 0090 (Gestión del currículo, distribución de materiales, acondicionamiento de IIEE, seguimiento a los viáticos y pasajes, pago oportuno de las intervenciones pedagógicas) en sincronía con las actividades propias de las UGEL.",
  "Monitorear el cumplimiento de los procesos administrativos y logísticos necesarios para el desarrollo de las actividades previamente planificadas del PP 0090.",
  "Realizar coordinaciones con los especialistas pedagógicos o coordinadores de las estrategias del Minedu, a fin de emitir reportes de seguimiento (de los indicadores de proceso) en la implementación de las intervenciones sectoriales priorizadas, e informar mensualmente al Jefe de Gestión Pedagógica de los avances y alertas.",
  "Coordinar con los especialistas del Minedu y personal del Área de Gestión Pedagógica e Institucional de la UGEL, la elaboración de procedimientos y otros instrumentos (caja de herramientas) que permitan mejorar los procesos de las actividades del PP 0090, pudiendo solicitar asistencia técnica al Minedu.",
  "Proponer al Gestor Regional de la DRE de su ámbito y a los funcionarios responsables, mejoras en la implementación de las actividades planificadas del PP 0090.",
  "Elaborar reportes periódicos y hacer presentaciones a partir de información consolidada para los distintos funcionarios de la UGEL/DRE y el Minedu, según corresponda, sobre las mejoras en los desempeños de los beneficiarios del PP 0090.",
  "Realizar otras actividades inherentes a sus funciones que le asigne la UGEL.",
];

const calidadInformacionFunctions: string[] = [
  "Asistir técnicamente al trabajo que desarrolla la UGEL en la mejora de la calidad de la información registrada por los especialistas de UGEL o directores de IIEE en los sistemas existentes (Nexus, SIAGIE, Padrón Nacional de IIEE y programas, Padrón de acompañamiento, materiales en IIEE y Censo Escolar), con la finalidad de reducir los posibles errores de registro.",
  "Apoyar en la ejecución de la capacitación a los directores de las IIEE y funcionarios de la UGEL en la gestión y seguridad de la información relacionada a los procesos de registro de información de los sistemas de información, en la gestión de personal, gestión de nómina, asistencia y actas de estudiantes, así como la gestión de recursos educativos y Censo Escolar.",
  "Capacitar, conjuntamente con el Coordinador Regional de Calidad de la Información, a los acompañantes pedagógicos y coordinadores y responsables de las intervenciones que cuenten con acompañamiento pedagógico sobre el adecuado registro de sus actividades.",
  "Apoyar en la implementación de los sistemas que el Minedu desarrolle para la mejora de la gestión de los procesos de las IIEE y las UGEL, en coordinación con el Coordinador Regional de Calidad de la Información.",
  "Revisar la información registrada en los sistemas de información sectoriales tales como NEXUS, Censo Escolar, Padrón de acompañamiento y Materiales en IIEE, en todas las IIEE en el transcurso del año escolar y emitir informes que alerten a los responsables de los sistemas existentes de la presencia de inconsistencias para promover la actualización de la información.",
  "Verificar la composición de los servicios educativos (códigos modulares) que brindan las instituciones educativas, así como sus locales educativos, en base a las coordinaciones y orientaciones brindadas por la OSEE – Unidad de Estadística.",
  "Realizar informes mensuales sobre el avance en la ejecución de sus actividades y problemas o dificultades identificados en los sistemas de información.",
  "Realizar otras actividades inherentes a sus funciones que le asigne la UGEL.",
];

// const Pela = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">PELA</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4"></hr>
//                 <h3 className="text-gray-700 font-semibold mb-4 uppercase">Son funciones del GESTOR LOCAL:</h3>
//                 <NumberedList items={programaFunctions} />
//                 <h3 className="text-gray-700 font-semibold mt-10 mb-4 uppercase">Son funciones del RESPONSABLE LOCAL DE CALIDAD DE LA INFORMACIÓN:</h3>
//                 <NumberedList items={calidadInformacionFunctions} />
//             </div>
//         </div>
//     );
// };

const Pela = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">PELA</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="xl:col-span-2">
            {/* Funciones */}
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Son funciones del GESTOR LOCAL
                </h3>
              </div>
              <NumberedList items={programaFunctions} />

              <div className="flex items-center space-x-3 mb-8 mt-10">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Son funciones del RESPONSABLE LOCAL DE CALIDAD DE LA
                  INFORMACIÓN
                </h3>
              </div>
              <NumberedList items={calidadInformacionFunctions} />
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-blue-100/20 backdrop-blur-sm">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
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
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-blue-600" />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {/* Doc. PAMPA MORALES PEDRO ARTEMIO */}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a
                        href="mailto:ppampa@ugelpomabamba.gob.pe"
                        className="text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-200 hover:underline"
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

export default Pela;
