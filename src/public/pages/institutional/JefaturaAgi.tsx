import {
  Users,
  Mail,
  User,
  FileText,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import NumberedList from "../../components/NumberedList";

const planeamientoFunctions: string[] = [
  "Formular, controlar y evaluar el Plan Operativo de la UGEL-P.",
  "Controlar el presupuesto de la Unidad Ejecutora No.305 de Pomabamba.",
  "Verificar la ejecución presupuestaria en concordancia con los calendarios de compromisos autorizados.",
  "Elaborar propuestas de planes, programas, presupuestos y proyectos educativos.",
  "Racionalizar el potencial humano, recursos, bienes, equipos y materiales, y proponer su distribución a la Dirección.",
  "Realizar estudios sobre oferta y demanda educativa y proponer la creación, fusión, reubicación y ampliación de instituciones educativas.",
  "Realizar estudios estadísticos y elaborar indicadores para la toma de decisiones.",
  "Elaborar y mantener actualizada la Carta Educativa y el padrón de instituciones educativas.",
  "Programar y evaluar los proyectos de inversión en infraestructura, equipamiento técnico y cooperación técnica.",
];

const areaPlaneamientoFunctions: string[] = [
  "Formular, controlar y evaluar el Plan Operativo de la Unidad de Gestión Educativa Local de Pomabamba, a través de los responsables.",
  "Dirigir la formulación del proyecto de Presupuesto de la UGEL.",
  "Evaluar la ejecución del presupuesto y aplicar los reajustes correspondientes.",
  "Supervisar la afectación en la ejecución de gastos, elaborar propuestas de planes y programas, presupuesto y proyectos educativos y su evaluación periódica.",
  "Analizar y ejecutar acciones tendientes a mejorar las estructuras, funciones, procedimientos y métodos de trabajo de la UGEL, así como de las instituciones educativas y programas educativos.",
  "Racionalizar el potencial humano, recursos, bienes, equipos y materiales, y proponer a la Dirección su redistribución con apoyo de la Oficina de Administración, a través del Especialista en Racionalización.",
  "Realizar estudios sobre oferta y demanda educativa y proponer la creación, modificación o receso de centros y/o programas educativos en su ámbito territorial.",
  "Realizar estudios estadísticos y elaborar indicadores para la toma de decisiones.",
  "Recopilar, procesar, analizar y difundir la estadística educativa, a través del estadístico.",
  "Elaborar y mantener actualizada la carta educativa y padrón de instituciones educativas y otros documentos análogos, a través del estadístico.",
  "Programar y evaluar los proyectos de inversión en infraestructura, equipamiento educativo y cooperación técnica, a través del responsable de infraestructura y otros.",
  "Participar y proponer la aprobación de los proyectos y diseños técnicos de arquitectura escolar.",
  "Programar y coordinar con las entidades pertinentes actividades destinadas a la construcción y mantenimiento de locales escolares.",
  "Dirigir y supervisar la elaboración del Plan Operativo Institucional y sus evaluaciones, así como los demás documentos de gestión.",
  "Visar los proyectos de resoluciones que impliquen en ofertación presupuestaria.",
];

// const JefaturaAgi = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen px-4 py-8">
//       <div className="container mx-auto">
//         {/* Título y breadcrumb */}
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-800">Jefatura AGI</h1>
//         </div>
//         <hr className="border-gray-400 my-4"></hr>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//           {/* Texto a la izquierda */}
//           <div>
//             <h3 className="text-gray-700 font-semibold mb-4 uppercase">FUNCIONES GENERALES DEL ÁREA:</h3>
//             <p className="text-gray-700 font-semibold text-sm mb-4">Art.18º.- El Área de Gestión Institucional, es responsable de brindar apoyo técnico en las áreas de planeamiento, presupuesto, estadística, racionalización e infraestructura del Órgano de Dirección y a las instituciones educativas.</p>
//             <NumberedList items={planeamientoFunctions}/>

//             <p className="text-gray-700 font-semibold text-sm mt-10 mb-4">Art.19º.- Son funciones del Jefe del Área de Gestión Institucional.</p>
//             <NumberedList items={areaPlaneamientoFunctions}/>
//           </div>

//           {/* Imagen a la derecha */}
//           <div>
//             <div className="bg-white p-6 rounded-md shadow-md text-center">
//                 <h6 className="text-2xl text-green-700 font-semibold">CONTACTO</h6>
//                 <p className="text-gray-600 font-bold mt-4">MAG. ELMER RONALD GAMARRA MENDOZA</p>
//                 <a href="mailto:egamarra@ugelpomabamba.gob.pe" className="text-sm underline text-green-600">egamarra@ugelpomabamba.gob.pe</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const JefaturaAgi = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Users className="w-12 h-12 text-white/90" />
            <div>
              <h1 className="text-4xl lg:text-4xl font-bold tracking-tight">
                Jefatura AGI
              </h1>
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-2">
            {/* Marco Legal - Funciones Generales */}
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100/50 p-8 mb-8 border border-emerald-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  FUNCIONES GENERALES
                </h2>
              </div>

              {/* Artículo Legal */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-6 rounded-xl mb-6">
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">
                      Artículo 18º
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">
                      El Área de Gestión Institucional, es responsable de
                      brindar apoyo técnico en las áreas de planeamiento,
                      presupuesto, estadística, racionalización e
                      infraestructura del Órgano de Dirección y a las
                      instituciones educativas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <NumberedList items={planeamientoFunctions} />
              </div>
            </div>

            {/* Funciones del Jefe del Área */}
            <div className="bg-white rounded-2xl shadow-xl shadow-teal-100/50 p-8 border border-teal-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-teal-500 to-green-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  <span>Funciones del Jefe del Área</span>
                </h3>
              </div>

              {/* Artículo Legal */}
              <div className="bg-gradient-to-r from-teal-50 to-green-50 border-l-4 border-teal-400 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 leading-relaxed text-justify">
                  <strong>Art.19º.-</strong> Son funciones del Jefe del Área de
                  Gestión Institucional:
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
                <NumberedList items={areaPlaneamientoFunctions} />
              </div>
            </div>
          </div>

          {/* Tarjeta de Contacto y Áreas de Responsabilidad */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Tarjeta de Contacto */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
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

                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-indigo-600" />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        MAG. ELMER RONALD GAMARRA MENDOZA
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a
                        href="mailto:lhuaman@ugelpomabamba.gob.pe"
                        className="text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-200 hover:underline"
                      >
                        egamarra@ugelpomabamba.gob.pe
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Áreas de Responsabilidad */}
              <div className="bg-white rounded-2xl shadow-xl shadow-teal-100/50 p-6 border border-teal-100/20 backdrop-blur-sm">
                {/* Información adicional */}
                <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-4 border border-blue-100 mt-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Gestión administrativa integral para el funcionamiento
                      eficiente de la UGEL.
                    </p>
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


export default JefaturaAgi;
