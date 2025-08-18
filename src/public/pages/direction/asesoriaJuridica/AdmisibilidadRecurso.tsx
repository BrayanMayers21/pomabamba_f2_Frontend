
import { Scale,  CheckCircle, ExternalLink, Download, AlertCircle, Gavel } from 'lucide-react';

const AdmisibilidadRecurso = () => {
    const competencias = [
        "Acceso al servicio civil.",
        "Pago de retribuciones.",
        "Evaluación y progresión en la carrera.",
        "Régimen disciplinario.",
        "Terminación de la relación de trabajo."
    ];

    return (
        <div className="bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 min-h-screen">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
                
                <div className="container mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                        <Scale className="w-12 h-12 text-white/90" />
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Admisibilidad de Recurso</h1>
                            <p className="text-xl text-white/80 mt-2">SERVIR - Tribunal del Servicio Civil</p>
                        </div>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contenido Principal */}
                    <div className="lg:col-span-1">
                        {/* Tarjeta del Tribunal */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-8 mb-8 border border-purple-100/20 backdrop-blur-sm">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-8 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">
                                    TRIBUNAL DEL SERVICIO CIVIL
                                </h2>
                            </div>
                            
                            {/* Competencia Legal */}
                            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-400 p-6 rounded-xl mb-6">
                                <div className="flex items-start space-x-3">
                                    <Gavel className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-indigo-800 mb-2">Marco Legal</h3>
                                        <p className="text-sm text-gray-700 font-medium mb-2">
                                            Decreto Legislativo Nº 1023 - Decreto Legislativo que crea la Autoridad Nacional del Servicio Civil, Rectora del Sistema Administrativo de Gestión de Recursos Humanos
                                        </p>
                                        <div className="bg-white/50 rounded-lg p-3 border border-indigo-200">
                                            <p className="text-sm text-gray-700 italic">
                                                "Artículo 17º.- Tribunal del Servicio Civil"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Descripción del Tribunal */}
                            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-100 mb-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <Scale className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800">Función del Tribunal</h4>
                                </div>
                                <p className="text-gray-700 leading-relaxed text-justify">
                                    El Tribunal, en lo sucesivo es un órgano integrante de la Autoridad que tiene por función la resolución de controversias individuales que se susciten al interior del Sistema. El Tribunal es un órgano con independencia técnica para resolver en las materias de su competencia.
                                </p>
                            </div>

                            {/* Competencias */}
                            <div className="bg-white border border-gray-200 rounded-xl p-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-purple-600" />
                                    <span>Conoce recursos de apelación en materia de:</span>
                                </h4>
                                <div className="space-y-3">
                                    {competencias.map((competencia, index) => (
                                        <div key={index} className="flex items-start space-x-3 group">
                                            <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:scale-110 transition-transform duration-200">
                                                {String.fromCharCode(97 + index)}
                                            </div>
                                            <p className="text-gray-700 leading-relaxed flex-1 group-hover:text-gray-900 transition-colors duration-200">
                                                {competencia}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Información y Recursos */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Instancia Administrativa */}
                            <div className="bg-white rounded-2xl shadow-2xl shadow-indigo-200/30 overflow-hidden border border-indigo-100/20 backdrop-blur-sm">
                                <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-6 text-white relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-center mb-4">
                                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                                <AlertCircle className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <h6 className="text-2xl font-bold text-center tracking-wide">ÚLTIMA INSTANCIA</h6>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <div className="text-center">
                                        <p className="text-lg font-semibold text-gray-800 mb-4">
                                            El Tribunal constituye última instancia administrativa.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Requisitos */}
                            <div className="bg-white rounded-2xl shadow-xl shadow-purple-100/50 p-6 border border-purple-100/20 backdrop-blur-sm">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-3 h-6 bg-gradient-to-b from-purple-500 to-indigo-600 rounded-full"></div>
                                    <h3 className="text-xl font-bold text-gray-800">Requisitos</h3>
                                </div>
                                
                                <div className="rounded-xl overflow-hidden border border-gray-200 mb-4">
                                    <img 
                                        src="/images/asesoria_juridica/requisitos.jpg" 
                                        className="w-full h-auto" 
                                        alt="Requisitos para el recurso de apelación" 
                                    />
                                </div>
                            </div>

                            {/* Información Adicional */}
                            <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-6 border border-blue-100/20 backdrop-blur-sm">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-3 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                    <h3 className="text-xl font-bold text-gray-800">Información Adicional</h3>
                                </div>
                                
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mb-4">
                                    <p className="text-sm text-gray-700 text-center mb-3">
                                        <strong>NOTA:</strong> PARA MAYOR INFORMACIÓN PUEDEN VISITAR LA PÁGINA WEB:
                                    </p>
                                    <div className="flex items-center justify-center">
                                        <a 
                                            href="https://app.servir.gob.pe/CasillaElectronica/" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center space-x-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-200 hover:underline"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                            <span>app.servir.gob.pe</span>
                                        </a>
                                    </div>
                                </div>

                                <div className="group">
                                    <a 
                                        href="/pdf/asesoria_juridica/formato_servir.pdf" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <Download className="w-5 h-5" />
                                            <span className="text-sm">FORMATO N° 1 - DIRECTIVA N° 001-2017-SERVIR/TSC</span>
                                        </div>
                                        <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                                    </a>
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

export default AdmisibilidadRecurso;