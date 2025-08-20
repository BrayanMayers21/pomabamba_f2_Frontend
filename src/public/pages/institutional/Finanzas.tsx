import NumberedList from "../../components/NumberedList";

const presupuestoFunctions: string[] = [
  "Elaborar el Presupuesto Analítico de Personal – PAP en forma anual.",
  "Analizar la normatividad y aplicarla en la ejecución de programas presupuestales de acuerdo al módulo que diseña el MEF.",
  "Analizar estados e informes financieros y sugerir modificaciones.",
  "Estudiar y orientar la aplicación de normas y procedimientos del sistema presupuestal.",
  "Elaborar las reprogramaciones y ampliaciones presupuestales.",
  "Realizar conciliaciones presupuestales.",
  "Participar en la regularización por la mala aplicación de partidas presupuestales.",
  "Participar en la elaboración de la normatividad y estadísticas presupuestales.",
  "Participar en la formulación y evaluación del Plan Operativo Institucional.",
  "Elaborar y consolidar los calendarios de compromiso en coordinación con el área de Administración.",
  "Elaborar los informes de evaluación de presupuesto según el periodo que determine el MEF.",
  "Participar en la revisión de los proyectos de resoluciones que implique afectación presupuestaria.",
  "Elaborar notas de modificaciones presupuestarias.",
  "Realizar las demás funciones que se le asigne.",
];

const Finanzas = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Finanzas</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.24º.- Son funciones del FINANZAS I:
        </h3>
        <NumberedList items={presupuestoFunctions} />
      </div>
    </div>
  );
};

export default Finanzas;
