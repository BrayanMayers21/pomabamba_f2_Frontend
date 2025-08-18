import NumberedList from "../../components/NumberedList";

const estadisticaFunctions: string[] = [
  "Recopilar información técnica variada para la elaboración de documentos.",
  "Realizar tareas de apoyo en la investigación, estudio y procesamiento de datos.",
  "Participar en la elaboración de los diagnósticos y lineamientos generales.",
  "Preparar fichas, cuadros, gráficos, estadísticos y otros.",
  "Intervenir en la preparación de reglamentos, manuales de procedimientos, directivas y otros, referentes a proyectos de desarrollo educativo.",
  "Elaborar y actualizar el padrón de centros y/o programas educativos.",
  "Elaborar y actualizar las estadísticas.",
  "Difundir la estadística de la UGEL-P.",
  "Participar en la elaboración y evaluación de las metas educacionales y preparar informes técnicos de estadística.",
  "Participar en la elaboración y evaluación del Plan Operativo Institucional.",
  "Realizar las demás funciones que se le asigne."
];


const Estadistica = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Estadística</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.23º.- Son funciones del ESTADÍSTICO:</h3>
                <NumberedList items={estadisticaFunctions} />
            </div>
        </div>
    );
};

export default Estadistica;
