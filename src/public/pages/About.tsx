import NumberedList from "../components/NumberedList";
import { GraduationCap, Target, Eye, Users, BookOpen } from 'lucide-react';

const funcionesGenerales: string[] = [
  'Contribuir a la formulación, difusión y asesoramiento en la aplicación de la política y normatividad educativa local, regional y nacional, así como evaluar sus resultados y retroalimentar el sistema educativo.',
  'Elaborar, ejecutar y evaluar el Proyecto Educativo Local (PEL) de su jurisdicción, articulado con el Plan de Desarrollo Local con el Proyecto Educativo Regional y Nacional, como instrumento orientador de la gestión educativa local.',
  'Regular y supervisar la gestión pedagógica, administrativa e institucional de las Instituciones y Programas Educativas de Educación Básica Regular, Básica Especial, Básica Alternativa, Técnico-Productiva y Comunitaria bajo su jurisdicción, fortaleciendo su autonomía institucional.',
  'Prestar apoyo administrativo y logístico a las instituciones públicas de su jurisdicción.',
  'Asesorar en la formulación, ejecución y evaluación del presupuesto anual de las instituciones educativas.',
  'Conducir el proceso de evaluación y de ingreso del personal docente y administrativo y desarrollar acciones de personal, atendiendo los requerimientos de las Instituciones y Programas Educativos, en coordinación con la Dirección Regional de Educación.',
  'Promover la formación y funcionamiento de redes educativas como forma de cooperación entre Instituciones y Programas Educativos de su jurisdicción, los cuales establecen alianzas estratégicas con instituciones especializadas de la comunidad.',
  'Apoyar el desarrollo y la adaptación de nuevas tecnologías de la comunicación y de la información para conseguir el mejoramiento del sistema educativo con una orientación intersectorial.',
  'Promover y ejecutar estrategias y programas efectivos de alfabetización de acuerdo con las características socio-culturales y lingüísticas de cada localidad.',
  'Conformar e impulsar el Consejo Participativo Local de Educación (COPALE), como órgano de participación y concertación a fin de generar acuerdos y promover la vigilancia ciudadana.',
  'Elaborar, ejecutar y evaluar el presupuesto anual de la Unidad de Gestión Educativa Local y sus modificaciones, sobre la base de objetivos y metas regional y local.',
  'Determinar las necesidades de infraestructura y equipamiento, así como participar en su construcción y mantenimiento, en coordinación y apoyo del gobierno local y regional.',
  'Promover y apoyar la diversificación y desarrollo de los currículos de las instituciones y Programas Educativos en su jurisdicción.',
  'Promover y apoyar centros culturales, bibliotecas, teatros y talleres de arte, así como el deporte y recreación, y brindar apoyo sobre la materia a los Gobiernos Locales que lo requieran.',
  'Identificar las necesidades de capacitación del personal docente y administrativo y desarrollar programas de capacitación, así como brindar facilidades para la superación profesional.',
  'Formular proyectos para el desarrollo educativo local y gestionarlos ante las instituciones de cooperación nacional e internacional.',
  'Participar en la formulación, ejecución y evaluación de proyectos de investigación, experimentación e innovación pedagógica que aporte al mejoramiento de la calidad del servicio educativo.',
  'Participar en las acciones de evaluación y medición de la calidad educativa que ejecuta la Dirección Regional de Educación y el Gobierno Regional.',
  'Actuar como instancia administrativa en los asuntos de su competencia.',
  'Informar a las entidades oficiales correspondientes y a la opinión pública de los resultados de su gestión.',
];

const imagenInstitucion = '/images/institutional/about.png';


const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-blue-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <GraduationCap className="w-12 h-12 text-white/90" />
            <h1 className="text-5xl font-bold tracking-tight">Quiénes Somos</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Misión */}
          <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100/50 overflow-hidden border border-emerald-100/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-600 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center tracking-wide uppercase">Misión</h3>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                Somos una instancia de ejecución descentralizada del Gobierno Regional de Ancash que busca asegurar la oferta de un servicio educativo de calidad a través de una gestión transparente y participativa mediante el desarrollo de lineamientos técnicos, estrategias y políticas, orientados a optimizar la calidad del servicio a nivel de las Instituciones educativas de nuestro ámbito jurisdiccional de Pomabamba, que conlleve a satisfacer las necesidades educativas y la realización de nuestros educandos, contribuyendo decididamente al fortalecimiento del sistema democrático, la cultura de paz y el desarrollo sostenido local regional y nacional, asimismo hacer uso racional y eficiente de recursos presupuestales y financieros.
              </p>
            </div>
          </div>

          {/* Visión */}
          <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden border border-blue-100/20 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-6 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-center tracking-wide uppercase">Visión</h3>
              </div>
            </div>
            
            <div className="p-8">
              <p className="text-gray-700 leading-relaxed text-lg text-justify">
                La Unidad de Gestión Educativa Local - Pomabamba al concluir el año 2021 es una entidad educativa de gestión transparente, participativa y confiable, con personal idóneo comprometido para el uso racional y eficiente de recursos presupuestales y financieros; así mismo para el acompañamiento a los profesionales de la educación para lograr la calidad educativa.
              </p>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="bg-white rounded-2xl shadow-xl shadow-teal-100/50 p-8 border border-teal-100/20 backdrop-blur-sm">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent uppercase">
              UGEL Pomabamba
            </h2>
          </div>

          {/* Descripción con imagen flotante */}
          <div className="relative">
            

            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-6 rounded-xl mb-8">
              <div className="flex items-start space-x-3">
                <Users className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-emerald-800 mb-2">Nuestra Institución</h3>
                  <p className="text-gray-700 leading-relaxed text-lg text-justify">
                    La Unidad de Gestión Educativa Local de Pomabamba es una institución cuyo principal objetivo es brindar una Educación de Calidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Funciones Generales */}
            <div className="clear-both">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                  <span>Funciones Generales</span>
                </h3>
              </div>
              
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">

                <div className="float-right ml-8 mb-8 max-w-md">
                  <div className="group">
                    <img
                      src={imagenInstitucion}
                      alt="Imagen institucional UGEL Pomabamba"
                      className="w-full h-auto rounded-2xl shadow-xl border border-gray-200 
                      transition-all duration-500 ease-in-out
                      group-hover:scale-105 group-hover:shadow-2xl
                      group-hover:brightness-105
                      group-hover:contrast-105
                      group-hover:-translate-y-1
                      group-hover:rotate-1"
                    />
                  </div>
                </div>

                <NumberedList items={funcionesGenerales} />
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

export default AboutPage;