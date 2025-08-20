import NumberedList from "../../components/NumberedList";

const generalFunctions: string[] = [
  "Orientar, coordinar, ejecutar y supervisar las acciones educativas inherentes a su cargo.",
  "Desarrollar los planes y programas.",
  "Orientar el uso de métodos y técnicas de enseñanza – aprendizaje, utilizando materiales educativos.",
  "Evaluar el proceso enseñanza-aprendizaje. Práctica, campo y/o taller.",
  "Orienta y supervisa el desarrollo de proyectos concretos de producción.",
  "Desarrolla las opciones labores en función de la estructura curricular básica.",
  "Reorientar el desarrollo de actividades productivas de las II.EE. con el fin de lograr un equilibrio entre la educación y el trabajo, teniendo el auto sostenimiento y el aprovechamiento de los recursos naturales.",
  "Establecer canales de coordinación con los diferentes sectores y la comunidad, previa firma de convenios.",
  "Formular, coordinar y evaluar los planes anuales multisectoriales de alfabetización y otros.",
  "Promover y organizar acciones de capacitación de los docentes y voluntarios del Programa de Alfabetización.",
  "Orientar la ampliación de currículo, siguiendo las pautas pertinentes del currículo básico de alfabetización.",
  "Supervisar el desarrollo de las acciones de alfabetización, informando periódicamente a la dirección de alfabetización, sobre el logro de las metas trazadas.",
  "Monitorear las actividades educativas del PRONAMA. (Programa Nacional de Movilización por la Alfabetización).",
  "Revisar y elaborar informes técnicos de acuerdo a los requerimientos pedagógicos y administrativos de las modalidades.",
  "Programar y ejecutar acciones de capacitación y actualización docente de acuerdo a los cambios y avances científicos.",
  "Participar en el control de asistencia de personal docente y administrativo de las instituciones educativas durante las acciones de supervisión o monitoreo que realiza.",
  "Desarrollar actividades extracurriculares que promueven el mejoramiento de la calidad educativa y la participación de los agentes de la educación.",
];

const Cetpro = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">CETPRO</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.11º.- Son funciones del EN EDUCACIÓN BÁSICA ALTERNATIVA Y
          EDUCACIÓN TÉCNICO PRODUCTIVA Y CETPROS:
        </h3>
        <NumberedList items={generalFunctions} />
      </div>
    </div>
  );
};

export default Cetpro;
