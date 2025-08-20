import { Mail, User, Building2 } from 'lucide-react';
import NumberedList from "../../components/NumberedList";

const racionalizacionFunctions: string[] = [
  "Realiza estudios de investigación de organización y sugiere medidas para su mejoramiento.",
  "Participar en la formulación del Plan Anual Operativo Institucional referente a racionalización administrativa.",
  "Elaborar y/o analizar proyectos de normas de racionalización.",
  "Absolver consultas relacionadas con el área de su competencia y emitir informes correspondientes.",
  "Efectuar análisis inherentes a los procesos técnicos de racionalización.",
  "Estudiar y proponer acciones para la racionalización de estructuras, funciones, cargos, procedimientos y métodos de trabajo de acuerdo a normas.",
  "Supervisar el desarrollo de procesos técnicos de racionalización de funciones, estructuras, cargos, sistemas, procedimientos y procesos.",
  "Estudiar y proponer alternativas tendientes a reformar o sustituir funciones, cargos, estructuras, sistemas, procedimientos y procesos.",
  "Coordinar y controlar la elaboración de documentos normativos sobre racionalización y otros.",
  "Estudiar y opinar sobre la racionalización del potencial humano, infraestructura y materiales.",
  "Estudiar y opinar sobre acciones de ampliación, creación, fusión, apertura, reubicación y conversión de los servicios educativos en los diferentes niveles y modalidades.",
  "Elaborar los documentos de organización: ROF, MOF, TUPA; y realizar otras funciones de su competencia.",
  "Orientar la organización y llevar el control de las APAFAs de las instituciones educativas.",
  "Elaborar el flujograma de trámite documentario.",
  "Proyectar resoluciones de creación, fusión o supresión de instituciones educativas, de racionalización de plazas y nominación de institución educativa.",
  "Realizar otras funciones inherentes a su cargo."
];

// const Racionalizacion = () => {
//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">Racionalización</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4"></hr>
//                 <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.20º.- Son funciones del ESPECIALISTA EN RACIONALIZACIÓN I:</h3>
//                 <NumberedList items={racionalizacionFunctions} />
//             </div>
//         </div>
//     );
// };


const Racionalizacion = () => {
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
            <h1 className="text-4xl font-bold tracking-tight">Racionalización</h1>
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
                  Art.20º.- Son funciones del ESPECIALISTA EN RACIONALIZACIÓN I
                </h3>
              </div>
              <NumberedList items={racionalizacionFunctions} />
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
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
                    <h6 className="text-2xl font-bold text-center tracking-wide">CONTACTO</h6>
                  </div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-indigo-600" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {/* Doc. PAMPA MORALES PEDRO ARTEMIO */}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-4 border border-indigo-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-indigo-600" />
                      <a 
                        href="mailto:ppampa@ugelpomabamba.gob.pe" 
                        className="text-indigo-700 font-semibold hover:text-indigo-800 transition-colors duration-200 hover:underline"
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

export default Racionalizacion;
