import { Mail, User, Building2 } from "lucide-react";
import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Orientar, coordinar, ejecutar y supervisar las acciones educativas inherentes a su cargo.",
  "Desarrollar los planes y programas.",
  "Orientar el uso de métodos y técnicas de enseñanza – aprendizaje, utilizando materiales educativos.",
  "Evaluar el proceso enseñanza-aprendizaje. Práctica, campo y/o taller.",
  "Orienta y supervisa el desarrollo de proyectos concretos de producción.",
  "Desarrolla las opciones labores en función de la estructura curricular básica.",
  "Reorientar el desarrollo de actividades productivas de las II.EE. con el fin de lograr un equilibrio entre la educación y el trabajo, teniendo el auto sostenimiento y el aprovechamiento de los recursos naturales.",
  "Establecer canales de coordinación con los diferentes sectores y la comunidad, previa firma de convenios.",
  "Formular, coordinar y evaluar los planes anuales multisectoriales de alfabetización y otros.",
  "Promover y organizar acciones de capacitación de los docentes y voluntarios del Programa de Alfabetización.",
  "Orientar la ampliación de currículo, siguiendo las pautas pertinentes del currículo básico de alfabetización.",
  "Supervisar el desarrollo de las acciones de alfabetización, informando periódicamente a la dirección de alfabetización, sobre el logro de las metas trazadas.",
  "Monitorear las actividades educativas del PRONAMA. (Programa Nacional de Movilización por la Alfabetización).",
  "Revisar y elaborar informes técnicos de acuerdo a los requerimientos pedagógicos y administrativos de las modalidades.",
  "Programar y ejecutar acciones de capacitación y actualización docente de acuerdo a los cambios y avances científicos.",
  "Participar en el control de asistencia de personal docente y administrativo de las instituciones educativas durante las acciones de supervisión o monitoreo que realiza.",
  "Desarrollar actividades extracurriculares que promueven el mejoramiento de la calidad educativa y la participación de los agentes de la educación.",
];

// const Cetpro = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">CETPRO</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4"></hr>
//                 <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.11º.- Son funciones del EN EDUCACIÓN BÁSICA ALTERNATIVA Y EDUCACIÓN TÉCNICO PRODUCTIVA Y CETPROS:</h3>
//                 <NumberedList items={generalFunctions} />
//             </div>
//         </div>
//     );
// };

const Cetpro = () => {
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
            <h1 className="text-4xl font-bold tracking-tight">CETPRO</h1>
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
                  Art.11º.- Son funciones del EN EDUCACIÓN BÁSICA ALTERNATIVA Y
                  EDUCACIÓN TÉCNICO PRODUCTIVA Y CETPROS:
                </h3>
              </div>
              <NumberedList items={generalFunctions} />
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

export default Cetpro;
