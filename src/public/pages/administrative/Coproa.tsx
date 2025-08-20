import NumberedList from "../../components/NumberedList";

const docenteFunctions: string[] = [
  "Cumplir eficazmente el proceso de aprendizaje de los estudiantes, realizando con responsabilidad y efectividad los procesos pedagógicos, actividades curriculares y de gestión docente en planificación, aula y evaluación, conforme al diseño curricular nacional.",
  "Orientar al educando respetando su libertad, autonomía, identidad, creatividad y participación, colaborando con padres y dirección en su formación integral. Evaluar este proceso y proponer mejoras.",
  "Respetar los derechos de los estudiantes y de los padres de familia.",
  "Presentarse a las evaluaciones médicas y psicológicas requeridas por la autoridad competente según el reglamento.",
  "Cumplir con la asistencia y puntualidad conforme al calendario escolar y horario de trabajo.",
  "Aportar en la formulación del Proyecto Educativo Institucional y asumir responsabilidades asignadas.",
  "Participar en actividades de formación en servicio cuando sean seleccionados por instituciones, redes educativas, UGEL, DRE o el MINEDU.",
  "Presentarse a las evaluaciones establecidas por la Carrera Pública Magisterial y otras determinadas por autoridades competentes.",
  "Ejercer la docencia con ética, civismo y sin discriminación de ningún tipo.",
  "Conocer, valorar y respetar las culturas locales y la lengua originaria en el ámbito nacional.",
  "Contribuir al desarrollo cultural y ciudadano de los miembros de la institución educativa y la comunidad.",
  "Informar a los padres sobre el desempeño escolar de sus hijos, dialogando sobre objetivos y estrategias educativas.",
  "Cuidar, usar óptimamente y rendir cuentas de los bienes institucionales a su cargo.",
  "Basar sus actividades profesionales en el respeto mutuo, derechos humanos, la Constitución del Perú, solidaridad, tolerancia y cultura de paz y democracia.",
  "Coadyuvar al trabajo en equipo con docentes de la institución y, si aplica, de las instancias de gestión educativa descentralizada.",
  "Participar en los sistemas tutoriales implementados por la institución educativa.",
  "Cumplir con otros deberes establecidos por la presente ley u otras normas específicas de la materia.",
];

const Coproa = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">COPROA</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <h3 className="text-gray-700 font-semibold mb-4 uppercase">
          Son funciones de los Docentes:
        </h3>
        <NumberedList items={docenteFunctions} />
      </div>
    </div>
  );
};

export default Coproa;
