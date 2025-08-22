import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Building2, Users, Eye, Award, MapPin, Clock, FileText, X, CheckCircle, AlertCircle, Plus, DollarSign, Briefcase } from 'lucide-react';

// Datos de ejemplo para las convocatorias
const mockRecruitmentData = [
  {
    id: 1,
    position: "Especialista en Educación Inicial",
    area: "Gestión Pedagógica",
    vacancies: 2,
    remuneration: 3500,
    status: "Abierto",
    publication_date: "2025-08-15",
    application_deadline: "2025-09-15",
    evaluation_date: "2025-09-20",
    year: 2025,
    requirements: [
      "Título profesional en Educación Inicial",
      "Experiencia mínima de 3 años en el sector educativo",
      "Conocimientos en gestión pedagógica",
      "Manejo de herramientas informáticas"
    ],
    functions: [
      "Asesorar en aspectos técnico-pedagógicos",
      "Supervisar el desarrollo curricular",
      "Capacitar a docentes de educación inicial",
      "Evaluar procesos educativos"
    ],
    contract_type: "CAS",
    results: [
      { name: "María Elena Vásquez", score: 85.5, status: "Aprobado" },
      { name: "Ana Sofía Mendoza", score: 82.3, status: "Aprobado" },
      { name: "Carlos Luis Paredes", score: 75.8, status: "Desaprobado" }
    ]
  },
  {
    id: 2,
    position: "Técnico Administrativo",
    area: "Almacén",
    vacancies: 1,
    remuneration: 2800,
    status: "En Evaluación",
    publication_date: "2025-08-10",
    application_deadline: "2025-09-10",
    evaluation_date: "2025-09-15",
    year: 2025,
    requirements: [
      "Título técnico en Administración",
      "Experiencia en gestión de almacenes",
      "Conocimiento en sistemas de inventario",
      "Capacidad de trabajo en equipo"
    ],
    functions: [
      "Controlar ingreso y salida de materiales",
      "Elaborar reportes de inventario",
      "Mantener el orden del almacén",
      "Coordinar con proveedores"
    ],
    contract_type: "CAS",
    results: []
  },
  {
    id: 3,
    position: "Especialista en Educación Secundaria",
    area: "Gestión Pedagógica",
    vacancies: 3,
    remuneration: 3800,
    status: "Cerrado",
    publication_date: "2025-07-20",
    application_deadline: "2025-08-20",
    evaluation_date: "2025-08-25",
    year: 2025,
    requirements: [
      "Título profesional en Educación Secundaria",
      "Maestría en Gestión Educativa (deseable)",
      "Experiencia mínima de 5 años",
      "Certificaciones en evaluación educativa"
    ],
    functions: [
      "Supervisar instituciones educativas",
      "Desarrollar programas curriculares",
      "Capacitar a directores y docentes",
      "Evaluar el rendimiento académico"
    ],
    contract_type: "CAS",
    results: [
      { name: "Jorge Luis Ramírez", score: 92.1, status: "Aprobado" },
      { name: "Rosa María Flores", score: 88.7, status: "Aprobado" },
      { name: "Pedro Antonio Silva", score: 86.4, status: "Aprobado" },
      { name: "Carmen Isabel López", score: 74.2, status: "Desaprobado" }
    ]
  },
  {
    id: 4,
    position: "Contador",
    area: "Administración",
    vacancies: 1,
    remuneration: 4200,
    status: "Abierto",
    publication_date: "2025-08-20",
    application_deadline: "2025-09-25",
    evaluation_date: "2025-09-30",
    year: 2025,
    requirements: [
      "Título profesional en Contabilidad",
      "Colegiatura vigente",
      "Experiencia en sector público",
      "Conocimiento en SIAF y sistemas contables"
    ],
    functions: [
      "Elaborar estados financieros",
      "Supervisar procesos contables",
      "Coordinar con entidades de control",
      "Gestionar presupuesto institucional"
    ],
    contract_type: "CAS",
    results: []
  },
  {
    id: 5,
    position: "Especialista en Infraestructura",
    area: "Infraestructura Educativa",
    vacancies: 1,
    remuneration: 4000,
    status: "En Evaluación",
    publication_date: "2025-08-01",
    application_deadline: "2025-08-30",
    evaluation_date: "2025-09-05",
    year: 2025,
    requirements: [
      "Título profesional en Ingeniería Civil o Arquitectura",
      "Experiencia en proyectos educativos",
      "Conocimiento en normativa de construcción",
      "Manejo de software de diseño"
    ],
    functions: [
      "Supervisar obras de infraestructura",
      "Elaborar expedientes técnicos",
      "Coordinar con contratistas",
      "Evaluar proyectos de inversión"
    ],
    contract_type: "CAS",
    results: []
  }
];

const RecruitmentPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState('Todas');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [isLoading, setIsLoading] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedConvocatoria, setSelectedConvocatoria] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('details'); // 'details' or 'results'

  // Simular carga de datos
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  // Filtrar datos
  useEffect(() => {
    let filtered = mockRecruitmentData.filter(convocatoria => {
      const matchesYear = convocatoria.year === selectedYear;
      const matchesSearch = convocatoria.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           convocatoria.area.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesArea = selectedArea === 'Todas' || convocatoria.area === selectedArea;
      const matchesStatus = selectedStatus === 'Todos' || convocatoria.status === selectedStatus;
      
      return matchesYear && matchesSearch && matchesArea && matchesStatus;
    });
    setFilteredData(filtered);
  }, [selectedYear, searchTerm, selectedArea, selectedStatus]);

  // Obtener años únicos
  const availableYears = [...new Set(mockRecruitmentData.map(conv => conv.year))].sort((a, b) => b - a);
  
  // Obtener áreas únicas
  const areas = [...new Set(mockRecruitmentData.map(conv => conv.area))];
  
  // Obtener estados únicos
  const statuses = [...new Set(mockRecruitmentData.map(conv => conv.status))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Abierto':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Cerrado':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'En Evaluación':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Abierto':
        return <CheckCircle className="w-4 h-4" />;
      case 'Cerrado':
        return <X className="w-4 h-4" />;
      case 'En Evaluación':
        return <Clock className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const openModal = (convocatoria, type) => {
    setSelectedConvocatoria(convocatoria);
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedConvocatoria(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 min-h-screen">
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
              <h1 className="text-5xl font-bold tracking-tight">Convocatorias de Personal</h1>
              <p className="text-xl text-white/90 mt-2">UGEL Pomabamba - Reclutamiento</p>
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
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
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
                <option value="Todas">Todas</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
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
                <option value="Todos">Todos</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Contador de Resultados */}
            <div className="flex items-end">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-700">{filteredData.length}</div>
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
                  <div key={index} className="grid grid-cols-7 gap-4 items-center py-4 border-b border-gray-100">
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
                    <th className="px-6 py-4 text-left text-sm font-semibold">Cargo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Área</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Plazas</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Remuneración</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Estado</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Detalles</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Resultados</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((convocatoria, index) => (
                    <tr
                      key={convocatoria.id}
                      className="hover:bg-purple-50/50 transition-colors duration-200"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold text-gray-900">{convocatoria.position}</div>
                          <div className="text-sm text-gray-500">{convocatoria.contract_type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Building2 className="w-4 h-4 text-purple-500 mr-2" />
                          <span className="text-gray-700">{convocatoria.area}</span>
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
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(convocatoria.status)}`}>
                          {getStatusIcon(convocatoria.status)}
                          <span className="ml-1">{convocatoria.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(convocatoria, 'details')}
                          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalles
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => openModal(convocatoria, 'results')}
                          disabled={convocatoria.results.length === 0}
                          className={`inline-flex items-center px-4 py-2 rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-200 ${
                            convocatoria.results.length > 0
                              ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 hover:scale-105'
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
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

              {filteredData.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontraron convocatorias</h3>
                  <p className="text-gray-500">No hay convocatorias que coincidan con los filtros seleccionados para el año {selectedYear}.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 border border-purple-100/20 backdrop-blur-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Estadísticas de Convocatorias - {selectedYear}</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-700">
                {mockRecruitmentData.filter(c => c.year === selectedYear && c.status === 'Abierto').length}
              </div>
              <div className="text-sm text-green-600 font-medium">Abiertas</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-700">
                {mockRecruitmentData.filter(c => c.year === selectedYear && c.status === 'En Evaluación').length}
              </div>
              <div className="text-sm text-yellow-600 font-medium">En Evaluación</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <X className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-red-700">
                {mockRecruitmentData.filter(c => c.year === selectedYear && c.status === 'Cerrado').length}
              </div>
              <div className="text-sm text-red-600 font-medium">Cerradas</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {mockRecruitmentData.filter(c => c.year === selectedYear).reduce((sum, c) => sum + c.vacancies, 0)}
              </div>
              <div className="text-sm text-blue-600 font-medium">Total Plazas</div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedConvocatoria && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {modalType === 'details' ? 'Detalles de la Convocatoria' : 'Resultados de la Convocatoria'}
                    </h2>
                    <p className="text-purple-100 mt-1">{selectedConvocatoria.position}</p>
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
                {modalType === 'details' ? (
                  <div className="space-y-6">
                    {/* Información General */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-3">Información General</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Cargo:</strong> {selectedConvocatoria.position}</div>
                          <div><strong>Área:</strong> {selectedConvocatoria.area}</div>
                          <div><strong>Plazas:</strong> {selectedConvocatoria.vacancies}</div>
                          <div><strong>Remuneración:</strong> S/ {selectedConvocatoria.remuneration.toLocaleString()}</div>
                          <div><strong>Tipo de Contrato:</strong> {selectedConvocatoria.contract_type}</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-3">Fechas Importantes</h4>
                        <div className="space-y-2 text-sm">
                          <div><strong>Publicación:</strong> {formatDate(selectedConvocatoria.publication_date)}</div>
                          <div><strong>Fecha límite:</strong> {formatDate(selectedConvocatoria.application_deadline)}</div>
                          <div><strong>Evaluación:</strong> {formatDate(selectedConvocatoria.evaluation_date)}</div>
                          <div>
                            <strong>Estado:</strong> 
                            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getStatusColor(selectedConvocatoria.status)}`}>
                              {selectedConvocatoria.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Requisitos */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Requisitos
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {selectedConvocatoria.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Funciones */}
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
                        Funciones Principales
                      </h4>
                      <ul className="space-y-2 text-sm">
                        {selectedConvocatoria.functions.map((func, index) => (
                          <li key={index} className="flex items-start">
                            <Plus className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" />
                            {func}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedConvocatoria.results.length > 0 ? (
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-600" />
                          Resultados del Proceso de Selección
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="w-full border border-gray-200 rounded-lg">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Postulante</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Puntaje</th>
                                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {selectedConvocatoria.results.map((result, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  <td className="px-4 py-3 text-sm text-gray-900">{result.name}</td>
                                  <td className="px-4 py-3 text-center">
                                    <span className="text-sm font-semibold text-gray-900">{result.score}</span>
                                  </td>
                                  <td className="px-4 py-3 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      result.status === 'Aprobado' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {result.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Award className="w-8 h-8 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-600 mb-2">Sin Resultados</h4>
                        <p className="text-gray-500">Los resultados aún no están disponibles para esta convocatoria.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Espaciado inferior */}
        <div className="py-8"></div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            width: 0;
          }
          to {
            width: 8rem;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
        
        .animate-slideIn {
          animation: slideIn 1.2s ease-out 0.5s both;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RecruitmentPage;