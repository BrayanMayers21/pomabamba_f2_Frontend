import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div>
      {/* Puedes agregar un logo o encabezado común aquí si quieres */}
      <Outlet />
    </div>
  );
}
