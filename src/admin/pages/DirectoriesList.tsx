import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DirectoryModal from "../directory/DirectoryModal";
import { DirectoryTable } from "../directory/DirectoryTable";
import {
  createDirectory,
  deleteDirectory,
  getDirectories,
  updateDirectory,
} from "../../api/directories";

export default function DirectoriesList() {
  const [directories, setDirectories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  // Debes crear el archivo src/api/directories.ts con las funciones getDirectories, createDirectory, updateDirectory, deleteDirectory
  const fetchDirectories = () => {
    setLoading(true);
    getDirectories(page + 1, rowsPerPage, searchText)
      .then((res) => {
        setDirectories(res.data.results || []);
        setTotalCount(res.data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los directorios");
        setLoading(false);
      });
    setLoading(false); // Elimina esto cuando implementes la API
  };

  useEffect(() => {
    fetchDirectories();
    // eslint-disable-next-line
  }, [page, rowsPerPage, searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(0);
  };
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };
  const handleEditModal = (directory: any) => {
    setSelectedDirectory(directory);
    setEditModalOpen(true);
  };
  const handleOpenModal = () => {
    setSelectedDirectory(null);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDirectory(null);
  };
  const handleDelete = async (id: number) => {
    await deleteDirectory(id);
    fetchDirectories();
  };
  const handleCreate = (data: FormData) => {
    setModalLoading(true);
    createDirectory(data)
      .then(() => {
        setModalOpen(false);
        fetchDirectories();
      })
      .finally(() => setModalLoading(false));
    setModalLoading(false);
  };
  const handleEdit = (data: FormData) => {
    if (!selectedDirectory) return;
    setModalLoading(true);
    updateDirectory(selectedDirectory.id, data)
      .then(() => {
        setEditModalOpen(false);
        setSelectedDirectory(null);
        fetchDirectories();
      })
      .finally(() => setModalLoading(false));
    setModalLoading(false);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Gestión de Directorios
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Administra los directorios del sistema
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenModal}
      >
        Nuevo directorio
      </Button>
      <DirectoryTable
        directories={directories}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEditModal}
        onDelete={handleDelete}
        searchText={searchText}
        onSearch={handleSearch}
      />
      <DirectoryModal
        open={modalOpen}
        loading={modalLoading}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />
      <DirectoryModal
        open={editModalOpen}
        loading={modalLoading}
        directory={selectedDirectory}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedDirectory(null);
        }}
        onSubmit={handleEdit}
      />
    </Box>
  );
}
