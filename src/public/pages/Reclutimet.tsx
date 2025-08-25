import  { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Search,
  Filter,
  Calendar,
  Building2,
  Users,
  Eye,
  Award,
  Clock,
  FileText,
  X,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Briefcase,
} from "lucide-react";
import axios from "../../api/axios";

type ResultType = {
  name: string;
  score: number;
  status: string;
};

type ConvocatoriaType = {
  id: number;
  position: string;
  description: string;
  code: string;
  area: string;
  vacancies: number;
  remuneration: string;
  start_date: string;
  end_date: string;
  schedule_pdf: string;
  requirements: string;
  bases_pdf: string;
  results_pdf: string;
  status: string;
  created_at: string;
  updated_at: string;
  results: ResultType[];
  contract_type: string; // Added property
};

const RecruitmentPage = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("Todas");
  const [selectedStatus, setSelectedStatus] = useState<string>("Todos");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [convocatorias, setConvocatorias] = useState<ConvocatoriaType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [next, setNext] = useState<string | null>(null);
  const [previous, setPrevious] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const [selectedConvocatoria, setSelectedConvocatoria] =
    useState<ConvocatoriaType | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("details"); // 'details' or 'results'

  // Obtener datos desde la API con paginación y filtros
  useEffect(() => {
    setIsLoading(true);
    // Construir la URL con filtros y paginación
    let url = `/core/convocatorias/?page=${currentPage}`;
    if (typeof selectedYear === "number" && !isNaN(selectedYear))
      url += `&year=${selectedYear}`;
    if (searchTerm) url += `&search=${encodeURIComponent(searchTerm)}`;
    if (selectedArea && selectedArea !== "Todas")
      url += `&area=${encodeURIComponent(selectedArea)}`;
    if (selectedStatus && selectedStatus !== "Todos")
      url += `&status=${encodeURIComponent(selectedStatus)}`;
    axios
      .get(url)
      .then((res) => {
        setConvocatorias(res.data.results);
        setCount(res.data.count);
        setNext(res.data.next);
        setPrevious(res.data.previous);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [currentPage, selectedYear, searchTerm, selectedArea, selectedStatus]);

  // Reiniciar a la primera página al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedYear, searchTerm, selectedArea, selectedStatus]);

  // Obtener años únicos
  const availableYears = [
    ...new Set(
      convocatorias.map((conv) => {
        return conv.code ? parseInt(conv.code.split("-").pop() || "0") : null;
      })
    ),
  ]
    .filter((y) => !!y)
    .sort((a, b) => (b ?? 0) - (a ?? 0));

  // Opciones fijas de áreas (puedes agregar más si tu API lo soporta)
  const areaOptions = [
    "Todas",
    "Laboratorio",
    "Administración",
    "Docencia",
    "Mantenimiento",
  ];

  // Opciones fijas de estado
  const statusLabels: Record<string, string> = {
    Todos: "Todos",
    active: "Abierto",
    inactive: "Inactivo",
    closed: "Cerrado",
  };
  const statuses = ["Todos", "active", "inactive", "Cerrado"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Abierto":
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cerrado":
        return "bg-red-100 text-red-800 border-red-200";
      case "En Evaluación":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Abierto":
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "Cerrado":
        return <X className="w-4 h-4" />;
      case "En Evaluación":
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const openModal = (convocatoria: ConvocatoriaType, type: string) => {
    setSelectedConvocatoria(convocatoria);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConvocatoria(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-PE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Filtrado local
  const filteredConvocatorias = convocatorias.filter((conv) => {
    // Filtro por año
    if (selectedYear) {
      const year = conv.code
        ? parseInt(conv.code.split("-").pop() || "0")
        : null;
      if (year !== selectedYear) return false;
    }
    // Filtro por área
    if (selectedArea && selectedArea !== "Todas") {
      if (conv.area !== selectedArea) return false;
    }
    // Filtro por estado
    if (selectedStatus && selectedStatus !== "Todos") {
      if (conv.status !== selectedStatus) return false;
    }
    // Filtro por búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (
        !conv.position?.toLowerCase().includes(term) &&
        !conv.area?.toLowerCase().includes(term) &&
        !conv.code?.toLowerCase().includes(term)
      ) {
        return false;
      }
    }
    return true;
  });
  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 min-h-screen mt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36 animate-pulse"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-6 animate-fadeIn">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight">
                Convocatorias de Personal
              </h1>
              <p className="text-xl text-white/90 mt-2">
                UGEL Pomabamba - Reclutamiento
              </p>
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-slideIn"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Controles de Filtrado */}
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-6 border border-purple-100/20 backdrop-blur-sm mb-8 animate-slideUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Selector de Año */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                Año
              </label>
              <select
                value={selectedYear ?? ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedYear(val === "" ? null : parseInt(val));
                }}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                <option value="">Todos</option>
                {availableYears
                  .filter((year): year is number => year !== null)
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </div>

            {/* Búsqueda */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Search className="w-4 h-4 mr-2 text-purple-600" />
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cargo, área..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Filtro por Área */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-purple-600" />
                Área
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                {areaOptions.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro por Estado */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-purple-600" />
                Estado
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {statusLabels[status] || status}
                  </option>
                ))}
              </select>
            </div>

            {/* Contador de Resultados */}
            <div className="flex items-end">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">
                    {convocatorias.length}
                  </div>
                  <div className="text-sm text-purple-600">Convocatorias</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de Convocatorias */}
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 border border-purple-100/20 backdrop-blur-sm overflow-hidden mb-8">
          {isLoading ? (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-7 gap-4 items-center py-4 border-b border-gray-100"
                  >
                    <div className="h-4 bg-gray-200 rounded col-span-2"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Cargo
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">
                      Área
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Plazas
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Remuneración
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Estado
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Detalles
                    </th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">
                      Resultados
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredConvocatorias.map((convocatoria, index) => (
                    <tr
                      key={convocatoria.id}
                      className="hover:bg-purple-50/50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {convocatoria.position}
                          </div>
                          <div className="text-sm text-gray-500">
                            {convocatoria.contract_type}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 text-purple-500 mr-2" />
                          <span className="text-gray-700">
                            {convocatoria.area}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          <Users className="w-4 h-4 mr-1" />
                          {convocatoria.vacancies}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center">
                          <DollarSign className="w-4 h-4 text-green-500 mr-1" />
                          <span className="font-semibold text-gray-900">
                            S/ {convocatoria.remuneration.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(convocatoria.status)}`}
                        >
                          {getStatusIcon(convocatoria.status)}
                          <span className="ml-1">{convocatoria.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(convocatoria, "details")}
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(convocatoria, "results")}
                          disabled={
                            !(
                              Array.isArray(convocatoria.results) &&
                              convocatoria.results.length > 0
                            )
                          }
                          className={`inline-flex items-center px-4 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                            Array.isArray(convocatoria.results) &&
                            convocatoria.results.length > 0
                              ? "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 hover:scale-105"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          <Award className="w-4 h-4 mr-2" />
                          Resultados
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Paginación Backend */}
              <div className="flex justify-center items-center gap-2 py-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={!previous}
                  className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-semibold disabled:opacity-50"
                >
                  Anterior
                </button>
                <span className="px-2 text-gray-700">
                  Página {currentPage} de {Math.ceil(count / itemsPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  disabled={!next}
                  className="px-3 py-1 rounded bg-purple-100 text-purple-700 font-semibold disabled:opacity-50"
                >
                  Siguiente
                </button>
              </div>
              {convocatorias.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron convocatorias
                  </h3>
                  <p className="text-gray-500">
                    No hay convocatorias que coincidan con los filtros
                    seleccionados para el año {selectedYear}.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 border border-purple-100/20 backdrop-blur-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Estadísticas de Convocatorias - {selectedYear}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-700">
                {
                  convocatorias.filter((c) => {
                    const year = c.code
                      ? parseInt(c.code.split("-").pop() || "0")
                      : null;
                    return year === selectedYear && c.status === "active";
                  }).length
                }
              </div>
              <div className="text-sm text-green-600 font-medium">Abiertas</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-700">
                {
                  convocatorias.filter((c) => {
                    const year = c.code
                      ? parseInt(c.code.split("-").pop() || "0")
                      : null;
                    return (
                      year === selectedYear && c.status === "En Evaluación"
                    );
                  }).length
                }
              </div>
              <div className="text-sm text-yellow-600 font-medium">
                En Evaluación
              </div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-red-700">
                {
                  convocatorias.filter((c) => {
                    const year = c.code
                      ? parseInt(c.code.split("-").pop() || "0")
                      : null;
                    return year === selectedYear && c.status === "Cerrado";
                  }).length
                }
              </div>
              <div className="text-sm text-red-600 font-medium">Cerradas</div>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {convocatorias
                  .filter((c) => {
                    const year = c.code
                      ? parseInt(c.code.split("-").pop() || "0")
                      : null;
                    return year === selectedYear;
                  })
                  .reduce((sum, c) => sum + Number(c.vacancies), 0)}
              </div>
              <div className="text-sm text-blue-600 font-medium">
                Total Plazas
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal &&
          selectedConvocatoria &&
          ReactDOM.createPortal(
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 99999,
              }}
              className=" flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {modalType === "details"
                          ? "Detalles de la Convocatoria"
                          : "Resultados de la Convocatoria"}
                      </h2>
                      <p className="text-purple-100 mt-1">
                        {selectedConvocatoria.position}
                      </p>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {modalType === "details" ? (
                    <div className="space-y-8">
                      {/* Información General y Fechas */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-purple-700 mb-4 text-lg flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-500" />{" "}
                            Información General
                          </h4>
                          <div className="space-y-3 text-base">
                            <div>
                              <span className="font-semibold">Cargo:</span>{" "}
                              {selectedConvocatoria.position || (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                              <div className="text-sm text-gray-500 mt-1">
                                {selectedConvocatoria.description ? (
                                  selectedConvocatoria.description
                                ) : (
                                  <span className="text-gray-400">
                                    Sin descripción
                                  </span>
                                )}
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold">Área:</span>{" "}
                              {selectedConvocatoria.area || (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Plazas:</span>{" "}
                              {selectedConvocatoria.vacancies ?? (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">
                                Remuneración:
                              </span>{" "}
                              S/{" "}
                              {selectedConvocatoria.remuneration ? (
                                selectedConvocatoria.remuneration
                              ) : (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Código:</span>{" "}
                              {selectedConvocatoria.code || (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-pink-700 mb-4 text-lg flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-pink-500" />{" "}
                            Fechas Importantes
                          </h4>
                          <div className="space-y-3 text-base">
                            <div>
                              <span className="font-semibold">Inicio:</span>{" "}
                              {selectedConvocatoria.start_date ? (
                                formatDate(selectedConvocatoria.start_date)
                              ) : (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Fin:</span>{" "}
                              {selectedConvocatoria.end_date ? (
                                formatDate(selectedConvocatoria.end_date)
                              ) : (
                                <span className="text-gray-400">
                                  No disponible
                                </span>
                              )}
                            </div>
                            <div>
                              <span className="font-semibold">Estado:</span>
                              <span
                                className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedConvocatoria.status || "")}`}
                              >
                                {selectedConvocatoria.status ? (
                                  selectedConvocatoria.status
                                ) : (
                                  <span className="text-gray-400">
                                    No disponible
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Requisitos */}
                      <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                        <h4 className="font-semibold text-blue-700 mb-4 flex items-center gap-2 text-lg">
                          <FileText className="w-5 h-5 mr-2 text-blue-600" />{" "}
                          Requisitos
                        </h4>
                        <div className="text-base">
                          {selectedConvocatoria.requirements ? (
                            selectedConvocatoria.requirements
                          ) : (
                            <span className="text-gray-400">No disponible</span>
                          )}
                        </div>
                        {selectedConvocatoria.bases_pdf && (
                          <a
                            href={selectedConvocatoria.bases_pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mt-2 inline-block font-semibold"
                          >
                            Descargar Bases
                          </a>
                        )}
                      </div>

                      {/* PDF Cronograma y Resultados */}
                      <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
                        <h4 className="font-semibold text-purple-700 mb-4 flex items-center gap-2 text-lg">
                          <Briefcase className="w-5 h-5 mr-2 text-purple-600" />{" "}
                          Documentos
                        </h4>
                        <div className="space-x-4 text-base">
                          {selectedConvocatoria.schedule_pdf && (
                            <a
                              href={selectedConvocatoria.schedule_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 underline font-semibold"
                            >
                              Descargar Cronograma
                            </a>
                          )}
                          {selectedConvocatoria.results_pdf && (
                            <a
                              href={selectedConvocatoria.results_pdf}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 underline font-semibold"
                            >
                              Descargar Resultados
                            </a>
                          )}
                          {!selectedConvocatoria.schedule_pdf &&
                            !selectedConvocatoria.results_pdf && (
                              <span className="text-gray-400">
                                No hay documentos disponibles
                              </span>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Array.isArray(selectedConvocatoria.results) &&
                      selectedConvocatoria.results.length > 0 ? (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                            <Award className="w-5 h-5 mr-2 text-yellow-600" />
                            Resultados del Proceso de Selección
                          </h4>
                          <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 rounded-lg">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Postulante
                                  </th>
                                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                                    Puntaje
                                  </th>
                                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                                    Estado
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {selectedConvocatoria.results.map(
                                  (result, index) => (
                                    <tr
                                      key={index}
                                      className="hover:bg-gray-50"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-900">
                                        {result.name}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <span className="text-sm font-semibold text-gray-900">
                                          {result.score}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <span
                                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                                            result.status === "Aprobado"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                          }`}
                                        >
                                          {result.status}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Award className="w-8 h-8 text-gray-400" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-600 mb-2">
                            Sin Resultados
                          </h4>
                          <p className="text-gray-500">
                            Los resultados aún no están disponibles para esta
                            convocatoria.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>,
            document.body
          )}
        {/* Espaciado inferior */}
        <div className="py-8"></div>
      </div>
    </div>
  );
};

export default RecruitmentPage;
