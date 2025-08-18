import { FaFacebookF, FaWhatsapp , FaYoutube } from 'react-icons/fa';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Izquierda */}
        <Logo />

        {/* Derecha */}
        <div className="flex flex-col md:items-end text-center md:text-right gap-2">
          <div className="flex gap-4 justify-center md:justify-end">
            <a href="https://www.facebook.com/pg/ugel.pomabamba.ancash/" target='_blank' aria-label="Facebook" className="hover:text-blue-500 text-2xl">
              <FaFacebookF />
            </a>
            <a href="https://api.whatsapp.com/send?phone=51996982234&text=Hola,%20UGEL%20Pomabamba" target='_blank' aria-label="Twitter" className="hover:text-green-400 text-2xl">
              <FaWhatsapp />
            </a>
            <a href="https://www.youtube.com/@ugelpomabamba4494" target='_blank' aria-label="YouTube" className="hover:text-red-500 text-2xl">
              <FaYoutube />
            </a>
          </div>
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} UGEL Pomabamba. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
