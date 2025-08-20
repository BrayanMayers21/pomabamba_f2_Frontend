import NumberedList from "../../../components/NumberedList";

const generalFunctions: string[] = [
  "Dirigir, distribuir, orientar y supervisar las acciones de administración de personal a su cargo.",
  "Formular y actualizar el cuadro de plazas vacantes de las II.EE.",
  "Estudiar y proponer los movimientos de personal docente, administrativo y de servicios de acuerdo a las normas y disposiciones legales vigentes.",
  "Elaborar el rol de vacaciones, los formularios de control y los cuadros estadísticos de las resoluciones y expedientes.",
  "Estudiar y derivar expedientes con indicación para su atención.",
  "Recepcionar y visar los expedientes y proyectos de resolución sobre acciones administrativas de personal.",
  "Firmar las transcripciones de las resoluciones que, por delegación, emite la oficina de administración referidas a acciones de personal.",
  "Elaborar y desarrollar el plan de capacitación y actualización del personal administrativo, coordinando su ejecución.",
  "Elaborar y desarrollar el plan de bienestar social para los trabajadores de la sede y de las II.EE., coordinando las formas organizativas necesarias para la administración de los servicios.",
  "Organizar y ejecutar propuestas de racionalización de personal en coordinación y con opinión del Área de Gestión Institucional (AGI).",
  "Elaborar informes, decretos y otros documentos sobre acciones de personal.",
  "Coordinar con los Directores de las II.EE. en asuntos relacionados con normas de personal.",
  "Analizar expedientes, proyectar resoluciones y emitir informes técnicos sobre nombramientos, contratos, reasignaciones, licencias, modificaciones y otros.",
  "Formular y mantener actualizado el CAP de la sede y de las II.EE. a su cargo, así como el cuadro de plazas vacantes.",
  "Realizar las demás funciones afines al cargo.",
];

const JefaturaDePersonal = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Jefatura de Personal
          </h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.37º.- Son funciones del ESPECIALISTA ADMINISTRATIVO I - PERSONAL
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default JefaturaDePersonal;
