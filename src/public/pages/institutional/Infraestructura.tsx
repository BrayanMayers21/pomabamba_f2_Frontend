import NumberedList from "../../components/NumberedList";

const areaInfraestructuraFunctions: string[] = [
  "Ejecutar proyectos de ingeniería civil, entre otras.",
  "Calcular y/o diseñar estructuras, planos y especificaciones de proyectos y obras.",
  "Participar en estudios de factibilidad de obras, inversiones y proyectos de explotación e industrialización.",
  "Efectuar trabajos de investigación científica y técnica dentro del área de su especialidad.",
  "Efectuar delimitaciones, tasaciones y otras acciones similares en extensiones de terreno.",
  "Proponer la adquisición de equipos, herramientas y material necesario para el desarrollo de programas de ingeniería.",
  "Analizar, evaluar y preparar informes técnicos sobre denuncias, concesiones, posibilidades de explotación de yacimientos, conservación de equipos y maquinarias, y sobre otras áreas especializadas de ingeniería.",
  "Supervisar, controlar y evaluar la ejecución de los programas de mantenimiento, conservación y construcción de la infraestructura educativa, que le encargue el Instituto Nacional de Infraestructura Educativa o cualquier otra entidad.",
  "Brindar asesoramiento técnico para las obras que ejecute la Asociación de Padres de Familia y la comunidad.",
  "Brindar apoyo a las instituciones educativas para el saneamiento legal de terrenos de propiedad del centro educativo.",
  "Participar en la evaluación del Plan Operativo Institucional (POI).",
  "Cumplir con las demás atribuciones afines que le compete y asigne la jefatura."
];

const Infraestructura = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Infraestructura</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.22º.- Son funciones del INGENIERO I:</h3>
                <NumberedList items={areaInfraestructuraFunctions} />
            </div>
        </div>
    );
};

export default Infraestructura;
