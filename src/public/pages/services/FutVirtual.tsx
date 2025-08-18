
const FutVirtual = () => {
    return (
        <div className="bg-gray-100 min-h-screen px-4 py-8">
            <div className="container mx-auto">
                {/* Título y breadcrumb */}
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">FUT Virtual</h1>
                </div>
                <hr className="border-gray-400 my-4"></hr>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* Texto a la izquierda */}
                    <div>
                        
                        <p className="text-gray-600 mb-4 text-sm text-justify">Descarga aquí el formato de FUT (Formulario Único de Trámite) y complétalo con tus datos. Una vez llenado, podrás adjuntarlo en nuestra plataforma virtual para registrar tu solicitud de manera rápida y segura.</p>

                    </div>

                    {/* Imagen a la derecha */}
                    <div>
                        <div className="flex justify-center">
                            <a className="bg-green-600 rounded text-white px-4 py-2" href="/excel/services/fut_ugel.xlsx" target="_blank">Descargar Formato de FUT</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FutVirtual;
