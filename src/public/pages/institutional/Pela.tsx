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

const Pela = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">PELA</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Son funciones del GESTOR LOCAL:
        </h3>
        <NumberedList items={programaFunctions} />
        <h3 className="text-gray-700 font-semibold mt-10 mb-4 uppercase">
          Son funciones del RESPONSABLE LOCAL DE CALIDAD DE LA INFORMACIÓN:
        </h3>
        <NumberedList items={calidadInformacionFunctions} />
      </div>
    </div>
  );
};

export default Pela;
