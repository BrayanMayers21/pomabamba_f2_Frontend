import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type MenuItem = {
  label: string;
  href?: string;
  external?: boolean;
  submenu?: MenuItem[];
};

const menu: MenuItem[] = [
  {
    label: "UGEL POMABAMBA",
    submenu: [
      { label: "Quienes somos", href: "/quienes-somos" },
      { label: "Reseña histórica", href: "/resena-historica" },
      { label: "Directorio Institucional", href: "/directorio" },
    ],
  },
  {
    label: "DIRECCIÓN",
    submenu: [
      { label: "Dirección", href: "/direccion" },
      { label: "Mesa de partes", href: "/mesa-de-partes" },
      { label: "Trámite documentario", href: "/tramite-documentario" },
      { label: "Actas y certificados", href: "/actas-y-certificados" },
      { label: "Relacionista público", href: "/relacionista-publico" },
      {
        label: "Asesoría Jurídica",
        submenu: [
          {
            label: "Jefatura de Asesoría Jurídica",
            href: "/asesoria-juridica/jefatura-de-asesoria-juridica",
          },
          {
            label: "Admisibilidad de Recurso de Apelación - SERVIR",
            href: "/asesoria-juridica/admisibilidad-de-recurso-de-apelacion",
          },
        ],
      },
    ],
  },
  {
    label: "SERVICIOS",
    submenu: [
      { label: "TUPA", href: "#" },
      { label: "FUT Virtual", href: "/fut-virtual" },
      {
        label: "Registro Nacional de Servidores Sancionados",
        href: "https://www.gob.pe/818-consultar-el-registro-nacional-de-sanciones-contra-servidores-civiles-rnssc",
      },
      {
        label: "Mi boleta",
        href: "https://servicios-ayni.minedu.gob.pe/ayni/inicio",
      },
      { label: "Manuales G-Suite", href: "/manuales-g-suite" },
      { label: "Libro de reclamaciones", href: "#" },
    ],
  },
  {
    label: "GESTIÓN ADMINISTRATIVA",
    submenu: [
      {
        label: "Jefatura de administración",
        href: "/jefatura-de-administracion",
      },
      { label: "Abastecimiento", href: "/abastecimiento" },
      { label: "Tesorería", href: "/tesoreria" },
      { label: "Contabilidad", href: "/contabilidad" },
      { label: "Patrimonio", href: "/patrimonio" },
      { label: "Almacén", href: "/almacen" },
      {
        label: "Personal",
        submenu: [
          {
            label: "Jefatura de Personal",
            href: "/personal/jefatura-de-personal",
          },
          { label: "Planillas", href: "/personal/planillas" },
          { label: "Escalafón", href: "/personal/escalafon" },
          { label: "Proyecto NEXUS", href: "/personal/proyecto-nexus" },
        ],
      },
      { label: "Informática", href: "/informatica" },
      { label: "Coproa", href: "/coproa" },
    ],
  },
  {
    label: "GESTIÓN INSTITUCIONAL",
    submenu: [
      { label: "Jefatura AGI", href: "/jefatura-agi" },
      { label: "Infraestructura", href: "/infraestructura" },
      { label: "Planificador", href: "/planificador" },
      { label: "Racionalización", href: "/racionalizacion" },
      { label: "Finanzas", href: "/finanzas" },
      { label: "Estadística", href: "/estadistica" },
      { label: "PELA", href: "/pela" },
    ],
  },
  {
    label: "GESTIÓN PEDAGÓGICA",
    submenu: [
      { label: "Jefatura AGP", href: "/jefatura-agp" },
      { label: "Educación Inicial", href: "/educacion-inicial" },
      { label: "PRONOEI", href: "/pronoei" },
      { label: "Educación Primaria", href: "/educacion-primaria" },
      { label: "Educación Secundaria", href: "/educacion-secundaria" },
      { label: "Educación y Cultura", href: "/educacion-y-cultura" },
      { label: "Intercultural Bilingüe", href: "/intercultural-bilingue" },
      { label: "CETPRO", href: "/cetpro" },
      { label: "PREVAED", href: "/prevaed" },
      { label: "SIAGIE", href: "/siagie" },
    ],
  },
  {
    label: "NOTICIAS",
    submenu: [
      { label: "Noticias UGEL", href: "/noticias" },
      { label: "Comunicados", href: "#" },
      { label: "Articulos", href: "Article" },
      { label: "Convocatorias", href: "/Reclutimet" },
    ],
  },
];

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSubIndex, setOpenSubIndex] = useState<number | null>(null);
  const [submenuPosition, setSubmenuPosition] = useState<"left" | "right">(
    "right"
  );
  const [firstLevelPosition, setFirstLevelPosition] = useState<
    "left" | "right"
  >("right");
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);
  const firstLevelRef = useRef<HTMLDivElement | null>(null);

  // Función para detectar si es un enlace externo
  const isExternalLink = (href: string) => {
    return (
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:")
    );
  };

  // Función para detectar la posición del submenú de segundo nivel
  const checkSubmenuPosition = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const submenuWidth = 288; // w-72 = 18rem = 288px

    if (rect.right + submenuWidth > viewportWidth) {
      setSubmenuPosition("left");
    } else {
      setSubmenuPosition("right");
    }
  };

  // Función para detectar la posición del submenú de primer nivel
  const checkFirstLevelPosition = (element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const submenuWidth = 256; // w-64 = 16rem = 256px

    if (rect.right + submenuWidth > viewportWidth) {
      setFirstLevelPosition("left");
    } else {
      setFirstLevelPosition("right");
    }
  };

  useEffect(() => {
    if (submenuRef.current && openSubIndex !== null) {
      checkSubmenuPosition(submenuRef.current);
    }
  }, [openSubIndex]);

  useEffect(() => {
    if (firstLevelRef.current && openIndex !== null) {
      checkFirstLevelPosition(firstLevelRef.current);
    }
  }, [openIndex]);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenIndex(null);
      setOpenSubIndex(null);
    };

    if (openIndex !== null) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [openIndex]);

  const handleMouseEnter = (index: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenIndex(index);
    setOpenSubIndex(null);
  };

  const handleMouseLeave = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setOpenIndex(null);
      setOpenSubIndex(null);
    }, 150);
  };

  const handleSubMenuMouseEnter = (subIndex: number) => {
    if (subCloseTimeoutRef.current) {
      clearTimeout(subCloseTimeoutRef.current);
      subCloseTimeoutRef.current = null;
    }
    setOpenSubIndex(subIndex);
  };

  const handleSubMenuMouseLeave = () => {
    if (subCloseTimeoutRef.current) {
      clearTimeout(subCloseTimeoutRef.current);
    }

    subCloseTimeoutRef.current = setTimeout(() => {
      setOpenSubIndex(null);
    }, 100);
  };

  // Componente de enlace dinámico
  const DynamicLink = ({
    href,
    external,
    className,
    children,
  }: {
    href?: string;
    external?: boolean;
    className: string;
    children: React.ReactNode;
  }) => {
    const isExternal = external || (href && isExternalLink(href));

    if (isExternal && href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      );
    }

    return (
      <Link to={href || "#"} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <nav className="bg-gradient-to-r from-green-50 to-green-100 shadow-lg border-t border-green-200 relative ">
      <div className="container mx-auto px-4">
        <div className="flex items-center text-sm font-semibold">
          {menu.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0"
              ref={index === openIndex ? firstLevelRef : null}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.submenu ? (
                <button
                  className={`relative group hover:bg-green-600 hover:text-white text-gray-800 px-4 py-3 transition-all duration-300 whitespace-nowrap border-b-2 border-transparent hover:border-green-500 ${
                    openIndex === index
                      ? "bg-green-600 text-white border-green-500 shadow-md"
                      : ""
                  }`}
                >
                  <span className="flex items-center gap-1">
                    {item.label}
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${openIndex === index ? "rotate-180" : ""}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              ) : (
                <DynamicLink
                  href={item.href}
                  external={item.external}
                  className="relative group hover:text-white hover:bg-green-600 px-4 py-3 text-gray-800 transition-all duration-300 block whitespace-nowrap border-b-2 border-transparent hover:border-green-500"
                >
                  {item.label}
                </DynamicLink>
              )}

              {/* Primer Nivel */}
              {item.submenu && openIndex === index && (
                <div
                  className={`absolute top-full bg-white text-gray-700 shadow-xl border border-gray-100 rounded-lg w-64 z-[100] overflow-hidden ${
                    firstLevelPosition === "left" ? "right-0" : "left-0"
                  }`}
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide">
                    {item.label}
                  </div>
                  {item.submenu.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="relative"
                      onMouseEnter={() => handleSubMenuMouseEnter(subIndex)}
                      onMouseLeave={() => {
                        if (!subItem.submenu) {
                          handleSubMenuMouseLeave();
                        }
                      }}
                    >
                      <DynamicLink
                        href={subItem.href}
                        external={subItem.external}
                        className={`group flex items-center justify-between px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-l-3 border-transparent hover:border-green-500 ${
                          subItem.submenu && openSubIndex === subIndex
                            ? "bg-green-50 text-green-700 border-green-500"
                            : ""
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-60"></span>
                          {subItem.label}
                        </span>
                        {subItem.submenu && (
                          <svg
                            className="w-3 h-3 text-gray-400 group-hover:text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </DynamicLink>

                      {/* Segundo Nivel */}
                      {subItem.submenu && openSubIndex === subIndex && (
                        <div
                          ref={submenuRef}
                          className={`absolute top-0 bg-white shadow-xl border border-gray-100 rounded-lg w-72 z-[110] overflow-hidden ${
                            submenuPosition === "left"
                              ? firstLevelPosition === "left"
                                ? "left-full"
                                : "right-full"
                              : firstLevelPosition === "left"
                                ? "right-full"
                                : "left-full"
                          }`}
                          onMouseEnter={() => {
                            if (subCloseTimeoutRef.current) {
                              clearTimeout(subCloseTimeoutRef.current);
                              subCloseTimeoutRef.current = null;
                            }
                            handleSubMenuMouseEnter(subIndex);
                          }}
                          onMouseLeave={() => {
                            handleSubMenuMouseLeave();
                          }}
                        >
                          <div className="bg-gradient-to-r from-green-700 to-green-800 text-white px-4 py-2 text-xs font-medium uppercase tracking-wide">
                            {subItem.label}
                          </div>
                          {subItem.submenu.map((subSubItem, subSubIndex) => (
                            <DynamicLink
                              key={subSubIndex}
                              href={subSubItem.href}
                              external={subSubItem.external}
                              className="group flex items-center gap-3 px-4 py-3 hover:bg-green-50 hover:text-green-700 transition-all duration-200 border-l-3 border-transparent hover:border-green-500"
                            >
                              <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                              <span className="text-sm">
                                {subSubItem.label}
                              </span>
                            </DynamicLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
