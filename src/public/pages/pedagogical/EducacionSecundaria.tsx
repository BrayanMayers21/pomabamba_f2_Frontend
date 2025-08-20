import { Mail, User, Building2 } from "lucide-react";
import NumberedList from "../../components/NumberedList";

const accionesPedagogicasFunctions: string[] = [
  "Programar, ejecutar y evaluar permanentemente las acciones técnico-pedagógicas.",
  "Orientar, coordinar, ejecutar y evaluar las acciones de Educación Básica Regular.",
  "Desarrollar los planes y programas educativos.",
  "Elaborar material educativo.",
  "Evaluar el proceso de enseñanza-aprendizaje.",
  "Elaborar informes técnicos sobre las acciones realizadas.",
  "Promover, coordinar y organizar la realización de programas no escolarizados.",
  "Participar en la ejecución de acciones de capacitación docente.",
  "Brindar asesoramiento en asuntos técnico-pedagógicos y administrativos.",
  "Orientar y supervisar el desarrollo de proyectos educativos.",
  "Coordinar entre los especialistas las acciones de monitoreo, acompañamiento y evaluación.",
  "Ejecutar el efecto multiplicador hacia los docentes sobre las innovaciones, y verificar su aplicación mediante el monitoreo y acompañamiento.",
  "Coordinar y establecer mecanismos con padres de familia y autoridades para garantizar el cumplimiento de las horas efectivas de labor docente en las II.EE.",
  "Difundir y hacer cumplir las directivas emanadas de la superioridad.",
  "Evaluar los aprendizajes de los estudiantes mediante concursos y otras estrategias.",
  "Participar en el control de asistencia del personal docente y administrativo de las II.EE. durante las acciones de supervisión o monitoreo.",
  "Realizar otras acciones delegadas por el jefe.",
];

// const EducacionSecundaria = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">Educación secundaria</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4"></hr>
//                 <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.9º.- Son funciones del ESPECIALISTA EN EDUCACIÓN SECUNDARIA:</h3>
//                 <NumberedList items={accionesPedagogicasFunctions} />
//             </div>
//         </div>
//     );
// };

const EducacionSecundaria = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">
              Educación Secundaria
            </h1>
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
                  Art.9º.- Son funciones del ESPECIALISTA EN EDUCACIÓN
                  SECUNDARIA:
                </h3>
              </div>
              <NumberedList items={accionesPedagogicasFunctions} />
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
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-red-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-red-600" />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-amber-600 mb-1">
                        {/* Prof. LEÓN TREJO ALEX SILVIOTRA */}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-amber-600 to-red-400 mx-auto"></div>
                    </div>
                  </div>

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

export default EducacionSecundaria;
