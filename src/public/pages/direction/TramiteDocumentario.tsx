import NumberedList from "../../components/NumberedList";

const documentManagementFunctions: string[] = [
  "Proyectar, dirigir, controlar, coordinar y evaluar los procesos técnicos del sistema administrativo a su cargo.",
  "Supervisar, coordinar y controlar la aplicación de normas y procedimientos de recepción, registro, distribución, control y archivo de documentos que ingresan y egresan de la dependencia.",
  "Brindar asesoramiento y orientación en aspectos relacionados con los diferentes requisitos documentarios en asuntos relacionados con el archivo general.",
  "Promover nuevas medidas que conduzcan a mejorar el control de trámite documentario y al perfeccionamiento de las técnicas de archivo, aplicada en el mantenimiento y cuidado de la documentación.",
  "Controlar la distribución de la documentación interna y externa.",
  "Controla la atención de los pedidos de antecedentes de resoluciones.",
  "Transcribir las resoluciones que emite la institución.",
  "Elaborar informes técnicos relacionados en el campo de su competencia.",
  "Dictaminar que atiendan a mantener la seguridad de los documentos.",
  "Atender y absolver consultas al administrado.",
  "Realizar las demás funciones que le asigne el Director."
];


const TramiteDocumentario = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Trámite documentario</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>

                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.3º.- Son funciones del Especialista Administrativo I - Tramite Documentario</h3>
                <NumberedList items={documentManagementFunctions} />
            </div>
        </div>
    );
};

export default TramiteDocumentario;
