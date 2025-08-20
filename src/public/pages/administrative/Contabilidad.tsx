import { Mail, User, Building2 } from 'lucide-react';
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

// const Contabilidad: React.FC = () => {
//     // Dividir las funciones en dos mitades
//     const midPoint = Math.ceil(generalFunctions.length / 2);
//     const firstHalf = generalFunctions.slice(0, midPoint);
//     const secondHalf = generalFunctions.slice(midPoint);

//     return (
//         <div className="bg-gray-100 min-h-screen px-4 py-8">
//             <div className="container mx-auto">
//                 {/* Título y breadcrumb */}
//                 <div>
//                     <h1 className="text-3xl font-semibold text-gray-800">Contabilidad</h1>
//                 </div>
//                 <hr className="border-gray-400 my-4" />
//                 <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.31º.- Son funciones del CONTADOR I</h3>
                
//                 {/* Layout responsivo: 1 columna en móvil, 2 columnas en pantallas grandes */}
//                 <div className="lg:grid lg:grid-cols-2 lg:gap-8">
//                     {/* Primera columna */}
//                     <div className="mb-8 lg:mb-0">
//                         <NumberedList items={firstHalf} />
//                     </div>
                    
//                     {/* Segunda columna */}
//                     <div>
//                         <NumberedList items={secondHalf} startIndex={midPoint} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


const Contabilidad = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Building2 className="w-12 h-12 text-white/90" />
            <h1 className="text-4xl font-bold tracking-tight">Contabilidad</h1>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Contenido Principal */}
          <div className="xl:col-span-2">
            
            {/* Funciones */}
            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <h3 className="text-2xl font-bold text-gray-800 uppercase tracking-wide">
                  Art.31º.- Son funciones de Contabilidad
                </h3>
              </div>
              <NumberedList items={generalFunctions} />
            </div>
          </div>

          {/* Tarjeta de Contacto */}
          <div className="xl:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
                {/* Header de la tarjeta */}
                <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h6 className="text-2xl font-bold text-center tracking-wide">CONTACTO</h6>
                  </div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-emerald-600" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        {/* Doc. PAMPA MORALES PEDRO ARTEMIO */}
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <a 
                        href="mailto:ppampa@ugelpomabamba.gob.pe" 
                        className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors duration-200 hover:underline"
                      >
                        ugelpomabamba@ugelpomabamba.gob.pe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Espaciado inferior */}
        <div className="py-12"></div>
      </div>
    </div>
  );
};
export default Contabilidad;