import NumberedList from "../../components/NumberedList";

const accionesPedagogicasFunctions: string[] = [
  "Programar, ejecutar y evaluar permanentemente las acciones técnico-pedagógicas.",
  "Orientar, coordinar, ejecutar y evaluar las acciones de Educación Básica Regular.",
  "Desarrollar los planes y programas educativos.",
  "Elaborar material educativo.",
  "Evaluar el proceso de enseñanza-aprendizaje.",
  "Elaborar informes técnicos sobre las acciones realizadas.",
  "Promover, coordinar y organizar la realización de programas no escolarizados.",
  "Participar en la ejecución de acciones de capacitación docente.",
  "Brindar asesoramiento en asuntos técnico-pedagógicos y administrativos.",
  "Orientar y supervisar el desarrollo de proyectos educativos.",
  "Coordinar entre los especialistas las acciones de monitoreo, acompañamiento y evaluación.",
  "Ejecutar el efecto multiplicador hacia los docentes sobre las innovaciones, y verificar su aplicación mediante el monitoreo y acompañamiento.",
  "Coordinar y establecer mecanismos con padres de familia y autoridades para garantizar el cumplimiento de las horas efectivas de labor docente en las II.EE.",
  "Difundir y hacer cumplir las directivas emanadas de la superioridad.",
  "Evaluar los aprendizajes de los estudiantes mediante concursos y otras estrategias.",
  "Participar en el control de asistencia del personal docente y administrativo de las II.EE. durante las acciones de supervisión o monitoreo.",
  "Realizar otras acciones delegadas por el jefe.",
];

const EducacionSecundaria = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Educación secundaria
          </h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Art.9º.- Son funciones del ESPECIALISTA EN EDUCACIÓN SECUNDARIA:
        </h3>
        <NumberedList items={accionesPedagogicasFunctions} />
      </div>
    </div>
  );
};

export default EducacionSecundaria;
