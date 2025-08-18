import LogoPomabamba from '@/assets/images/pomabamba.png';
import { Link } from 'react-router-dom';

export default function Logo() {
    return (
        <Link to="/" className="flex items-center hover:opacity-90 transition-all">
            <img src={LogoPomabamba} alt="Logo" className="h-17 w-20 rounded-3xl" />
            <div className="ml-3 ">
                <p className="text-base text-white leading-none">
                    UNIDAD DE GESTIÓN <br />EDUCATIVA LOCAL
                </p>
                <h1 className="text-2xl font-bold text-white">POMABAMBA</h1>
            </div>
        </Link>
    );
}
