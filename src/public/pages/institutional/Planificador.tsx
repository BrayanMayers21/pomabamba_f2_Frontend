import NumberedList from "../../components/NumberedList";

const planeamientoEducativoFunctions: string[] = [
  "Investigar, analizar, programar y procesar datos, empleando técnicas de investigación.",
  "Elaborar documentos como el Plan Operativo Institucional, diagnóstico situacional y lineamientos de política, con participación de las demás áreas y equipos.",
  "Elaborar y evaluar el Plan Operativo Institucional con participación de las demás áreas y especialistas del área.",
  "Revisar planes, anteproyectos y proyectos.",
  "Elaborar estudios, diagnósticos y proyecciones de sistemas, planes y proyectos generales de desarrollo socioeconómico.",
  "Actualizar y recomendar prioridades sobre proyectos y programas de desarrollo.",
  "Participar en la elaboración del diagnóstico de las instituciones educativas.",
  "Revisar el Plan Operativo y emitir opinión sobre su contenido.",
  "Revisar estudios de investigaciones sobre planeamientos educativos.",
  "Elaborar el informe trimestral de evaluación del Plan Operativo.",
  "Difundir los programas de cooperación técnica internacional.",
  "Proponer el cuadro de aprobación de metas y secciones de las instituciones educativas.",
  "Brindar asesoramiento en materia de planeamiento educativo y demás funciones que se le asignen."
];

const Planificador = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Planificador</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.21º.- Son funciones del PLANIFICADOR I:</h3>
                <NumberedList items={planeamientoEducativoFunctions} />
            </div>
        </div>
    );
};

export default Planificador;
