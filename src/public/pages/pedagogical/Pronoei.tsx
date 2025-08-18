import NumberedList from "../../components/NumberedList";

const atencionIntegralFunctions: string[] = [
  "Brindar una atención de calidad a niños y niñas considerando las características culturales de la comunidad en la que viven.",
  "Atender a los niños y niñas de 3 a 5 años de edad de áreas urbano-marginales y rurales que no tienen acceso a un centro educativo inicial.",
  "Involucrar a la comunidad y a la red de aliados (municipios, parroquias, instituciones públicas y privadas, etc.) en la atención integral de los niños y niñas.",
  "Lograr que tanto la familia como la comunidad se involucren activamente en acciones de planificación, ejecución y evaluación del programa.",
  "Mejorar la calidad de vida de niños y niñas y sus familias en el marco de una cultura de crianza que enfatice el desarrollo de las potencialidades de los niños y niñas.",
  "Brindar una atención integral dentro de un esquema de servicio que comprenda Educación, Salud y Nutrición."
];

const Pronoei = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">PRONOEI</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Son objetivos fundamentales de la COORDINADORA DE PRONOEI:</h3>
                <p className="text-gray-700 mb-4 text-sm">Además de buscar ampliar la cobertura de atención para niños y niñas de 3 a 5, PRONEI tiene los siguientes objetivos específicos:</p>
                <NumberedList items={atencionIntegralFunctions} />
            </div>
        </div>
    );
};

export default Pronoei;
