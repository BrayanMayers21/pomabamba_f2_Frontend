import Logo from '@/assets/images/logo_libro_reclamaciones.jpg';

export default function ReclamacionesBanner() {
  return (

    <div className='flex justify-center mb-8'>
      <div className='border-green-600 border-2 rounded-2xl p-4 bg-white hover:shadow-md hover:scale-105 transition-all duration-300'>
        <a href="#">
          <img src={Logo} alt="Logo" className='max-w-48' />
        </a>
      </div>
    </div>

  );
}
