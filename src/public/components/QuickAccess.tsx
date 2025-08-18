import QuickAccessItem from "./QuickAccessItem";
import { FaPhoneAlt , FaBuilding, FaUsers } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { ImNewspaper } from "react-icons/im";
import { IoIosBookmarks } from "react-icons/io";
import { Link } from "react-router-dom";

export default function QuickAccess() {
  return (
    <section className="container mx-auto bg-green-600 py-0">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-white">
        <Link to="/quienes-somos" className="inline-block">
          <QuickAccessItem icon={<FaUsers />} label="Quienes somos" />
        </Link>
        <Link to="/resena-historica" className="inline-block">
          <QuickAccessItem icon={<IoIosBookmarks />} label="Reseña histórica" />
        </Link>
        <Link to="/comunicados" className="inline-block">
          <QuickAccessItem icon={<ImNewspaper />} label="Comunicados" />  
        </Link>
        <Link to="/convocatorias" className="inline-block">     
          <QuickAccessItem icon={<HiSpeakerphone />} label="Convocatorias" />
        </Link>
        <Link to="/directorio-institucional" className="inline-block">
          <QuickAccessItem icon={<FaBuilding />} label="Directorio Institucional" />
        </Link>
        <Link to="/contacto" className="inline-block">
          <QuickAccessItem icon={<FaPhoneAlt />} label="Contacto" />
        </Link>          
      </div>
    </section>
  );
}
