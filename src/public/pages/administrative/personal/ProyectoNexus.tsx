import NumberedList from "../../../components/NumberedList";

const generalFunctions: string[] = [
  "Proyectar resoluciones de acuerdo a requerimientos y conforme a dispositivos legales.",
  "Reconocer pagos correspondientes según normativa vigente.",
  "Elaborar contratos de personal.",
  "Gestionar licencias por enfermedad, estudios, maternidad, luto, asuntos particulares y otros.",
  "Gestionar el nombramiento de docentes, auxiliares de educación, personal administrativo y de servicio.",
  "Tramitar reasignaciones del personal.",
  "Gestionar encargos de puestos o funciones.",
  "Gestionar destaques y otros movimientos de personal.",
  "Llevar el control de reconocimiento de personal docente, administrativo y de servicio.",
  "Mantener actualizado el control de licencias del personal docente y administrativo, y procesar el informe consolidado de asistencia y permanencia del personal de las II.EE. y sede de la UGEL-P.",
  "Organizar y mantener actualizado el archivo de resoluciones proyectadas y los dispositivos legales vigentes sobre personal.",
  "Realizar las demás funciones afines a su cargo.",
];

const ProyectoNexus = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Proyecto NEXUS
          </h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.38º.- Son funciones del TÉCNICO ADMINISTRATIVO I - PERSONAL
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default ProyectoNexus;
