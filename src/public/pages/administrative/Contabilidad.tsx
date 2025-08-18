import React from 'react';
import NumberedList from '../../components/NumberedList';

const generalFunctions: string[] = [
  "Elaborar y formular las notas de contabilidad en el Sistema Integrado de Administración Financiera del Sector Público (SIAF-SP).",
  "Coordinar el avance de la ejecución presupuestaria y opinar sobre las propuestas de modificación.",
  "Revisar y firmar la conciliación bancaria y el informe mensual del gasto.",
  "Visar los comprobantes de pago, previa revisión de la documentación sustentatoria.",
  "Revisar e integrar contablemente los partes diarios de fondos, almacén y las notas presupuestales.",
  "Revisar y visar la afectación presupuestal de las órdenes de compra y de servicio.",
  "Confeccionar el avance de la ejecución del gasto por asignaciones generales, específicas y por subprogramas.",
  "Realizar el arqueo de fondos para pagos en efectivo, dos veces al año.",
  "Revisar mensualmente las autorizaciones de giro, cartas órdenes electrónicas de bienes y servicios; así mismo remuneraciones y pensiones.",
  "Revisar y firmar las operaciones contables de la Dirección y la información contable proveniente de las II.EE. que realizan actividades productivas.",
  "Llevar el libro actualizado de mayorización y el Libro Diario del SIAF-SP.",
  "Preparar y coordinar con el tesorero la rendición documentada de la cuenta en cargo.",
  "Elaborar los Estados Presupuestarios y Estados Financieros de la UGEL-P, de manera trimestral, semestral y anual.",
  "Asesorar y supervisar a los integrantes del equipo de planillas, tesorería, abastecimiento y almacén.",
  "Elaborar el balance de comprobación de estados financieros en el SIAF-SP.",
  "Realizar fiscalización previa de las órdenes de compra y de servicios de la Unidad Ejecutora y Unidad Operativa.",
  "Revisar y firmar las conciliaciones de cuentas de enlace, en coordinación con el tesorero.",
  "Realizar las demás funciones afines al cargo."
];

const Contabilidad: React.FC = () => {
    // Dividir las funciones en dos mitades
    const midPoint = Math.ceil(generalFunctions.length / 2);
    const firstHalf = generalFunctions.slice(0, midPoint);
    const secondHalf = generalFunctions.slice(midPoint);

    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Contabilidad</h1>
                </div>
                <hr className="border-gray-400 my-4" />
                <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.31º.- Son funciones del CONTADOR I</h3>
                
                {/* Layout responsivo: 1 columna en móvil, 2 columnas en pantallas grandes */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                    {/* Primera columna */}
                    <div className="mb-8 lg:mb-0">
                        <NumberedList items={firstHalf} />
                    </div>
                    
                    {/* Segunda columna */}
                    <div>
                        <NumberedList items={secondHalf} startIndex={midPoint} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contabilidad;