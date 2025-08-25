import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Collapse,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { green, red } from "@mui/material/colors";

import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import ConvocatoriaModal from "./ConvocatoriaModal";
import { ConvocatoriaTable } from "./ConvocatoriaTable";
import {
  createConvocatoria,
  deleteConvocatoria,
  getConvocatorias,
  updateConvocatoria,
} from "../../api/convocatorias";

export default function ConvocatoriasPage() {
  const [convocatorias, setConvocatorias] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedConvocatoria, setSelectedConvocatoria] = useState<any | null>(
    null
  );
  const [modalLoading, setModalLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertType, setAlertType] = useState<"success" | "error">("success");
  const [alertMsg, setAlertMsg] = useState("");

  const fetchConvocatorias = () => {
    setLoading(true);
    getConvocatorias({
      page: page + 1,
      page_size: rowsPerPage,
      search: searchText,
    })
      .then((res) => {
        const arr = res.data.results || [];
        setConvocatorias(arr);
        setTotalCount(res.data.count || arr.length);
        setLoading(false);
      })
      .catch(() => {
        setConvocatorias([]);
        setTotalCount(0);
        setLoading(false);
      });
  };

  // Cierre automático de alertas
  React.useEffect(() => {
    if (alertOpen) {
      const timer = setTimeout(() => setAlertOpen(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [alertOpen]);

  useEffect(() => {
    fetchConvocatorias();
    // eslint-disable-next-line
  }, [page, rowsPerPage, searchText]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    setSearchText(searchInput);
    setPage(0);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setSearchText("");
    setPage(0);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleEditModal = (convocatoria: any) => {
    setSelectedConvocatoria(convocatoria);
    setEditModalOpen(true);
  };

  const handleOpenModal = () => {
    setSelectedConvocatoria(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedConvocatoria(null);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await deleteConvocatoria(deleteId);
        setAlertType("success");
        setAlertMsg("Convocatoria eliminada correctamente");
        setAlertOpen(true);
        fetchConvocatorias();
      } catch (error) {
        setAlertType("error");
        setAlertMsg("Error al eliminar la convocatoria");
        setAlertOpen(true);
      }
      setConfirmOpen(false);
      setDeleteId(null);
    }
  };

  const handleSubmit = async (data: FormData) => {
    setModalLoading(true);
    try {
      if (selectedConvocatoria) {
        await updateConvocatoria(selectedConvocatoria.id, data);
        setAlertType("success");
        setAlertMsg("Convocatoria actualizada correctamente");
      } else {
        await createConvocatoria(data);
        setAlertType("success");
        setAlertMsg("Convocatoria creada correctamente");
      }
      setAlertOpen(true);
      handleCloseModal();
      fetchConvocatorias();
    } catch (error) {
      setAlertType("error");
      setAlertMsg("Error al guardar la convocatoria");
      setAlertOpen(true);
    } finally {
      setModalLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ position: "fixed", top: 24, right: 24, zIndex: 1300 }}>
        <Collapse in={alertOpen}>
          <Alert
            icon={
              alertType === "success" ? (
                <CheckCircleIcon sx={{ color: green[600] }} />
              ) : (
                <ErrorIcon sx={{ color: red[600] }} />
              )
            }
            severity={alertType}
            variant="filled"
            onClose={() => setAlertOpen(false)}
            sx={{ minWidth: 260, boxShadow: 3, borderRadius: 2, py: 1, px: 2 }}
          >
            {alertMsg}
          </Alert>
        </Collapse>
      </Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Gestión de Convocatorias
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Administra las convocatorias del sistema
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <TextField
          label="Buscar convocatoria"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          autoComplete="off"
          sx={{ width: { xs: "100%", sm: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="outlined" onClick={handleSearch} sx={{ height: 40 }}>
          Buscar
        </Button>
        {searchInput && (
          <Button
            variant="text"
            color="secondary"
            onClick={handleClearSearch}
            sx={{ height: 40 }}
          >
            Limpiar
          </Button>
        )}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Nueva convocatoria
        </Button>
      </Box>
      <ConvocatoriaTable
        convocatorias={convocatorias}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEditModal}
        onDelete={handleDelete}
      />
      <ConvocatoriaModal
        open={modalOpen}
        loading={modalLoading}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
      <ConvocatoriaModal
        open={editModalOpen}
        loading={modalLoading}
        convocatoria={selectedConvocatoria}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedConvocatoria(null);
        }}
        onSubmit={handleSubmit}
      />
      {/* Modal de confirmación de eliminación */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>
          ¿Está seguro que desea eliminar esta convocatoria?
        </DialogTitle>
        <DialogContent>
          <Typography>Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
