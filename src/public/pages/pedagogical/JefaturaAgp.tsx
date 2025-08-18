import NumberedList from "../../components/NumberedList";

const gestionPedagogicaFunctions: string[] = [
  "Asesorar, orientar y supervisar la aplicación de los planes curriculares de Educación Básica de las II.EE.",
  "Elaborar, supervisar y evaluar la aplicación del plan de supervisión educativa de las II.EE.",
  "Adecuar los contenidos curriculares y programas educativos a la realidad, en coordinación con la Dirección Nacional de Tecnología Educativa.",
  "Adecuar, difundir y evaluar la aplicación de normas técnico-pedagógicas de las II.EE.",
  "Promover y desarrollar acciones de investigación curricular en las II.EE.",
  "Programar y realizar acciones de supervisión educativa en las II.EE.",
  "Coordinar con la Dirección Nacional de Tecnología Educativa la evaluación del servicio educativo y analizar los resultados a fin de poner en marcha acciones para su mejoramiento.",
  "Apoyar la implementación de los proyectos educativos que realiza los demás sectores y la comunidad.",
  "Promover, apoyar y supervisar la educación ofertada por las II.EE. privadas.",
  "Promover y desarrollar programas de capacitación, actualización y perfeccionamiento docente, y desarrollar ferias escolares de ciencias, coordinando con las comisiones consultivas departamentales del Consejo Nacional de Ciencia y Tecnología (CONCYTEC).",
  "Promover, coordinar, ejecutar, supervisar y evaluar los programas de educación ocupacional y otros.",
  "Proponer y promover la participación activa de instituciones educativas públicas y privadas en las acciones educativas, estableciendo convenios con programas de carácter multisectorial."
];

const gestionCurricularFunctions: string[] = [
  "Elaborar, ejecutar y supervisar la aplicación de los planes curriculares de los diferentes niveles y modalidades educativas.",
  "Elaborar, ejecutar, supervisar y evaluar la aplicación del plan de supervisión educativa en las II.EE. de la jurisdicción.",
  "Adecuar los contenidos curriculares a la realidad local y regional, en coordinación con la Dirección de Tecnología Educativa.",
  "Adecuar, difundir y evaluar la aplicación de las normas técnico pedagógicas en los diferentes niveles y modalidades.",
  "Promover y desarrollar acciones de investigación curricular en los diferentes niveles y modalidades.",
  "Coordinar con la Dirección de Tecnología Educativa la evaluación del servicio educativo, integrar y analizar los resultados a fin de proponer acciones para su mejoramiento.",
  "Programar y realizar acciones de supervisión educativa en las II.EE.",
  "Apoyar la implementación de los proyectos educativos que realizan los demás sectores y la comunidad.",
  "Promover y desarrollar programas de capacitación, actualización y perfeccionamiento docente, y el desarrollo de ferias escolares y de ciencias, coordinando con las comisiones consultivas regionales y CONCYTEC.",
  "Promover, coordinar, ejecutar, supervisar y evaluar los programas de educación no formal, alfabetización y otros.",
  "Proponer y promover la participación activa de las instituciones públicas y privadas en acciones educativas, estableciendo convenios, acuerdos y programas de carácter multisectorial.",
  "Promover, orientar, supervisar y evaluar las acciones de educación bilingüe intercultural y la conservación de las lenguas maternas.",
  "Promover la participación de la comunidad en la gestión y administración educativa.",
  "Coordinar la supervisión de los centros y/o programas de obtención de becas y créditos educativos administrados por el INABEC.",
  "Motivar y orientar la ejecución de actividades productivas en la comunidad a través de las II.EE.",
  "Cumplir las demás funciones que le asigne el Director."
];


const JefaturaAgp = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Jefatura AGP</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Texto a la izquierda */}
          <div>
            <h3 className="text-gray-700 font-semibold mb-4 uppercase">Art.7º.- FUNCIONES GENERALES DEL ÁREA:</h3>
            <NumberedList items={gestionPedagogicaFunctions}/>
            <h3 className="text-gray-700 font-semibold mt-10 mb-4 uppercase">Art.8º.- Son funciones del Jefe del Área de Gestión Pedagógica:</h3>
            <NumberedList items={gestionCurricularFunctions}/>
          </div>

          {/* Imagen a la derecha */}
          <div>
            <div className="bg-white p-6 rounded-md shadow-md text-center">
                <h6 className="text-2xl text-green-700 font-semibold">CONTACTO</h6>
                <p className="text-gray-600 font-bold mt-4">Prof. LEÓN TREJO ALEX SILVIOTRA</p>
                <a href="mailto:aleon@ugelpomabamba.gob.pe" className="text-sm underline text-green-600">aleon@ugelpomabamba.gob.pe</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JefaturaAgp;
