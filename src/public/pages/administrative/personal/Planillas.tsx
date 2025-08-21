import NumberedList from "../../../components/NumberedList";

const generalFunctions: string[] = [
  "Dirigir, distribuir, orientar y controlar las acciones y tareas del equipo a su cargo.",
  "Revisar mensualmente, bajo responsabilidad, la planilla única de pagos matriz de activos y cesantes para su actualización.",
  "Realizar el control del número de plazas presupuestadas y pagadas en coordinación con el Especialista en Finanzas.",
  "Coordinar con los órganos competentes de la sede central y la Dirección de Informática todo lo relacionado al proceso de elaboración de planillas.",
  "Supervisar el chequeo de planillas y remitirlas a tesorería para el cargo mensual.",
  "Revisar y firmar las informaciones de liquidaciones, adelantos por remuneraciones compensatorias y créditos internos (devengados) por diferencia de pensión.",
  "Elaborar informes técnicos referentes a pagos.",
  "Revisar y validar la ejecución de los procesos en el Sistema Único de Planillas de la UGEL Pomabamba.",
  "Realizar otras funciones inherentes a su cargo.",
];

const generalFunctionsTecnico: string[] = [
  "Procesar las resoluciones que son emitidas por la dirección de la entidad por diversos conceptos: bonificación personal, familiar, cambio de nivel, contratos, nombramientos, cese, entre otros.",
  "Realizar las liquidaciones de descuentos mensuales efectuados en la planilla única de pagos.",
  "Revisar los cheques y planillas antes de efectuarse el pago.",
  "Realizar el control del número de plazas presupuestadas y pagadas a nivel de la sede, coordinando con el personal responsable del sistema (NEXUS).",
  "Confeccionar planillas para descuentos judiciales.",
  "Ejecutar las liquidaciones de los expedientes presentados por los usuarios, ya sea por adelanto de compensación, créditos internos, gratificaciones, etc.",
  "Depurar permanentemente las planillas matrices para su actualización.",
  "Efectuar la liquidación de expedientes que solicitan ceses por diferentes motivos y el cálculo de beneficios.",
  "Recepcionar las planillas y cheques mensuales de haberes procedentes de la oficina de informática.",
  "Realizar las demás funciones que se le asignen.",
  "Realizar las fases de compromiso de la planilla de remuneración y pensiones del personal de la jurisdicción de la Unidad Ejecutora UGEL Pomabamba.",
  "Elaborar la solicitud de certificaciones presupuestales ante el Área de Gestión Institucional (AGI).",
  "Ejecutar en cuenta Teleahorro los listados de cheques de las remuneraciones.",
];

const Planillas = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Planillas</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.39º.- Son funciones del ESPECIALISTA ADMINISTRATIVO I PLANILLAS
        </h3>
        <NumberedList items={generalFunctions} />

        <h3 className="text-gray-700 font-semibold mb-4 mt-10 uppercase">
          Art.40º.- Son funciones del TÉCNICO ADMINISTRATIVO I - PLANILLAS
        </h3>
        <NumberedList items={generalFunctionsTecnico} />
      </div>
    </div>
  );
};

export default Planillas;
