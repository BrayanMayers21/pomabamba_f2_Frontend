import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Elaborar y reformular las pólizas de entrada y salida de bienes.",
  "Elaborar los comprobantes de salida, notas de entrada a almacén y otros.",
  "Controlar la salida de los bienes que se adquieren.",
  "Verificar la conformidad de los artículos remitidos por los proveedores, con las especificaciones de las órdenes de compra, y realizar su almacenamiento.",
  "Velar por la conservación, mantenimiento y seguridad de los bienes almacenados.",
  "Formular la documentación para el cierre de cuentas del semestre y de fin de año.",
  "Firmar las pecosas de salida de los bienes.",
  "Firmar las órdenes de compra de ingreso de materiales.",
  "Distribuir los materiales adquiridos para las Instituciones Educativas y las áreas de la sede de la UGEL-P.",
  "Realizar las demás funciones afines al cargo."
];

const Almacen = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Almacén</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.36º.- Son funciones del TÉCNICO ADMINISTRATIVO I - ALMACÉN</h3>
                <NumberedList items={generalFunctions} />
            </div>
        </div>
    );
};

export default Almacen;
