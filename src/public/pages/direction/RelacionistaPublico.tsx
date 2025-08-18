import NumberedList from "../../components/NumberedList";

const communicationFunctions: string[] = [
  "Informa y difunde sobre las actividades de la institución, a través de los diferentes medios de comunicación.",
  "Diseñar, elaborar y aplicar materiales de información de los diferentes medios a fin de mejorar las comunicaciones externas e internas.",
  "Promover el intercambio de información con otras dependencias.",
  "Desarrollar programas de actividades sociales, culturales y deportivas.",
  "Recepcionar y atender a comisiones o delegaciones que visiten la entidad sobre asuntos relacionados a la educación.",
  "Coordina en preparar medios de comunicación, tales como ediciones radiofónicas, el periódico mural, boletín interno y otros.",
  "Promover e implementar el intercambio de información con dependencias públicas.",
  "Organizar y supervisar campañas oficiales de difusión.",
  "Realizar las demás funciones delegadas por el Director."
];


const RelacionistaPublico = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Relacionista Público</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>

                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.4º.- Son funciones del Relacionista Público I</h3>
                <NumberedList items={communicationFunctions} />
            </div>
        </div>
    );
};

export default RelacionistaPublico;
