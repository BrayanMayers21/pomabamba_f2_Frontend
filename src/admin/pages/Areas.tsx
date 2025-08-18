import { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { Area } from "../../types/area";
import { getAreas, createArea, updateArea, deleteArea } from "../../api/areas";
import { AreaModal } from "../components/Area/AreaModal";
import { AreaTable } from "../components/Area/AreaTable";
import { useSnackbar } from "notistack";
import { Spinner } from "../components/Spinner";
import { ConfirmDialog } from "../components/ConfirmDialog";

export default function AreasPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true); // ← estado para loading
  const [openModal, setOpenModal] = useState(false);
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [page, setPage] = useState(0); // 0 = primera página
  const [rowsPerPage, setRowsPerPage] = useState(10); // Por ejemplo
  const [searchText, setSearchText] = useState("");


  const fetchAreas = async () => {
    setLoading(true); // ← inicia el loading
    try {
      const { data } = await getAreas();
      setAreas(data);
    } catch (error) {
      console.error("Error al cargar áreas", error);
    } finally {
      setLoading(false); // ← termina el loading
    }
  };

  const handleSave = async (data: Partial<Area>) => {
    try {
      if (selectedArea) {
        await updateArea(selectedArea.id, data);
        enqueueSnackbar("Área actualizada correctamente", { variant: "success" });
      } else {
        await createArea(data);
        enqueueSnackbar("Área creada correctamente", { variant: "success" });
      }
      fetchAreas();
    } catch (error) {
      enqueueSnackbar("Ocurrió un error al guardar", { variant: "error" });
    }
  };

  const askDeleteArea = (id: number) => {
    const area = areas.find((a) => a.id === id);
    setAreaToDelete(area || null);
    setConfirmOpen(true);
  };


  const handleConfirmDelete = async () => {
    if (!areaToDelete) return;

    try {
      await deleteArea(areaToDelete.id);
      enqueueSnackbar("Área eliminada correctamente", { variant: "success" });

      const updated = areas.filter(a => a.id !== areaToDelete.id);
      const maxPage = Math.ceil(updated.length / rowsPerPage);

      if (page >= maxPage) {
        setPage(Math.max(0, maxPage - 1));
      }

      setAreas(updated); // Actualiza la lista manualmente
    } catch (error) {
      enqueueSnackbar("Error al eliminar el área", { variant: "error" });
    } finally {
      setConfirmOpen(false);
      setAreaToDelete(null);
    }
  };


  useEffect(() => {
    fetchAreas();
  }, []);

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
          Gestión de áreas
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth // también puedes usar esto como alternativa
          sx={{ width: { xs: "100%", sm: "auto" } }}
          onClick={() => {
            setSelectedArea(null);
            setOpenModal(true);
          }}
        >
          Nueva Área
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Mostrar spinner mientras se cargan los datos */}
      {loading ? (
        <Spinner>
        </Spinner>
      ) : (
        <AreaTable
          areas={areas}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRows) => setRowsPerPage(newRows)}
          onEdit={(area) => {
            setSelectedArea(area);
            setOpenModal(true);
          }}
          onDelete={askDeleteArea}
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />


      )}

      <AreaModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSave={handleSave}
        initialData={selectedArea}
      />

      <ConfirmDialog
        open={confirmOpen}
        content={`¿Estás seguro de que deseas eliminar el área "${areaToDelete?.name}"?`}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  );
}
