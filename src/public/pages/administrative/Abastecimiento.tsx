import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Coordinar, consolidar y ejecutar los cuadros de necesidades de la sede y de las II.EE.",
  "Elaborar y reformular las pólizas de entrada y salida de bienes.",
  "Formular el presupuesto de compras.",
  "Elaborar y tramitar la solicitud de cotizaciones, cuadro comparativo de cotizaciones, órdenes de servicios, pedidos, comprobantes de salida, notas de entrada a almacén y otros.",
  "Llevar actualizado el inventario de bienes, muebles, equipos e inmuebles de la UGEL y de las II.EE.",
  "Controlar la salida de los bienes que se adquieren.",
  "Participar en las comisiones de licitación pública, concurso público de precios para adquirir bienes, servicios y otros que se le asigne.",
  "Llevar el registro de proveedores.",
  "Apoyar el equipamiento de las II.EE. en coordinación con los Directores.",
  "Distribuir los trabajos al personal de servicios auxiliares, es decir, a los trabajadores de servicio.",
  "Llevar el registro y control de los servicios prestados y tarjetas de mantenimiento de máquinas y equipos.",
  "Controlar las entradas y salidas de los vehículos, dando cuenta al Director de la oficina.",
  "Verificar la conformidad de los artículos remitidos por los proveedores con las especificaciones de las órdenes de compra y realizar su almacenamiento.",
  "Velar por la conservación, mantenimiento y seguridad de los bienes almacenados.",
  "Emitir informes para dar de baja a los materiales y equipos de oficina en desuso.",
  "Realizar las adquisiciones de los bienes y servicios.",
  "Rendir cuenta documentada del uso de los materiales que utiliza el personal de servicio.",
  "Participar en la comisión de altas y bajas y ventas de bienes del sector.",
  "Actualizar el llenado del software de la Superintendencia de Bienes Nacionales (SBN) para la remisión a las instituciones responsables.",
  "Formular la documentación para el cierre de cuentas del semestre y de fin de año.",
  "Realizar las fases del compromiso, devengado y girado de las órdenes de compra de servicio y planilla de viáticos.",
  "Verificar los saldos existentes por programas, realizar el trámite de anulaciones y nuevos girados de cheques y apoyar en el ingreso en las tres fases del registro en cuanto al ingreso de remuneraciones y pensiones.",
  "Realizar otras funciones afines al cargo.",
];

const Abastecimiento = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Abastecimiento
          </h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.35º.- Son funciones del ESPECIALISTA ADMINISTRATIVO I -
          ABASTECIMIENTOS
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default Abastecimiento;
