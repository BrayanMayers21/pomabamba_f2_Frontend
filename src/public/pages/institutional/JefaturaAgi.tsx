import NumberedList from "../../components/NumberedList";

const planeamientoFunctions: string[] = [
  "Formular, controlar y evaluar el Plan Operativo de la UGEL-P.",
  "Controlar el presupuesto de la Unidad Ejecutora No.305 de Pomabamba.",
  "Verificar la ejecución presupuestaria en concordancia con los calendarios de compromisos autorizados.",
  "Elaborar propuestas de planes, programas, presupuestos y proyectos educativos.",
  "Racionalizar el potencial humano, recursos, bienes, equipos y materiales, y proponer su distribución a la Dirección.",
  "Realizar estudios sobre oferta y demanda educativa y proponer la creación, fusión, reubicación y ampliación de instituciones educativas.",
  "Realizar estudios estadísticos y elaborar indicadores para la toma de decisiones.",
  "Elaborar y mantener actualizada la Carta Educativa y el padrón de instituciones educativas.",
  "Programar y evaluar los proyectos de inversión en infraestructura, equipamiento técnico y cooperación técnica.",
];

const areaPlaneamientoFunctions: string[] = [
  "Formular, controlar y evaluar el Plan Operativo de la Unidad de Gestión Educativa Local de Pomabamba, a través de los responsables.",
  "Dirigir la formulación del proyecto de Presupuesto de la UGEL.",
  "Evaluar la ejecución del presupuesto y aplicar los reajustes correspondientes.",
  "Supervisar la afectación en la ejecución de gastos, elaborar propuestas de planes y programas, presupuesto y proyectos educativos y su evaluación periódica.",
  "Analizar y ejecutar acciones tendientes a mejorar las estructuras, funciones, procedimientos y métodos de trabajo de la UGEL, así como de las instituciones educativas y programas educativos.",
  "Racionalizar el potencial humano, recursos, bienes, equipos y materiales, y proponer a la Dirección su redistribución con apoyo de la Oficina de Administración, a través del Especialista en Racionalización.",
  "Realizar estudios sobre oferta y demanda educativa y proponer la creación, modificación o receso de centros y/o programas educativos en su ámbito territorial.",
  "Realizar estudios estadísticos y elaborar indicadores para la toma de decisiones.",
  "Recopilar, procesar, analizar y difundir la estadística educativa, a través del estadístico.",
  "Elaborar y mantener actualizada la carta educativa y padrón de instituciones educativas y otros documentos análogos, a través del estadístico.",
  "Programar y evaluar los proyectos de inversión en infraestructura, equipamiento educativo y cooperación técnica, a través del responsable de infraestructura y otros.",
  "Participar y proponer la aprobación de los proyectos y diseños técnicos de arquitectura escolar.",
  "Programar y coordinar con las entidades pertinentes actividades destinadas a la construcción y mantenimiento de locales escolares.",
  "Dirigir y supervisar la elaboración del Plan Operativo Institucional y sus evaluaciones, así como los demás documentos de gestión.",
  "Visar los proyectos de resoluciones que impliquen en ofertación presupuestaria.",
];

const JefaturaAgi = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Jefatura AGI</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Texto a la izquierda */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-4 uppercase">
              FUNCIONES GENERALES DEL ÁREA:
            </h3>
            <p className="text-gray-700 font-semibold text-sm mb-4">
              Art.18º.- El Área de Gestión Institucional, es responsable de
              brindar apoyo técnico en las áreas de planeamiento, presupuesto,
              estadística, racionalización e infraestructura del Órgano de
              Dirección y a las instituciones educativas.
            </p>
            <NumberedList items={planeamientoFunctions} />

            <p className="text-gray-700 font-semibold text-sm mt-10 mb-4">
              Art.19º.- Son funciones del Jefe del Área de Gestión
              Institucional.
            </p>
            <NumberedList items={areaPlaneamientoFunctions} />
          </div>

          {/* Imagen a la derecha */}
          <div>
            <div className="bg-white p-6 rounded-md shadow-md text-center">
              <h6 className="text-2xl text-green-700 font-semibold">
                CONTACTO
              </h6>
              <p className="text-gray-600 font-bold mt-4">
                MAG. ELMER RONALD GAMARRA MENDOZA
              </p>
              <a
                href="mailto:egamarra@ugelpomabamba.gob.pe"
                className="text-sm underline text-green-600"
              >
                egamarra@ugelpomabamba.gob.pe
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JefaturaAgi;
