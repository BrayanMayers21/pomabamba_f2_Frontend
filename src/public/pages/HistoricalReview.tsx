import { Clock, MapPin, Award, Building2, Calendar, Users } from 'lucide-react';
const reseña1 = `La Unidad de Gestión Educativa Local de Pomabamba, es la primera entidad administrativa del Sector Educación en el Callejón de los Conchucos, fue creada como Jefatura Zonal de Educación en el año 1970 mediante Resolución Ministerial Nº 2947, iniciando su funcionamiento el 15 de febrero del año 1971 con sede en la Provincia de Pomabamba, cuyo ámbito comprendió las provincias de Pomabamba, Sihuas, Mariscal Luzuriaga y Marañón, con 10 Núcleos Educativos Comunales (NEC). Esta Institución Educativa, a lo largo de los 42 años de funcionamiento, ha sufrido cambios en su denominación: Jefatura Zonal, Dirección Zonal de Educación, Unidad de Servicios Educativos, Sub Región de Educación Conchucos Pomabamba, y hoy Unidad de Gestión Educativa Local de Pomabamba, quedando su administración sólo a la Provincia.`;
const reseña2 = `La Provincia de Pomabamba, fue creada como tal, el 21 de febrero del 1,861, mediante Ley 12120, posee características heterogéneas en el aspecto demográfico, geográfico y económico; está conformado por los Distritos de: Pomabamba, Huayllán, Parobamba y Quinuabamba. Está ubicado a 2943 metros sobre el nivel del mar, superficie territorial de 914.05 Km², con una población Demográfica de 27,954 habitantes, y cuya población estudiantil es de 10935, tasa de analfabetismo de 25%, geográficamente está ubicado al Noreste del departamento de Ancash en el Callejón de los Conchucos, en una zona alto-andina, siendo sus límites: por el este con el Río Marañón, por el oeste con la Provincia de Huaylas, por el norte con la Provincia de Sihuas, y por el sur con la Provincia de Mariscal Luzuriaga, y la distancia aproximada a la capital de departamento es de 220 KM. Cabe agregar que el día 20 de junio del 2009 fue declarada Capital Folclórica del Departamento de Ancash, por contar con el mayor número de Danzas folclóricas, contar con atractivos turísticos y artesanías propias como la “Pintay Bata”.`;
const imagen = '/images/institutional/img1.jpg'; // Reemplaza con tu imagen real

const HistoricalReview = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 min-h-screen mt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
                
                <div className="container mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                        <Clock className="w-12 h-12 text-white/90" />
                        <h1 className="text-5xl font-bold tracking-tight">Reseña Histórica</h1>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                {/* Contenido Principal */}
                <div className="bg-white rounded-2xl shadow-xl shadow-amber-100/50 p-8 border border-amber-100/20 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-3 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full"></div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-700 to-orange-700 bg-clip-text text-transparent uppercase">
                            UGEL Pomabamba
                        </h2>
                    </div>

                    {/* Sección de Historia Institucional */}
                    <div className="relative mb-12">
                        {/* Imagen flotante */}
                        <div className="float-right ml-8 mb-8 max-w-lg">
                            <div className="group">
                                <img
                                    src={imagen}
                                    alt="Historia institucional UGEL Pomabamba"
                                    className="w-full h-auto rounded-2xl shadow-2xl border border-gray-200 
                                    transition-all duration-500 ease-in-out
                                    group-hover:scale-105 group-hover:shadow-2xl
                                    group-hover:brightness-105
                                    group-hover:contrast-105
                                    group-hover:-translate-y-2
                                    group-hover:rotate-1"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>

                        {/* Historia Institucional */}
                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-500 p-6 rounded-xl mb-8">
                            <div className="flex items-start space-x-3">
                                <Building2 className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-amber-800 mb-3 flex items-center space-x-2">
                                        <Calendar className="w-5 h-5" />
                                        <span>Historia Institucional</span>
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-lg text-justify">
                                        {reseña1}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de Reconocimiento Cultural */}
                    <div className="clear-both">
                        <div className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-500 p-6 rounded-xl">
                            <div className="flex items-start space-x-3">
                                <Award className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-orange-800 mb-3 flex items-center space-x-2">
                                        <MapPin className="w-5 h-5" />
                                        <span>Capital Folclórica de Ancash</span>
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-lg text-justify">
                                        {reseña2}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjetas de Destacados */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        {/* Año de Declaración */}
                        <div className="bg-white rounded-xl shadow-lg border border-amber-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Calendar className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">2009</h4>
                            <p className="text-gray-600 text-sm">Año de declaración como Capital Folclórica</p>
                        </div>

                        {/* Danzas Folclóricas */}
                        <div className="bg-white rounded-xl shadow-lg border border-orange-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Danzas</h4>
                            <p className="text-gray-600 text-sm">Mayor número de danzas folclóricas del departamento</p>
                        </div>

                        {/* Artesanía Tradicional */}
                        <div className="bg-white rounded-xl shadow-lg border border-red-200 p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">Pintay Bata</h4>
                            <p className="text-gray-600 text-sm">Artesanía tradicional característica de la región</p>
                        </div>
                    </div>

                    {/* Línea de tiempo decorativa */}
                    <div className="mt-12 relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-24 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full"></div>
                        <div className="flex justify-center">
                            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full border-4 border-white shadow-lg"></div>
                        </div>
                    </div>
                </div>
                
                {/* Espaciado inferior */}
                <div className="py-12"></div>
            </div>
        </div>
    );
};

export default HistoricalReview;