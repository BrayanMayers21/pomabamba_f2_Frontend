import NumberedList from "../../components/NumberedList";

const archiveFunctions: string[] = [
  "Revisar, clasificar, registrar y archivar la documentación que ingresa y que se proceda en la dirección, mantenimiento, custodia y conservación.",
  "Recibir, clasificar y mantener en buen estado las normas legales, así como la documentación que le sea remitida por los órganos y oficinas.",
  "Formular el inventario de los documentos del archivo general.",
  "Mantener actualizado los registros de control de documentación archivada y entregada en calidad de préstamo.",
  "Expedir copia certificada de las resoluciones y otros documentos del archivo general.",
  "Confeccionar los índices alfabéticos y numéricos de los dispositivos legales para cumplir con el legajo de normas.",
  "Elaborar normas y directivas que orienten el control y la buena conservación de la documentación archivada.",
  "Elabora procedimientos que regula las acciones de recepción, provisión y control de documentos que recibe y entrega del archivo.",
  "Verificar en las autógrafas remitidos el archivo general, el número de folios de los expedientes, etc.",
  "Numera, registra y distribuye las resoluciones emitidas por la sede.",
  "Coordinar con el Jefe para el cuidado tratamiento de la comunicación clasificada.",
  "Realiza otras funciones que le asigne la dirección."
];



const ActasYCertificados = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Actas y Certificados</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>

                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.5º.- Son funciones del Técnico Administrativo I</h3>
                <NumberedList items={archiveFunctions} />
            </div>
        </div>
    );
};

export default ActasYCertificados;
