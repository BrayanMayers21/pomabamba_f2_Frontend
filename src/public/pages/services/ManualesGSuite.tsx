
const ManualesGSuite = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">Manuales G-Suite</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Texto a la izquierda */}
                    <div>
                        
                        <p className="text-gray-600 mb-4 text-sm text-justify">Este manual está dirigido a estudiantes, docentes y personal administrativo que hacen uso de los servicios de G-Suite en la institución. Descarga aquí el Manual de Ingreso al G-Suite y sigue las instrucciones para configurar tu cuenta correctamente.</p>

                    </div>

                    {/* Imagen a la derecha */}
                    <div>
                        <div className="flex justify-center">
                            <a className="bg-green-600 rounded text-white px-4 py-2" href="/pdf/g_suite/manual.pdf" target="_blank">Ingreso al G-SUITE</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManualesGSuite;
