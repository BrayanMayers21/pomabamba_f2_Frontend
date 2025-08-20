import { Mail, User, Building2, CheckCircle } from 'lucide-react';
import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Dirige, ejecuta y supervisa la política educativa, así como los planes de desarrollo.",
  "Dirige y orienta la formulación, ejecución y evaluación de los planes de desarrollo educativo y en los aspectos culturales, deportivos y recreacionales.",
  "Dirige la formulación del presupuesto y evaluación de su ejecución en coordinación con la Gerencia Regional de Planeamiento, Presupuesto y Acondicionamiento Territorial-Región Ancash.",
  "Conduce el desarrollo de las actividades educativas, culturales, recreativas y deportivas.",
  "Administra el potencial humano, recursos materiales, financieros y ejecuta las acciones administrativas que se generan en su jurisdicción, de acuerdo a Ley y normas de los respectivos sistemas.",
  "Propone alternativa de política educativa, cultural, recreacional y deportivas.",
  "Estudia y adecúa la currícula y programas educativos.",
  "Ejecuta la supervisión y evaluación de los servicios en las instituciones educativas.",
  "Promover, coordinar el apoyo y participación de los agentes educativos, para el mejoramiento de los servicios y actividades, haciéndolos participar en la gestión educativa.",
  "Preside el COPALE. y comités de coordinación interna y hace cumplir los acuerdos.",
  "Promueve y fortalece la moralización administrativa del sector en todas las instancias educativas.",
  "Promueve, elabora y suscribe convenios y contratos para implementar el desarrollo de las acciones educativas.",
  "Firma Resoluciones Directorales de su competencia."
];


const Direction = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">Dirección</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="xl:col-span-2">
            {/* Tarjeta de Naturaleza */}
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100/50 p-8 mb-8 border border-emerald-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  Naturaleza del Órgano de Dirección
                </h2>
              </div>
              
              <div className="grid gap-4">
                {[
                  "Es responsable de orientar y conducir a la dirección, en relación con los lineamientos de política sectorial, hacia el logro de los fines institucionales.",
                  "El Órgano de Dirección está representado por el Director de la UGEL - P., podrá disponer la conformación de comités técnico de carácter especial y transitorio para ejercer las funciones que no correspondan a los órganos permanentes.",
                  "El Director es el funcionario de más alto nivel en su jurisdicción respectiva.",
                  "En su desempeño emite resoluciones que atañen a la administración y funcionamiento de las instituciones educativas a su cargo."
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 hover:shadow-md transition-all duration-300">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed text-justify">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Funciones */}
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Art.2º.- Son funciones del Director de Programa Sectorial III
                </h3>
              </div>
              <NumberedList items={generalFunctions} />
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 p-6 text-white relative overflow-hidden">
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
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-emerald-600" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        Doc. PAMPA MORALES PEDRO ARTEMIO
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <a 
                        href="mailto:ppampa@ugelpomabamba.gob.pe" 
                        className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors duration-200 hover:underline"
                      >
                        ppampa@ugelpomabamba.gob.pe
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


export default Direction;
