import {
  Settings,
  Users,
  Mail,
  User,
  FileText,
  DollarSign,
  Briefcase,
  CheckCircle,
  ClipboardList,
} from "lucide-react";

import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Ejecutar el presupuesto de la UGEL.",
  "Programar, adquirir y distribuir oportuna y racionalmente los bienes y servicios en su ámbito con opinión técnica del Área de Gestión Institucional.",
  "Ejecutar y evaluar la contabilidad integrada.",
  "Actualizar el inventario de los bienes, muebles, inmuebles y otros.",
  "Asesorar y evaluar la ejecución presupuestaria en los órganos de ejecución establecidos.",
  "Ejecutar los procesos técnicos y acciones de personal docente y administrativo de la jurisdicción, con las excepciones que señale la Ley o reglamento.",
  "Emitir resoluciones referente: a permutas, bonificación personal, bonificación familiar, gratificaciones, subsidios por luto y gastos por sepelio, créditos internos (devengados) sobre remuneraciones, bonificaciones, reconocimiento de tiempo de servicios, licencias y otros por expresa decisión del Director.",
  "Desarrollar programas de capacitación administrativa.",
  "Organizar y actualizar el escalafón del personal docente y administrativo.",
  "Programar y ejecutar acciones de bienestar de desarrollo, personal y administrativo de los servicios correspondientes.",
  "Elaborar las planillas de pago del personal, activos, pensionistas, y otras funciones que le deleguen.",
  "Realizar el registro del SIAF, de la ejecución presupuestal.",
  "Brindar apoyo técnico en asuntos relacionados al sistema informático.",
  "Planificar el equipamiento y sistema informático.",
  "Implementar los sistemas de información que requiere la gestión.",
];

const areaFunctions: string[] = [
  "Planificar, coordinar, supervisar y evaluar las actividades que realizan los demás equipos de la oficina de administración.",
  "Revisar y firmar los informes de ejecución presupuestarios y propuestos de modificación, los calendarios de pagos, las solicitudes de giro, la relación de retenciones, la relación de cheques anulados, los compromisos de pago, los cheques y constancias de pago de remuneraciones o sueldos.",
  "Coordinar con el Área de Gestión Institucional, la formulación del presupuesto de bienes, servicios y los respectivos calendarios de compromisos.",
  "Revisar y refrendar el cuadro de adquisiciones de suministros y los inventarios de bienes muebles e inmuebles, de acuerdo a los requerimientos aprobados por el CEP.",
  "Disponer la formulación, visar y/o proyectar resoluciones sobre aspectos financieros, contables y de acciones de personal.",
  "Autorizar los pagos a cuentas de los fondos para pagos en efectivo.",
  "Verificar las consolidaciones bancarias y extractos bancarios.",
  "Participar en las comisiones de licitación pública de precios y adquisiciones directas.",
  "Participar en el comité de administración del SUB–CAFAE.",
  "Coordinar con los directores de las II.EE. para la distribución de recursos, bienes y servicios, así como el pago de haberes.",
  "Visar las planillas de haberes, de servicios y viáticos.",
  "Organizar e implementar las acciones de seguridad, mantenimiento y conservación de las instituciones educativas, equipos, materiales y otros.",
  "Disponer la formulación de los proyectos de resoluciones del sistema de su competencia y visar las resoluciones de personal que determina el reglamento de la UGEL-P.",
  "Estudiar y calificar los expedientes con el Especialista del equipo correspondiente.",
  "Revisar y visar los informes técnicos y los proyectos de resolución que corresponde a la oficina.",
  "Firmar las planillas de pago.",
  "Participar en la comisión de procesos administrativos, selección de personal, reasignaciones, capacitaciones, bienestar y otros en calidad de secretario técnico.",
  "Programar, ejecutar y evaluar las acciones de capacitación y actualización del personal directivo y administrativo de la sede y de las II.EE.",
  "Llevar la información actualizada de plazas vacantes de las instituciones educativas por niveles, modalidades y turnos.",
  "Revisar y firmar los informes periódicos sobre control de asistencia y puntualidad del personal de la sede.",
  "Adecuar, orientar, coordinar y supervisar el cumplimiento de las normas y procedimientos de los sistemas a su cargo.",
  "Realizar las demás funciones afines al cargo que asigne el Director.",
];

