import { Mail, User, Building2, Target, Phone, MapPin } from "lucide-react";
import { useState } from "react";

interface NumberedListProps {
  items: string[];
}

const NumberedList = ({ items }: NumberedListProps) => {
  return (
    <div className="grid gap-4">
      {items.map((item, index) => (
        <div key={index} className="group">
          <div className="bg-white rounded-xl border-l-4 border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 p-5 hover:transform hover:scale-[1.02]">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-lg group-hover:rotate-6 transition-transform duration-300">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors duration-200">
                {item}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const generalFunctions = [
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

const Cetpro = () => {
  const [activeTab] = useState("funciones");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
      {/* Hero Banner estilo inicial */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">CETPRO</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {activeTab === "funciones" && (
              <div className="space-y-8">
                {/* Section Header */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Funciones Institucionales
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-6"></div>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    <strong>Art.11º.-</strong> Son funciones del EN EDUCACIÓN
                    BÁSICA ALTERNATIVA Y EDUCACIÓN TÉCNICO PRODUCTIVA Y CETPROS:
                  </p>
                </div>

                {/* Functions List */}
                <NumberedList items={generalFunctions} />
              </div>
            )}

            {activeTab === "contacto" && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl mb-6">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Información de Contacto
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto"></div>
                </div>

                <div className="grid gap-6">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Email Institucional
                      </p>
                      <a
                        href="mailto:informes@ugelpomabamba.gob.pe"
                        className="text-amber-600 hover:text-orange-700 font-medium"
                      >
                        informes@ugelpomabamba.gob.pe
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Ubicación</p>
                      <p className="text-gray-600">UGEL Pomabamba - Ancash</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        Horario de Atención
                      </p>
                      <p className="text-gray-600">
                        Lunes a Viernes: 8:00 AM - 5:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar estilo inicial */}
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
                        href="mailto:informes@ugelpomabamba.gob.pe"
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
      </div>
    </div>
  );
};

export default Cetpro;
