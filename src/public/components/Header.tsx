import Logo from './Logo';
import { FaUser } from 'react-icons/fa';
import PortalTransparencia from '@/assets/images/pte_logo.svg';
import PortalGob from '@/assets/images/gob_pe_white.svg';
import LogoReclamo from '@/assets/images/libro_reclamo.svg';

export default function Header() {
  return (
    <header className="bg-green-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {/* Logo + nombre de la UGEL */}
          <Logo />
        </div>
        <div className='flex items-center gap-4'>
          {/* Íconos de usuario, gob.pe, etc */}
          <a href="/login" className='text-2xl'>
            <FaUser />
          </a>
          <a href="https://www.gob.pe/" target="_blank" rel="noopener noreferrer" className='text-xl'>
            <img src={PortalTransparencia} alt="Portal de Transparencia" className='h-6' />
          </a>
          <a href="https://www.gob.pe/" target="_blank" rel="noopener noreferrer" className='text-xl'>
            <img src={LogoReclamo} alt="Libro de Reclamaciones" className='h-9 w-24' />
          </a>
          <a href="https://www.gob.pe/" target="_blank" rel="noopener noreferrer" className='text-xl'>
            <img src={PortalGob} alt="Portal del Gobierno del Perú" className='h-6' />
          </a>
        </div>
      </div>
    </header>
  );
}
