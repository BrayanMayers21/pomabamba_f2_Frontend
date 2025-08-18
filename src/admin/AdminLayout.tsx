import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useLocation, useNavigate } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Areas from './pages/Areas';
import Sales from './pages/reports/Sales';
import { CreateNoticePage } from './pages/notices/CreateNoticePage';
import NoticesPage from './pages/notices/NoticesPage';

const NAVIGATION: Navigation = [
  { kind: 'header', title: 'Principal' },
  { segment: '', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'areas', title: 'Areas', icon: <DashboardIcon /> },
  {
    segment: 'notices',
    title: 'Noticias',
    icon: <BarChartIcon />,
    children: [
      { segment: 'create-notice', title: 'Crear noticia', icon: <DescriptionIcon /> },
      { segment: 'list', title: 'Lista de noticias', icon: <DescriptionIcon /> },
    ],
  },
  { kind: 'divider' },
  { kind: 'header', title: 'Ejemplo' },
  {
    segment: 'reports',
    title: 'Reportes ejemplo',
    icon: <BarChartIcon />,
    children: [
      { segment: 'sales', title: 'Salarios', icon: <DescriptionIcon /> },
    ],
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
});

function PageContent() {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case '/admin/dashboard':
    case '/admin/':
      return <Dashboard />;
    case '/admin/areas':
      return <Areas />;
    case '/admin/notices/create-notice':
      return <CreateNoticePage />;
    case '/admin/notices/list':
      return <NoticesPage />;
    case '/admin/reports/sales':
      return <Sales />;
    default:
      return <Typography>No se encontró la página: {path}</Typography>;
  }
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Elimina el prefijo "/admin" para que la navegación interna sea relativa
  const relativePath = location.pathname.replace(/^\/admin/, '');

  // Datos del usuario demo - reemplaza con tu lógica de autenticación real
  const currentUser = {
    name: 'Juan Pérez',
    email: 'juan.perez@ugelpomabamba.gob.pe',
    role: 'Administrador',
    avatar: '/path/to/avatar.jpg', // opcional
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí implementa tu lógica de logout
    // Por ejemplo: limpiar localStorage, cookies, etc.
    localStorage.removeItem('token');
    
    // Redirigir al login
    navigate('/login');
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        pathname: relativePath || '/',
        navigate: (path) => navigate(`/admin${path}`),
        searchParams: new URLSearchParams(location.search),
      }}
      theme={theme}
      branding={{
        logo: <Typography color="primary" />,
        title: 'UGEL Pomabamba',
      }}
      // Configuración de autenticación
      authentication={{
        signIn: () => {
          // Esta función no se usará en este contexto ya que el usuario ya está autenticado
          console.log('Sign in triggered');
        },
        signOut: handleLogout,
      }}
      // Información del usuario actual
      session={{
        user: {
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.avatar,
        },
      }}
    >
      <DashboardLayout>
        <PageContent />
      </DashboardLayout>
    </AppProvider>
  );
}