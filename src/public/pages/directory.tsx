import React, { useState, useEffect } from 'react';
import { Mail, Phone, User, Building2, Calendar, Search, Filter, Users, ChevronDown, MapPin } from 'lucide-react';

// Datos de ejemplo basados en el modelo Directory
const mockDirectoryData = [
  {
    id: 1,
    full_name: "María Elena Rodríguez Vásquez",
    position: "Directora Regional",
    department: "Dirección General",
    phone: "+51 943 123 456",
    email: "mrodriguez@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "Active",
    year: 2025
  },
  {
    id: 2,
    full_name: "Carlos Alberto Mendoza López",
    position: "Especialista en Educación Primaria",
    department: "Gestión Pedagógica",
    phone: "+51 943 234 567",
    email: "cmendoza@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "Active",
    year: 2025
  },
  {
    id: 3,
    full_name: "Ana Sofía Huamán Quispe",
    position: "Técnico Administrativo",
    department: "Almacén",
    phone: "+51 943 345 678",
    email: "ahuaman@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "Active",
    year: 2025
  },
  {
    id: 4,
    full_name: "Jorge Luis Paredes Silva",
    position: "Especialista en Educación Secundaria",
    department: "Gestión Pedagógica",
    phone: "+51 943 456 789",
    email: "jparedes@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "On Leave",
    year: 2024
  },
  {
    id: 5,
    full_name: "Rosa María Flores Contreras",
    position: "Contador",
    department: "Administración",
    phone: "+51 943 567 890",
    email: "rflores@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "Active",
    year: 2025
  },
  {
    id: 6,
    full_name: "Pedro Antonio Ramírez Cruz",
    position: "Especialista en Infraestructura",
    department: "Infraestructura",
    phone: "+51 943 678 901",
    email: "pramirez@ugelpomabamba.gob.pe",
    photo_url: null,
    status: "Active",
    year: 2025
  }
];

const DirectoryPage = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  // Simular carga de datos
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [selectedYear]);

  // Filtrar datos
  useEffect(() => {
    let filtered = mockDirectoryData.filter(person => {
      const matchesYear = person.year === selectedYear;
      const matchesSearch = person.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (person.department && person.department.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDepartment = selectedDepartment === 'Todos' || person.department === selectedDepartment;
      const matchesStatus = selectedStatus === 'Todos' || person.status === selectedStatus;
      
      return matchesYear && matchesSearch && matchesDepartment && matchesStatus;
    });
    setFilteredData(filtered);
  }, [selectedYear, searchTerm, selectedDepartment, selectedStatus]);

  // Obtener años únicos
  const availableYears = [...new Set(mockDirectoryData.map(person => person.year))].sort((a, b) => b - a);
  
  // Obtener departamentos únicos
  const departments = [...new Set(mockDirectoryData.map(person => person.department).filter(Boolean))];
  
  // Obtener estados únicos
  const statuses = [...new Set(mockDirectoryData.map(person => person.status))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'On Leave':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Active':
        return 'Activo';
      case 'Inactive':
        return 'Inactivo';
      case 'On Leave':
        return 'Con Licencia';
      default:
        return status;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36 animate-pulse"></div>

        <div className="container mx-auto relative z-10">
          <div className="flex items-center space-x-4 mb-6 animate-fadeIn">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold tracking-tight">Directorio de Personal</h1>
              <p className="text-xl text-white/90 mt-2">UGEL Pomabamba</p>
            </div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-slideIn"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Controles de Filtrado */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 border border-blue-100/20 backdrop-blur-sm mb-8 animate-slideUp">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Selector de Año */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                Año
              </label>
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Búsqueda */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Search className="w-4 h-4 mr-2 text-blue-600" />
                Buscar
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Nombre, cargo, departamento..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* Filtro por Departamento */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                Departamento
              </label>
              <div className="relative">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <option value="Todos">Todos</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Filtro por Estado */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center">
                <Filter className="w-4 h-4 mr-2 text-blue-600" />
                Estado
              </label>
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer transition-all duration-200 hover:shadow-md"
                >
                  <option value="Todos">Todos</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{getStatusText(status)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Contador de Resultados */}
            <div className="flex items-end">
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg p-3 w-full">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">{filteredData.length}</div>
                  <div className="text-sm text-blue-600">Personal encontrado</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Personal */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {filteredData.map((person, index) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl shadow-xl shadow-blue-100/30 p-6 border border-blue-100/20 backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Header de la tarjeta */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-200">
                        {person.photo_url ? (
                          <img
                            src={person.photo_url}
                            alt={person.full_name}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          person.full_name.split(' ').map(n => n[0]).slice(0, 2).join('')
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full ${person.status === 'Active' ? 'bg-green-500' : person.status === 'On Leave' ? 'bg-yellow-500' : 'bg-gray-500'}`}></div>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(person.status)}`}>
                    {getStatusText(person.status)}
                  </div>
                </div>

                {/* Información Personal */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                    {person.full_name}
                  </h3>
                  
                  <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    <User className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{person.position}</span>
                  </div>

                  {person.department && (
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      <Building2 className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      <span className="text-sm">{person.department}</span>
                    </div>
                  )}

                  {person.phone && (
                    <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                      <Phone className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                      <a
                        href={`tel:${person.phone}`}
                        className="text-sm hover:text-blue-600 transition-colors duration-200"
                      >
                        {person.phone}
                      </a>
                    </div>
                  )}

                  <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    <Mail className="w-4 h-4 mr-2 text-blue-500 flex-shrink-0" />
                    <a
                      href={`mailto:${person.email}`}
                      className="text-sm hover:text-blue-600 transition-colors duration-200 truncate"
                    >
                      {person.email}
                    </a>
                  </div>
                </div>

                {/* Footer de la tarjeta */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Año: {person.year}</span>
                    <div className="flex space-x-2">
                      <a
                        href={`mailto:${person.email}`}
                        className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors duration-200 group"
                      >
                        <Mail className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
                      </a>
                      {person.phone && (
                        <a
                          href={`tel:${person.phone}`}
                          className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors duration-200 group"
                        >
                          <Phone className="w-4 h-4 text-green-600 group-hover:scale-110 transition-transform duration-200" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensaje si no hay resultados */}
        {!isLoading && filteredData.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No se encontró personal</h3>
            <p className="text-gray-500">No hay personal que coincida con los filtros seleccionados para el año {selectedYear}.</p>
          </div>
        )}

        {/* Footer con estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Estadísticas del Personal - {selectedYear}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-green-700">
                {mockDirectoryData.filter(p => p.year === selectedYear && p.status === 'Active').length}
              </div>
              <div className="text-sm text-green-600 font-medium">Personal Activo</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-yellow-700">
                {mockDirectoryData.filter(p => p.year === selectedYear && p.status === 'On Leave').length}
              </div>
              <div className="text-sm text-yellow-600 font-medium">Con Licencia</div>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {departments.length}
              </div>
              <div className="text-sm text-blue-600 font-medium">Departamentos</div>
            </div>
          </div>
        </div>

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

export default DirectoryPage;