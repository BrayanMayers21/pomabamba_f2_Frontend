import { Scale, Mail, User, Gavel, Shield, BookOpen, CheckCircle } from 'lucide-react';
import NumberedList from "../../../components/NumberedList";


const legalFunctions = [
  "Asesora a la Dirección y a los órganos de la Sede, en asuntos de carácter jurídico legal.",
  "Participar en la formulación de proyectos de resolución, disposiciones, contratos, convenios de competencia de la Dirección.",
  "Emitir dictamen, opinión jurídica y legal en asuntos relacionados al servicio del sector u otros que lo requieren a la autoridad pertinente y en asuntos de recursos impugnativos.",
  "Brindar asesoramiento a las comisiones de procesos administrativos y disciplinarios.",
  "Absolver consultas formuladas por las dependencias de la entidad y usuario, en los términos normados para el efecto.",
  "Sistematizar y divulgar las normas legales y administrativas en el Sector Educación.",
  "Contribuir a la difusión de la legislación jurídica, laboral, educativa y administrativa del Sector."
];

const administrativeSystemFunctions = [
  "Dirigir la ejecución de programa de un sistema administrativo.",
  "Participar en la formulación y determinación de la política del sistema administrativo pertinente.",
  "Dirigir y coordinar en la formulación de documentos técnicos normativos para la correcta aplicación del sistema.",
  "Emitir dictámenes y opinión legal en asuntos relacionados a recursos impugnativos y otros.",
  "Coordinar y controlar la aplicación de normas técnico administrativo y dispositivos legales vigentes, referidos al sistema.",
  "Asesorar y orientar sobre métodos, normas y otros dispositivos propios del sistema.",
  "Realiza otras funciones que le asigne el jefe."
];

const JefaturaDeAsesoria = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
                
                <div className="container mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                        <Scale className="w-12 h-12 text-white/90" />
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Jefatura de Asesoría</h1>
                            <p className="text-xl text-white/80 mt-2">Jurídica</p>
                        </div>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contenido Principal */}
                    <div className="lg:col-span-1">
                        {/* Marco Legal */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 p-8 mb-8 border border-indigo-100/20 backdrop-blur-sm">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-8 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
                                    MARCO LEGAL
                                </h2>
                            </div>
                            
                            {/* Artículo Legal */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 rounded-xl mb-6">
                                <div className="flex items-start space-x-3">
                                    <Gavel className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-indigo-800 mb-2">Artículo 26º</h3>
                                        <p className="text-gray-700 text-sm leading-relaxed text-justify">
                                            El Ordenamiento jurídico de la UGEL Pomabamba, cumple a través de la Oficina de Asesoría Jurídica, 
                                            encargada de emitir opinión legal y asesorar a la Dirección en los asuntos jurídicos y desempeña las siguientes funciones:
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Funciones Legales */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 mb-8 border border-purple-100/20 backdrop-blur-sm">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                    <BookOpen className="w-5 h-5 text-purple-600" />
                                    <span>Funciones Generales del Área</span>
                                </h3>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100">
                                <NumberedList items={legalFunctions} />
                            </div>
                        </div>

                        {/* Funciones del Sistema Administrativo */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 border border-blue-100/20 backdrop-blur-sm">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                <h3 className="text-xl font-bold text-gray-800 flex items-center space-x-2">
                                    <Shield className="w-5 h-5 text-blue-600" />
                                    <span>Sistema Administrativo</span>
                                </h3>
                            </div>
                            
                            {/* Subtítulo del artículo */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-400 p-4 rounded-lg mb-6">
                                <p className="text-sm text-gray-700 leading-relaxed text-justify">
                                    <strong>Art.26º.-</strong> El Ordenamiento jurídico de la UGEL Pomabamba, cumple a través de la 
                                    Oficina de Asesoría Jurídica, encargada de emitir opinión legal y asesorar a la Dirección 
                                    en los asuntos jurídicos y desempeña las siguientes funciones:
                                </p>
                            </div>
                            
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                <NumberedList items={administrativeSystemFunctions} />
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Contacto */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-2xl shadow-2xl shadow-indigo-200/30 overflow-hidden border border-indigo-100/20 backdrop-blur-sm">
                                {/* Header de la tarjeta */}
                                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-6 text-white relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <Mail className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <h6 className="text-2xl font-bold text-center tracking-wide">CONTACTO</h6>
                                    </div>
                                </div>
                                
                                {/* Contenido de la tarjeta */}
                                <div className="p-6 space-y-6">
                                    <div className="text-center space-y-4">
                                        <div className="flex items-center justify-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                                                <User className="w-10 h-10 text-indigo-600" />
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <p className="text-lg font-bold text-gray-800 mb-1">
                                                Doc. MORALES PAMPA PEDRO ARTEMIO
                                            </p>
                                            <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto"></div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Mail className="w-5 h-5 text-indigo-600" />
                                            <a 
                                                href="mailto:pmorales@ugelpomabamba.gob.pe" 
                                                className="text-indigo-700 font-semibold hover:text-indigo-800 transition-colors duration-200 hover:underline"
                                            >
                                                pmorales@ugelpomabamba.gob.pe
                                            </a>
                                        </div>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100">
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <CheckCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Asesoramiento jurídico especializado para la gestión educativa institucional.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Espaciado inferior */}
                <div className="py-12"></div>
            </div>
        </div>
    );
};

export default JefaturaDeAsesoria;