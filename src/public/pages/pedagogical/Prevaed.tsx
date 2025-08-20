const Prevaed = () => {
  return (
    <div className="bg-gray-100 min-h-screen px-4 py-8 mt-20">
      <div className="container mx-auto">
        {/* Título y breadcrumb */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">PREVAED</h1>
        </div>
        <hr className="border-gray-400 my-4"></hr>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-sm text-gray-600 text-justify">
              Es un programa multisectorial a nivel nacional que aborda el
              problema específico relacionado con la población y sus medios de
              vida vulnerables ante el impacto de amenazas con secuelas de
              desastre.
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Prevaed;
