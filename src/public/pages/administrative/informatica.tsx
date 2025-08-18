import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Planificar el equipamiento informático.",
  "Crear, administrar y supervisar el banco de datos.",
  "Proponer a la jefatura las normas que rigen la actividad informática de la oficina.",
  "Solucionar los problemas del hardware y el software.",
  "Formular y desarrollar los programas que sirvan para los sistemas informáticos.",
  "Administrar y mantener la operatividad y seguridad de los sistemas de planillas, SUP, SIRA, NEXUS, etc.",
  "Formular y desarrollar programas informáticos que apoyen los sistemas de gestión institucional.",
  "Administrar y mantener operativos y seguros los sistemas de planillas, escalafón, personal, abastecimientos, SIRA y NEXUS, buscando su mejora continua.",
  "Evaluar, proponer e implementar nuevas tecnologías como soluciones para la optimización de procesos administrativos institucionales.",
  "Implementar los sistemas de información que requiere la gestión de la UGEL.",
  "Administrar la base de datos institucional bajo un esquema racional e integrado.",
  "Establecer la conectividad entre la Sede Central y UGEL, prestando soporte tecnológico para el equipamiento de cómputo y comunicaciones (LAN/WAN), así como evaluar y renovar el paquete informático conforme al avance tecnológico.",
  "Brindar soporte técnico a las diferentes áreas de la sede de la UGEL.",
  "Realizar las demás funciones que se le asignen."
];

const Informatica = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Informática</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.44º.- Son funciones del ANALISTA DE SISTEMAS I (Centro de Cómputo e Informática)</h3>
                <NumberedList items={generalFunctions} />
            </div>
        </div>
    );
};

export default Informatica;
