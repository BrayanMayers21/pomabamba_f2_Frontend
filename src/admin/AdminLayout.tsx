import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AppProvider, type Navigation } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useLocation, useNavigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import DirectoriesList from "./pages/DirectoriesList";
// import Areas from "./pages/Areas";
import Banners from "./pages/Banners";
import Alerts from "./pages/Alerts";
import Sales from "./pages/reports/Sales";
import CreateNoticePageV2 from "./pages/notices/CreateNoticePageV2";
import NoticiasPage from "../assets/components/noticias/table/NoticiasPage";
import ArticlesPage from "./pages/Articles";
import CategoriesList from "./pages/CategoriesList";
import ConvocatoriasPage from "./convocatorias/ConvocatoriasPage";
import AuthorsList from "./pages/AuthorsList";

const NAVIGATION: Navigation = [
  { kind: "header", title: "Principal" },
  { segment: "", title: "Dashboard", icon: <DashboardIcon /> },
  { segment: "directory", title: "Directorios", icon: <DescriptionIcon /> },
  { segment: "areas", title: "Areas", icon: <DashboardIcon /> },
  { segment: "banners", title: "Banners", icon: <DashboardIcon /> },
  { segment: "alerts", title: "Alertas", icon: <NotificationsIcon /> },
  {
    segment: "reclamaciones",
    title: "Reclamaciones",
    icon: <DescriptionIcon />,
  },
  {
    segment: "articles",
    title: "Artículos",
    icon: <DescriptionIcon />,
    children: [
      {
        segment: "",
        title: "Articulos",
        icon: <DescriptionIcon />,
      },
      {
        segment: "list/categories",
        title: "Categorias",
        icon: <DescriptionIcon />,
      },
      {
        segment: "list/authors",
        title: "Autores",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "convocatorias",
    title: "Convocatorias",
    icon: <DescriptionIcon />,
  },
  {
    segment: "notices",
    title: "Noticias",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "create-notice",
        title: "Crear noticia",
        icon: <DescriptionIcon />,
      },
      {
        segment: "list",
        title: "Lista de noticias",
        icon: <DescriptionIcon />,
      },
    ],
  },
  { kind: "divider" },
  { kind: "header", title: "Ejemplo" },
  {
    segment: "reports",
    title: "Reportes ejemplo",
    icon: <BarChartIcon />,
    children: [
      { segment: "sales", title: "Salarios", icon: <DescriptionIcon /> },
    ],
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
});

function PageContent() {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case "/admin/dashboard":
    case "/admin/":
      return <Dashboard />;
    // case "/admin/areas":
    //   return <Areas />;
    case "/admin/banners":
      return <Banners />;
    case "/admin/alerts":
      return <Alerts />;
    case "/admin/notices/create-notice":
      return <CreateNoticePageV2 />;
    case "/admin/noticias/formulario":
      return <NoticiasPage />;
    case "/admin/notices/list":
      return <NoticiasPage />;
    case "/admin/articles":
      return <ArticlesPage />;
    case "/admin/articles/list/categories":
      return <CategoriesList />;
    case "/admin/convocatorias":
      return <ConvocatoriasPage />;
    case "/admin/reports/sales":
      return <Sales />;
    case "/admin/articles/list/authors":
      // Mostrar la página de autores
      return <AuthorsList />;
    case "/admin/directory":
      // Mostrar la página de directorios
      return <DirectoriesList />;
    default:
      return <Typography>No se encontró la página: {path}</Typography>;
  }
}

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Elimina el prefijo "/admin" para que la navegación interna sea relativa
  const relativePath = location.pathname.replace(/^\/admin/, "");

  // Datos del usuario demo - reemplaza con tu lógica de autenticación real
  const currentUser = {
    name: "Juan Pérez",
    email: "juan.perez@ugelpomabamba.gob.pe",
    role: "Administrador",
    avatar: "/path/to/avatar.jpg", // opcional
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    // Aquí implementa tu lógica de logout
    // Por ejemplo: limpiar localStorage, cookies, etc.
    localStorage.removeItem("token");

    // Redirigir al login
    navigate("/login");
  };

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={{
        pathname: relativePath || "/",
        navigate: (path) => navigate(`/admin${path}`),
        searchParams: new URLSearchParams(location.search),
      }}
      theme={theme}
      branding={{
        logo: <Typography color="primary" />,
        title: "UGEL Pomabamba",
      }}
      // Configuración de autenticación
      authentication={{
        signIn: () => {
          // Esta función no se usará en este contexto ya que el usuario ya está autenticado
          console.log("Sign in triggered");
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
