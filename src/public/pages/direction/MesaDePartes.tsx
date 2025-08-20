
import { Mail, FileText, Users, Download, ExternalLink, AlertCircle } from 'lucide-react';

const MesaDePartes = () => {
    return (
        <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 min-h-screen mt-20">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-36 -translate-x-36"></div>
                
                <div className="container mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-4">
                        <FileText className="w-12 h-12 text-white/90" />
                        <h1 className="text-4xl font-bold tracking-tight">Mesa de Partes</h1>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full"></div>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contenido Principal */}
                    <div className="lg:col-span-2">
                        {/* Tarjeta de Comunicado */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-blue-100/50 p-8 mb-8 border border-blue-100/20 backdrop-blur-sm">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-3 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                                    COMUNICADO
                                </h2>
                            </div>
                            
                            {/* Alerta de Estado de Emergencia */}
                            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-6 rounded-xl mb-6">
                                <div className="flex items-start space-x-3">
                                    <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-amber-800 mb-2">Estado de Emergencia COVID-19</h3>
                                        <p className="text-gray-700 leading-relaxed text-justify">
                                            Se comunica a toda la comunidad en general, que por motivos del Estado de Emergencia COVID-19 
                                            dispuesto por el Gobierno Central, los usuarios que deseen realizar tramites pueden enviar los documentos en 
                                            formatos digitales a la UGEL Pomabamba a través del correo Institucional.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Información de Contacto */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-white" />
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-800">Correo Institucional</h4>
                                </div>
                                <div className="bg-white rounded-lg p-4 border border-blue-200">
                                    <div className="flex items-center justify-center space-x-2">
                                        <Mail className="w-5 h-5 text-blue-600" />
                                        <a 
                                            href="mailto:mesapartes@ugelpomabamba.gob.pe" 
                                            className="text-blue-700 font-semibold hover:text-blue-800 transition-colors duration-200 hover:underline text-lg"
                                        >
                                            mesapartes@ugelpomabamba.gob.pe
                                        </a>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mt-3 text-center">
                                    <span className="inline-flex items-center space-x-1">
                                        <Download className="w-4 h-4" />
                                        <span>Descarga el manual de instrucción para más información</span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta de Recursos */}
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
                                                <Users className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <h6 className="text-2xl font-bold text-center tracking-wide">RECURSOS</h6>
                                    </div>
                                </div>
                                
                                {/* Contenido de la tarjeta */}
                                <div className="p-6 space-y-4">
                                    {/* Manual de Emisor */}
                                    <div className="group">
                                        <a 
                                            href="/pdf/mesa_de_partes/instruccion_emisor.pdf" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-xl px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <FileText className="w-5 h-5" />
                                                <span>Manual de emisor</span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>

                                    {/* Manual de Receptor */}
                                    <div className="group">
                                        <a 
                                            href="/pdf/mesa_de_partes/instruccion_receptor.pdf" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full bg-gradient-to-r from-slate-600 to-gray-600 hover:from-slate-700 hover:to-gray-700 text-white rounded-xl px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <Download className="w-5 h-5" />
                                                <span>Manual de receptor</span>
                                            </div>
                                            <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    </div>

                                    {/* SISGEDO */}
                                    <div className="group">
                                        <a 
                                            href="http://sisgedo.regionancash.gob.pe/sisgedonew/app/main.php" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between w-full bg-gradient-to-r from-neutral-700 to-gray-700 hover:from-neutral-800 hover:to-gray-800 text-white rounded-xl px-6 py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <ExternalLink className="w-5 h-5" />
                                                <span>SISGEDO</span>
                                            </div>
                                            <div className="flex items-center space-x-1">
                                                <span className="text-xs bg-white/20 rounded-full px-2 py-1">Externo</span>
                                                <ExternalLink className="w-4 h-4 opacity-75 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </a>
                                    </div>

                                    {/* Información adicional */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mt-6">
                                        <div className="text-center">
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <AlertCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <p className="text-sm text-gray-700 leading-relaxed">
                                                Utiliza estos recursos para realizar tus trámites de manera digital y eficiente.
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

export default MesaDePartes;