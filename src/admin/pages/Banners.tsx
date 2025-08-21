import { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Banner } from "../../types/banner";
import {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../../api/banners";
import { BannerModal } from "../components/Banner/BannerModal";
import { BannerTable } from "../components/Banner/BannerTable";
import { useSnackbar } from "notistack";
import { Spinner } from "../components/Spinner";
import { ConfirmDialog } from "../components/ConfirmDialog";

export default function BannersPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState(""); // Término de búsqueda actual (aplicado)
  const [modalLoading, setModalLoading] = useState(false);

  // Estados para paginación del servidor
  const [totalCount, setTotalCount] = useState(0);
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchBanners = async (pageNumber = 0, search = "") => {
    console.log("📥 fetchBanners llamado con:", {
      pageNumber,
      search,
      rowsPerPage,
    });

    setLoading(pageNumber === 0 && !search); // Solo mostrar loading inicial
    setSearchLoading(search !== ""); // Loading específico para búsqueda

    try {
      const requestParams = {
        page: pageNumber + 1, // API usa páginas basadas en 1
        page_size: rowsPerPage,
        search: search || undefined,
      };

      console.log("🔄 Parámetros de la request:", requestParams);

      const { data } = await getBanners(requestParams);

      console.log("✅ Respuesta del servidor:", data);
      console.log("📊 Cantidad de resultados:", data.results?.length || 0);
      console.log("📈 Total en BD:", data.count || 0);

      setBanners(data.results || []);
      setTotalCount(data.count || 0);
    } catch (error) {
      console.error("❌ Error al cargar banners:", error);
      enqueueSnackbar("Error al cargar banners", { variant: "error" });
      setBanners([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleSaveBanner = async (formData: FormData) => {
    setModalLoading(true);
    try {
      if (selectedBanner) {
        // Actualizar banner existente
        await updateBanner(selectedBanner.id, formData);
        // Recargar la página actual después de actualizar
        await fetchBanners(page, searchText);
        enqueueSnackbar("Banner actualizado correctamente", {
          variant: "success",
        });
      } else {
        // Crear nuevo banner
        await createBanner(formData);
        // Recargar la página actual después de crear
        await fetchBanners(page, searchText);
        enqueueSnackbar("Banner creado correctamente", { variant: "success" });
      }

      setOpenModal(false);
      setSelectedBanner(null);
    } catch (error: any) {
      console.error("Error al guardar banner", error);
      const message =
        error.response?.data?.message || "Error al guardar el banner";
      enqueueSnackbar(message, { variant: "error" });
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteBanner = async () => {
    if (!bannerToDelete) return;

    try {
      await deleteBanner(bannerToDelete.id);
      enqueueSnackbar("Banner eliminado correctamente", { variant: "success" });

      // Recargar la página actual después de eliminar
      await fetchBanners(page, searchText);
    } catch (error) {
      enqueueSnackbar("Error al eliminar el banner", { variant: "error" });
    } finally {
      setConfirmOpen(false);
      setBannerToDelete(null);
    }
  };

  // Handlers para paginación y búsqueda
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchBanners(newPage, searchText);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Volver a la primera página
    fetchBanners(0, searchText);
  };

  const handleSearch = (search: string) => {
    setSearchText(search);
    setPage(0); // Volver a la primera página al buscar
    fetchBanners(0, search);
  };

  useEffect(() => {
    fetchBanners(0, "");
  }, [rowsPerPage]); // Recargar cuando cambie el tamaño de página

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Gestión de Banners
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          sx={{ width: { xs: "100%", sm: "auto" } }}
          onClick={() => {
            setSelectedBanner(null);
            setOpenModal(true);
          }}
        >
          Nuevo Banner
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Mostrar spinner mientras se cargan los datos */}
      {loading ? (
        <Spinner />
      ) : (
        <BannerTable
          banners={banners}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={totalCount}
          searchLoading={searchLoading}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          onEdit={(banner) => {
            setSelectedBanner(banner);
            setOpenModal(true);
          }}
          onDelete={(bannerId) => {
            const banner = banners.find((b) => b.id === bannerId);
            if (banner) {
              setBannerToDelete(banner);
              setConfirmOpen(true);
            }
          }}
          searchText={searchText}
          onSearchTextChange={() => {}} // No se usa más
          onSearch={handleSearch}
        />
      )}

      {/* Modal para crear/editar banner */}
      <BannerModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedBanner(null);
        }}
        onSave={handleSaveBanner}
        banner={selectedBanner}
        loading={modalLoading}
      />

      {/* Dialog de confirmación para eliminar */}
      <ConfirmDialog
        open={confirmOpen}
        title="Confirmar eliminación"
        content={`¿Estás seguro de que deseas eliminar el banner "${bannerToDelete?.title}"? Esta acción no se puede deshacer.`}
        onConfirm={handleDeleteBanner}
        onCancel={() => {
          setConfirmOpen(false);
          setBannerToDelete(null);
        }}
      />
    </Box>
  );
}
