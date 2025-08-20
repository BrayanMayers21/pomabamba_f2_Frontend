import type React from "react";
import { useEffect, useState } from "react";
import NoticiasTable from "./NoticiasTable";
import { getNotices } from "../hooks/apis";
import type Notice from "../types/type";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Search, X } from "lucide-react";
const NoticiasPage: React.FC = () => {
  const [noticias, setNoticias] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const loadNoticias = (
    page: number = currentPage,
    size: number = pageSize,
    search?: string
  ) => {
    const searchQuery = search !== undefined ? search : searchTerm;
    console.log(
      `Cargando página ${page} con ${size} elementos desde el backend...`,
      searchQuery ? `Búsqueda: "${searchQuery}"` : ""
    );
    setLoading(true);
    getNotices(page, size, searchQuery)
      .then((res) => {
        console.log("Respuesta del backend:", res);
        console.log("Datos recibidos:", res.data);

        const noticiasData = res.data.results || res.data;
        const allData = Array.isArray(noticiasData) ? noticiasData : [];

        // El backend ya está enviando los datos paginados correctamente
        setNoticias(allData);
        setTotalCount(res.data.count || allData.length);

        console.log(
          `Página ${page}: Mostrando ${allData.length} elementos de ${res.data.count || allData.length} totales`
        );
      })
      .catch((error) => {
        console.error("Error al cargar noticias:", error);
        console.error("Detalles del error:", error.response?.data);
        setNoticias([]);
        setTotalCount(0);
      })
      .finally(() => {
        setLoading(false);
        setIsSearching(false);
        console.log(`Carga de página ${page} finalizada`);
      });
  };

  useEffect(() => {
    loadNoticias(1, pageSize);
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    loadNoticias(page, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    loadNoticias(1, newPageSize);
  };

  // Funciones para manejar búsqueda
  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setCurrentPage(1);
      loadNoticias(1, pageSize, searchTerm);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
    loadNoticias(1, pageSize, "");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleView = (notice: Notice) => {
    console.log("Ver detalles de:", notice);
    // Aquí puedes implementar la lógica para ver detalles
    // Por ejemplo: abrir un modal con los detalles completos
  };

  const handleEdit = (notice: Notice) => {
    console.log("Editar noticia:", notice);
    // Aquí puedes implementar la lógica para editar
    // Por ejemplo: abrir el formulario de edición
  };

  const handleDelete = (notice: Notice) => {
    console.log("Eliminar noticia:", notice);
    // Aquí puedes implementar la lógica para eliminar
    // Por ejemplo: mostrar confirmación y llamar a la API de delete
    if (
      window.confirm(`¿Estás seguro de eliminar la noticia "${notice.title}"?`)
    ) {
      // Llamar a la API para eliminar
      // deleteNotice(notice.id).then(() => loadNoticias(currentPage, pageSize));
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Gestión de Noticias
            </h1>
            <p className="text-muted-foreground">
              Administra y visualiza todas las noticias del sistema
            </p>
          </div>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 space-y-2">
            <label htmlFor="search" className="text-sm font-medium">
              Buscar noticias
            </label>
            <div className="flex gap-2">
              <Input
                id="search"
                placeholder="Buscar por título, contenido, categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchTerm.trim()}
              >
                <Search className="h-4 w-4 mr-2" />
                {isSearching ? "Buscando..." : "Buscar"}
              </Button>
              {searchTerm && (
                <Button variant="outline" onClick={handleClearSearch}>
                  <X className="h-4 w-4 mr-2" />
                  Limpiar
                </Button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-lg">
              {isSearching ? "Buscando noticias..." : "Cargando noticias..."}
            </p>
          </div>
        ) : (
          <>
            {searchTerm && (
              <div className="text-sm text-muted-foreground">
                {totalCount > 0
                  ? `Se encontraron ${totalCount} resultado(s) para "${searchTerm}"`
                  : `No se encontraron resultados para "${searchTerm}"`}
              </div>
            )}
            <NoticiasTable
              noticias={Array.isArray(noticias) ? noticias : []}
              totalCount={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default NoticiasPage;
