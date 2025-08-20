import NumberedList from "../../components/NumberedList";

const racionalizacionFunctions: string[] = [
  "Realiza estudios de investigación de organización y sugiere medidas para su mejoramiento.",
  "Participar en la formulación del Plan Anual Operativo Institucional referente a racionalización administrativa.",
  "Elaborar y/o analizar proyectos de normas de racionalización.",
  "Absolver consultas relacionadas con el área de su competencia y emitir informes correspondientes.",
  "Efectuar análisis inherentes a los procesos técnicos de racionalización.",
  "Estudiar y proponer acciones para la racionalización de estructuras, funciones, cargos, procedimientos y métodos de trabajo de acuerdo a normas.",
  "Supervisar el desarrollo de procesos técnicos de racionalización de funciones, estructuras, cargos, sistemas, procedimientos y procesos.",
  "Estudiar y proponer alternativas tendientes a reformar o sustituir funciones, cargos, estructuras, sistemas, procedimientos y procesos.",
  "Coordinar y controlar la elaboración de documentos normativos sobre racionalización y otros.",
  "Estudiar y opinar sobre la racionalización del potencial humano, infraestructura y materiales.",
  "Estudiar y opinar sobre acciones de ampliación, creación, fusión, apertura, reubicación y conversión de los servicios educativos en los diferentes niveles y modalidades.",
  "Elaborar los documentos de organización: ROF, MOF, TUPA; y realizar otras funciones de su competencia.",
  "Orientar la organización y llevar el control de las APAFAs de las instituciones educativas.",
  "Elaborar el flujograma de trámite documentario.",
  "Proyectar resoluciones de creación, fusión o supresión de instituciones educativas, de racionalización de plazas y nominación de institución educativa.",
  "Realizar otras funciones inherentes a su cargo.",
];

const Racionalizacion = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Racionalización
          </h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.20º.- Son funciones del ESPECIALISTA EN RACIONALIZACIÓN I:
        </h3>
        <NumberedList items={racionalizacionFunctions} />
      </div>
    </div>
  );
};

export default Racionalizacion;
