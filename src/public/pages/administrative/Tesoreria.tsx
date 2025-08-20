import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Elaborar y firmar los documentos siguientes: relación de retenciones, relación de cheques anulados, comprobantes de pago, recibos de ingresos, liquidación de la planilla de haberes y la información administrativa y contable.",
  "Girar cheques manuales de haberes de bienes y servicios, los montos a considerarse en el calendario de compromisos y pagos.",
  "Girar cheques manuales de haberes, de bienes y servicios, y otras obligaciones.",
  "Elaborar y firmar la conciliación de las cuentas de enlace.",
  "Remitir, previa coordinación con el Especialista Administrativo I (Planillas), la información contable relacionada a reembolsos por licencia.",
  "Elaborar la liquidación de las planillas de haberes de acuerdo al resumen IBM y la información del Equipo de Planillas.",
  "Elaborar las constancias de pago e informes sobre pagos de remuneraciones, descuentos, gastos de sepelio, pago de devengados, últimas remuneraciones no cobradas y otras.",
  "Efectuar el pago de los gastos mensuales autorizados con resolución.",
  "Efectuar los empoces respectivos a las cuentas corrientes del Banco de la Nación y las reversiones a la cuenta única del tesoro público.",
  "Efectuar el pago de haberes de personal activo, cesantes, sobrevivientes, descuentos judiciales, alquiler de locales, bienes, servicios, encargos y otros.",
  "Realizar el control y captación de los recursos de las II.EE. y de la sede, así como los ingresos por venta de material técnico pedagógico recibido del Ministerio de Educación.",
  "Reportar información mensual para el registro en SIAF, en todas las fases de la ejecución presupuestal.",
  "Actualizar en forma mensual la información para el pago de los descuentos de Ley, a través del programa PDT.",
  "Llenar el libro bancos.",
  "Efectuar la fase de girado de cheques girados al SIAF.",
  "Reportar cheques en cartera a contabilidad.",
  "Realizar las demás funciones afines al cargo.",
];

const Tesoreria = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Tesorería</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.32º.- Son funciones del TESORERO I
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default Tesoreria;
