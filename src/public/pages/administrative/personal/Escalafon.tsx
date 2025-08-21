import NumberedList from "../../../components/NumberedList";

const generalFunctions: string[] = [
  "Organizar, dirigir y controlar el proceso de registro en las fichas escalafonarias y llevar el archivo de carpetas personales de todos los trabajadores de la sede, así como de los pensionistas.",
  "Verificar y firmar los convenios y las hojas escalafonarias que emite el equipo, para el otorgamiento de beneficios.",
  "Preparar el informe mensual de los docentes y administrativos que cumplen 20, 25 años las mujeres, y 25–30 años los varones, para el otorgamiento del beneficio correspondiente.",
  "Emitir informes técnicos al Director de Área sobre las Resoluciones Directorales relacionadas a acciones de personal que transgreden las normas y leyes vigentes.",
  "Verificar y controlar la actualización de las fichas escalafonarias y las carpetas respectivas por orden alfabético.",
  "Revisar los cuadros sobre cómputo de tiempo de servicios, remuneración personal y gratificaciones.",
  "Remitir los reportes de resoluciones a la sede central para el escalafón mecanizado.",
  "Revisar y firmar los pases.",
  "Sistematizar el escalafón de personal.",
  "Realizar las demás funciones afines al cargo.",
];

const Escalafon = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Escalafón</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.41º.- Son funciones del ESPECIALISTA ADMINISTRATIVO I - ESCALAFÓN
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default Escalafon;
