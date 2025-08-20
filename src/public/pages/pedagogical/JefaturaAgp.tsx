import { Mail, User, Building2 } from 'lucide-react';
import NumberedList from "../../components/NumberedList";

const gestionPedagogicaFunctions: string[] = [
  "Asesorar, orientar y supervisar la aplicación de los planes curriculares de Educación Básica de las II.EE.",
  "Elaborar, supervisar y evaluar la aplicación del plan de supervisión educativa de las II.EE.",
  "Adecuar los contenidos curriculares y programas educativos a la realidad, en coordinación con la Dirección Nacional de Tecnología Educativa.",
  "Adecuar, difundir y evaluar la aplicación de normas técnico-pedagógicas de las II.EE.",
  "Promover y desarrollar acciones de investigación curricular en las II.EE.",
  "Programar y realizar acciones de supervisión educativa en las II.EE.",
  "Coordinar con la Dirección Nacional de Tecnología Educativa la evaluación del servicio educativo y analizar los resultados a fin de poner en marcha acciones para su mejoramiento.",
  "Apoyar la implementación de los proyectos educativos que realiza los demás sectores y la comunidad.",
  "Promover, apoyar y supervisar la educación ofertada por las II.EE. privadas.",
  "Promover y desarrollar programas de capacitación, actualización y perfeccionamiento docente, y desarrollar ferias escolares de ciencias, coordinando con las comisiones consultivas departamentales del Consejo Nacional de Ciencia y Tecnología (CONCYTEC).",
  "Promover, coordinar, ejecutar, supervisar y evaluar los programas de educación ocupacional y otros.",
  "Proponer y promover la participación activa de instituciones educativas públicas y privadas en las acciones educativas, estableciendo convenios con programas de carácter multisectorial."
];

const gestionCurricularFunctions: string[] = [
  "Elaborar, ejecutar y supervisar la aplicación de los planes curriculares de los diferentes niveles y modalidades educativas.",
  "Elaborar, ejecutar, supervisar y evaluar la aplicación del plan de supervisión educativa en las II.EE. de la jurisdicción.",
  "Adecuar los contenidos curriculares a la realidad local y regional, en coordinación con la Dirección de Tecnología Educativa.",
  "Adecuar, difundir y evaluar la aplicación de las normas técnico pedagógicas en los diferentes niveles y modalidades.",
  "Promover y desarrollar acciones de investigación curricular en los diferentes niveles y modalidades.",
  "Coordinar con la Dirección de Tecnología Educativa la evaluación del servicio educativo, integrar y analizar los resultados a fin de proponer acciones para su mejoramiento.",
  "Programar y realizar acciones de supervisión educativa en las II.EE.",
  "Apoyar la implementación de los proyectos educativos que realizan los demás sectores y la comunidad.",
  "Promover y desarrollar programas de capacitación, actualización y perfeccionamiento docente, y el desarrollo de ferias escolares y de ciencias, coordinando con las comisiones consultivas regionales y CONCYTEC.",
  "Promover, coordinar, ejecutar, supervisar y evaluar los programas de educación no formal, alfabetización y otros.",
  "Proponer y promover la participación activa de las instituciones públicas y privadas en acciones educativas, estableciendo convenios, acuerdos y programas de carácter multisectorial.",
  "Promover, orientar, supervisar y evaluar las acciones de educación bilingüe intercultural y la conservación de las lenguas maternas.",
  "Promover la participación de la comunidad en la gestión y administración educativa.",
  "Coordinar la supervisión de los centros y/o programas de obtención de becas y créditos educativos administrados por el INABEC.",
  "Motivar y orientar la ejecución de actividades productivas en la comunidad a través de las II.EE.",
  "Cumplir las demás funciones que le asigne el Director."
];


// const JefaturaAgp = () => {
//   return (
//     <div className="bg-gray-100 min-h-screen px-4 py-8">
//       <div className="container mx-auto">
//         {/* Título y breadcrumb */}
//         <div>
//           <h1 className="text-3xl font-semibold text-gray-800">Jefatura AGP</h1>
//         </div>
//         <hr className="border-gray-400 my-4"></hr>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
//           {/* Texto a la izquierda */}
//           <div>
//             <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.7º.- FUNCIONES GENERALES DEL ÁREA:</h3>
//             <NumberedList items={gestionPedagogicaFunctions}/>
//             <h3 className="text-gray-700 font-semibold mt-10 mb-4 uppercase">Art.8º.- Son funciones del Jefe del Área de Gestión Pedagógica:</h3>
//             <NumberedList items={gestionCurricularFunctions}/>
//           </div>

//           {/* Imagen a la derecha */}
//           <div>
//             <div className="bg-white p-6 rounded-md shadow-md text-center">
//                 <h6 className="text-2xl text-green-700 font-semibold">CONTACTO</h6>
//                 <p className="text-gray-600 font-bold mt-4">Prof. LEÓN TREJO ALEX SILVIOTRA</p>
//                 <a href="mailto:aleon@ugelpomabamba.gob.pe" className="text-sm underline text-green-600">aleon@ugelpomabamba.gob.pe</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


const JefaturaAgp = () => {
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
            <h1 className="text-4xl font-bold tracking-tight">Jefatura AGP</h1>
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
                  Art.7º.- FUNCIONES GENERALES DEL ÁREA:
                </h3>
              </div>
              <NumberedList items={gestionPedagogicaFunctions} />

              <div className="flex items-center space-x-3 mb-8 mt-10">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Art.8º.- Son funciones del Jefe del Área de Gestión Pedagógica:
                </h3>
              </div>
              <NumberedList items={gestionCurricularFunctions} />
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
                    <h6 className="text-2xl font-bold text-center tracking-wide">CONTACTO</h6>
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
                        Prof. LEÓN TREJO ALEX SILVIOTRA
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
                        aleon@ugelpomabamba.gob.pe
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

export default JefaturaAgp;
