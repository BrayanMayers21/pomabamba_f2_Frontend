import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Elaborar y mantener actualizado el Inventario de Activo Fijo y de Bienes Muebles de la Sede Institucional y de la jurisdicción de la Unidad de Gestión Educativa Local de Huaraz, a través del SIGA.",
  "Administrar, registrar, controlar, cautelar y fiscalizar los bienes patrimoniales de las Instituciones Educativas y de la Sede de la UGEL Huaraz.",
  "Supervisar constantemente a las Instituciones Educativas sobre el control y actualización patrimonial de bienes.",
  "Orientar y capacitar a los responsables del control de bienes patrimoniales en las Instituciones Educativas.",
  "Ingresar el patrimonio institucional al Margesí de Bienes Nacionales y realizar su permanente actualización.",
  "Dar de alta y baja a los bienes muebles de la institución y de las Instituciones Educativas, a través de los sistemas informáticos SIGA y otros.",
  "Elaborar las conciliaciones de remesas de los bienes recibidos de la Sede Central del Ministerio de Educación y otras entidades.",
  "Elaborar actas de transferencias de bienes excedentes para transferir a las Instituciones Educativas.",
  "Autorizar por escrito, registrar y controlar la entrada y salida del local institucional de los bienes patrimoniales, firmando para tal efecto la correspondiente 'Papeleta de autorización para el desplazamiento interno/externo y/o entrada/salida de bienes patrimoniales'.",
  "Participar en la Comisión de Altas, Bajas y Ventas de Bienes Muebles Patrimoniales de la Sede Institucional como Secretario Técnico.",
  "Realizar el informe final sobre el inventario general de la Unidad de Gestión Educativa Local Huaraz y remitirlo a la Superintendencia de Bienes Nacionales.",
  "Controlar el uso adecuado de los vehículos motorizados de la Sede Institucional y elaborar el parte diario de salida de los mismos.",
  "Llevar un archivo permanente de la reparación y mantenimiento de los vehículos de la Sede Institucional.",
  "Realizar otras funciones de su competencia, que le asigne el Jefe de Unidad o Área."
];


const Patrimonio = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Patrimonio</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Son funciones del Control Patrimonial</h3>
                <NumberedList items={generalFunctions} />
            </div>
        </div>
    );
};

export default Patrimonio;
