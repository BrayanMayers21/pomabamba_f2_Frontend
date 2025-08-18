import ServiceCard from "./ServiceCard";
import { FaUserClock, FaUserTie, FaBook  } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { MdComputer } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
//import Logo from '@/assets/images/logo_libro_reclamaciones.jpg';

export default function ServicesPanel() {
  return (
    <section className="py-8">
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">

        <ServiceCard
          icon={<FaUserClock />}
          title="CONTRATO CAS"
          description="Contrato Administrativo de Servicios"
        />
        <ServiceCard
          icon={<FaUserTie />}
          title="CONTRATO DOCENTE"
          description="Contrato de Trabajo Docente y Nombramiento"
        />
        <ServiceCard
          icon={<GrDocumentText />}
          title="DOCUMENTOS DE GESTIÓN"
          description="Documentos y Procedimientos Administrativos"
        />
        <ServiceCard
          icon={<MdComputer />}
          title="MESA DE PARTES VIRTUAL"
          description="Realiza tus trámites administrativos"
        />
        <ServiceCard
          icon={<HiOutlineClipboardDocumentList />}
          title="CONTRATO DE DOCENTES"
          description="Contratos y Nombramientos de Docentes"
        />
        <ServiceCard
           icon={<FaBook  />}
           title="LIBRO DE RECLAMACIONES"
           description="Digital"
        />       

      </div>
    </section>
  );
}
