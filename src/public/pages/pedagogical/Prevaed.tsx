import { Mail, User, Building2 } from "lucide-react";
// const Prevaed = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">PREVAED</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4"></hr>
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//                     <div>
//                         <p className="text-sm text-gray-600 text-justify">Es un programa multisectorial a nivel nacional que aborda el problema específico relacionado con la población y sus medios de vida vulnerables ante el impacto de amenazas con secuelas de desastre.</p>
//                     </div>
//                     <div></div>
//                 </div>

//             </div>
//         </div>
//     );
// };

const Prevaed = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-amber-100 min-h-screen font-sans">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-400 to-amber-400 text-white py-16 px-4 relative overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Building2 className="w-14 h-14 text-white drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
              PREVAED
            </h1>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-300 to-blue-300 rounded-full mb-2"></div>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl drop-shadow text-center">
            Programa multisectorial nacional para la gestión de riesgos y
            desastres en la educación.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="xl:col-span-2">
            {/* Funciones */}
            <div className="bg-white rounded-2xl shadow-lg border border-blue-100/30 p-10 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-700 to-blue-400 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-900 uppercase tracking-wide">
                  ¿Qué es PREVAED?
                </h3>
              </div>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                Es un programa multisectorial a nivel nacional que aborda el
                problema específico relacionado con la población y sus medios de
                vida vulnerables ante el impacto de amenazas con secuelas de
                desastre.
              </p>
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-amber-100/30 overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-blue-700 via-blue-400 to-amber-400 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h6 className="text-2xl font-bold text-center tracking-wide drop-shadow">
                      CONTACTO
                    </h6>
                  </div>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-amber-100 rounded-full flex items-center justify-center border border-blue-200">
                        <User className="w-10 h-10 text-blue-700" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-700 mb-1">
                        Prof. LEÓN TREJO ALEX SILVIOTRA
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-700 to-amber-400 mx-auto"></div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-amber-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5 text-blue-700" />
                      <a
                        href="mailto:informes@ugelpomabamba.gob.pe"
                        className="text-blue-700 font-semibold hover:text-amber-600 transition-colors duration-200 hover:underline"
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
        </div>

        {/* Espaciado inferior */}
        <div className="py-12"></div>
      </div>
    </div>
  );
};

export default Prevaed;
