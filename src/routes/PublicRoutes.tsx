// src/routes/publicRoutes.tsx
import type { RouteObject } from "react-router-dom";
import PublicLayout from "../public/PublicLayout";
import Home from "../public/pages/Home";
import About from "../public/pages/About";
import News from "../public/pages/News";
import HistoricalReview from "../public/pages/HistoricalReview";
import NewsDetail from "../public/pages/NewsDetail";
import Direction from "../public/pages/direction/Direction";
import MesaDePartes from "../public/pages/direction/MesaDePartes";
import TramiteDocumentario from "../public/pages/direction/TramiteDocumentario";
import ActasYCertificados from "../public/pages/direction/ActasYCertificados";
import RelacionistaPublico from "../public/pages/direction/RelacionistaPublico";
import JefaturaDeAsesoria from "../public/pages/direction/asesoriaJuridica/JefaturaDeAsesoria";
import AdmisibilidadRecurso from "../public/pages/direction/asesoriaJuridica/AdmisibilidadRecurso";
import FutVirtual from "../public/pages/services/FutVirtual";
import ManualesGSuite from "../public/pages/services/ManualesGSuite";
import JefaturaDeAdministracion from "../public/pages/administrative/JefaturaDeAdministracion";
import Abastecimiento from "../public/pages/administrative/Abastecimiento";
import Tesoreria from "../public/pages/administrative/Tesoreria";
import Contabilidad from "../public/pages/administrative/Contabilidad";
import Patrimonio from "../public/pages/administrative/Patrimonio";
import Almacen from "../public/pages/administrative/Almacen";
import JefaturaDePersonal from "../public/pages/administrative/personal/JefaturaDePersonal";
import Planillas from "../public/pages/administrative/personal/Planillas";
import Escalafon from "../public/pages/administrative/personal/Escalafon";
import ProyectoNexus from "../public/pages/administrative/personal/ProyectoNexus";
import Informatica from "../public/pages/administrative/informatica";
import Coproa from "../public/pages/administrative/Coproa";
import JefaturaAgi from "../public/pages/institutional/JefaturaAgi";
import Infraestructura from "../public/pages/institutional/Infraestructura";
import Planificador from "../public/pages/institutional/Planificador";
import Racionalizacion from "../public/pages/institutional/Racionalizacion";
import Finanzas from "../public/pages/institutional/Finanzas";
import Estadistica from "../public/pages/institutional/Estadistica";
import Pela from "../public/pages/institutional/Pela";
import JefaturaAgp from "../public/pages/pedagogical/JefaturaAgp";
import EducacionInicial from "../public/pages/pedagogical/EducacionInicial";
import Pronoei from "../public/pages/pedagogical/Pronoei";
import EducacionPrimaria from "../public/pages/pedagogical/EducacionPrimaria";
import EducacionSecundaria from "../public/pages/pedagogical/EducacionSecundaria";
import EducacionYCultura from "../public/pages/pedagogical/EducacionYCultura";
import InterculturalBilingue from "../public/pages/pedagogical/InterculturalBilingue";
import Cetpro from "../public/pages/pedagogical/Cetpro";
import Prevaed from "../public/pages/pedagogical/Prevaed";
import Siagie from "../public/pages/pedagogical/Siagie";
import ArticleDetailPage from "../public/pages/article";
import Directory from "../public/pages/directory";
import Reclutimet from "../public/pages/Reclutimet";

export const PublicRoute: RouteObject = {
  element: <PublicLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/quienes-somos", element: <About /> },
    { path: "/resena-historica", element: <HistoricalReview /> },
    { path: "/directorio", element: <Directory /> },
    

    { path: "/noticias", element: <News /> },
    { path: "/noticias/:slug", element: <NewsDetail /> },
    { path: "/reclutimet", element: <Reclutimet /> },

    
    { path: "/article", element: <ArticleDetailPage /> },  

    { path: "/direccion", element: <Direction /> },
    { path: "/mesa-de-partes", element: <MesaDePartes /> },
    { path: "/tramite-documentario", element: <TramiteDocumentario /> },
    { path: "/actas-y-certificados", element: <ActasYCertificados /> },
    { path: "/relacionista-publico", element: <RelacionistaPublico /> },
    {
      path: "/asesoria-juridica/jefatura-de-asesoria-juridica",
      element: <JefaturaDeAsesoria />,
    },
    {
      path: "/asesoria-juridica/admisibilidad-de-recurso-de-apelacion",
      element: <AdmisibilidadRecurso />,
    },

    { path: "/fut-virtual", element: <FutVirtual /> },
    { path: "/manuales-g-suite", element: <ManualesGSuite /> },

    {
      path: "/jefatura-de-administracion",
      element: <JefaturaDeAdministracion />,
    },
    { path: "/abastecimiento", element: <Abastecimiento /> },
    { path: "/tesoreria", element: <Tesoreria /> },
    { path: "/contabilidad", element: <Contabilidad /> },
    { path: "/patrimonio", element: <Patrimonio /> },
    { path: "/almacen", element: <Almacen /> },
    { path: "/personal/jefatura-de-personal", element: <JefaturaDePersonal /> },
    { path: "/personal/planillas", element: <Planillas /> },
    { path: "/personal/escalafon", element: <Escalafon /> },
    { path: "/personal/proyecto-nexus", element: <ProyectoNexus /> },
    { path: "/informatica", element: <Informatica /> },
    { path: "/coproa", element: <Coproa /> },

    { path: "/jefatura-agi", element: <JefaturaAgi /> },
    { path: "/infraestructura", element: <Infraestructura /> },
    { path: "/planificador", element: <Planificador /> },
    { path: "/racionalizacion", element: <Racionalizacion /> },
    { path: "/finanzas", element: <Finanzas /> },
    { path: "/estadistica", element: <Estadistica /> },
    { path: "/pela", element: <Pela /> },

    { path: "/jefatura-agp", element: <JefaturaAgp /> },
    { path: "/educacion-inicial", element: <EducacionInicial /> },
    { path: "/pronoei", element: <Pronoei /> },
    { path: "/educacion-primaria", element: <EducacionPrimaria /> },
    { path: "/educacion-secundaria", element: <EducacionSecundaria /> },
    { path: "/educacion-y-cultura", element: <EducacionYCultura /> },
    { path: "/intercultural-bilingue", element: <InterculturalBilingue /> },
    { path: "/cetpro", element: <Cetpro /> },
    { path: "/prevaed", element: <Prevaed /> },
    { path: "/siagie", element: <Siagie /> },  
  ],
};