const JefaturaDeAdministracion = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-4">
            <Settings className="w-12 h-12 text-white/90" />
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">
                Jefatura de Administración
              </h1>
              {/* <p className="text-xl text-white/80 mt-2">Administración</p> */}
            </div>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contenido Principal */}
          <div className="lg:col-span-1">
            {/* Marco Legal - Funciones Generales */}
            <div className="bg-white rounded-2xl shadow-xl shadow-emerald-100/50 p-8 mb-8 border border-emerald-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-emerald-500 to-teal-600 rounded-full"></div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
                  FUNCIONES GENERALES
                </h2>
              </div>

              {/* Artículo Legal */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-400 p-6 rounded-xl mb-6">
                <div className="flex items-start space-x-3">
                  <FileText className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-2">
                      Artículo 29º
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed text-justify">
                      El órgano de apoyo es responsable de la Administración y
                      desarrollo del potencial humano, y de la administración
                      financiera, así como de los bienes y servicios de la UGEL,
                      y desempeña las siguientes funciones:
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                <NumberedList items={generalFunctions} />
              </div>
            </div>

            {/* Funciones del Jefe del Área */}
            <div className="bg-white rounded-2xl shadow-xl shadow-teal-100/50 p-8 border border-teal-100/20 backdrop-blur-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-8 bg-gradient-to-b from-teal-500 to-green-600 rounded-full"></div>
                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-teal-600" />
                  <span>Funciones del Jefe del Área</span>
                </h3>
              </div>

              {/* Artículo Legal */}
              <div className="bg-gradient-to-r from-teal-50 to-green-50 border-l-4 border-teal-400 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-700 leading-relaxed text-justify">
                  <strong>Art.30º.-</strong> Son funciones del Jefe del Área de
                  Administración:
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-green-50 rounded-xl p-6 border border-teal-100">
                <NumberedList items={areaFunctions} />
              </div>
            </div>
          </div>

          {/* Tarjeta de Contacto y Áreas de Responsabilidad */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Tarjeta de Contacto */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-200/30 overflow-hidden border border-emerald-100/20 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-emerald-600 via-teal-600 to-green-600 p-6 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <h6 className="text-2xl font-bold text-center tracking-wide">
                      CONTACTO
                    </h6>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <div className="text-center space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-emerald-600" />
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-bold text-gray-800 mb-1">
                        Mag. HUAMAN REYES LIDSAY KATTY
                      </p>
                      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto"></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
                    <div className="flex items-center justify-center space-x-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <a
                        href="mailto:lhuaman@ugelpomabamba.gob.pe"
                        className="text-emerald-700 font-semibold hover:text-emerald-800 transition-colors duration-200 hover:underline"
                      >
                        lhuaman@ugelpomabamba.gob.pe
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Áreas de Responsabilidad */}
              <div className="bg-white rounded-2xl shadow-xl shadow-teal-100/50 p-6 border border-teal-100/20 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-6 bg-gradient-to-b from-teal-500 to-green-600 rounded-full"></div>
                  <h3 className="text-xl font-bold text-gray-800">
                    Áreas de Responsabilidad
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Presupuesto y Finanzas */}
                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Presupuesto y Finanzas
                        </h4>
                        <p className="text-sm text-gray-600">
                          Ejecución presupuestal y contabilidad
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recursos Humanos */}
                  <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-4 border border-teal-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-600 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Recursos Humanos
                        </h4>
                        <p className="text-sm text-gray-600">
                          Gestión del personal docente y administrativo
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Logística y Bienes */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          Logística y Bienes
                        </h4>
                        <p className="text-sm text-gray-600">
                          Adquisiciones e inventarios
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Información adicional */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100 mt-4">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Gestión administrativa integral para el funcionamiento
                      eficiente de la UGEL.
                    </p>
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

export default JefaturaDeAdministracion;
