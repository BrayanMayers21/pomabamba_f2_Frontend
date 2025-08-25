import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import AuthorModal from "../components/author/AuthorModal";
import { AuthorTable } from "../components/author/AuthorTable";
import { createAuthor, deleteAuthor, getAuthors, updateAuthor } from "../../api/authors";

export default function AuthorsList() {
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchAuthors = () => {
    setLoading(true);
    getAuthors(page + 1, rowsPerPage, searchText)
      .then((res) => {
        setAuthors(res.data.results || []);
        setTotalCount(res.data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar los autores");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAuthors();
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
  const handleEditModal = (author: any) => {
    setSelectedAuthor(author);
    setEditModalOpen(true);
  };
  const handleOpenModal = () => {
    setSelectedAuthor(null);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedAuthor(null);
  };
  const handleDelete = async (id: number) => {
    try {
      await deleteAuthor(id);
      fetchAuthors();
    } catch (error) {
      // Puedes mostrar un mensaje de error con Snackbar o similar si lo deseas
    }
  };
  const handleCreate = (data: FormData) => {
    setModalLoading(true);
    createAuthor(data)
      .then(() => {
        setModalOpen(false);
        fetchAuthors();
      })
      .finally(() => setModalLoading(false));
  };
  const handleEdit = (data: FormData) => {
    if (!selectedAuthor) return;
    setModalLoading(true);
    updateAuthor(selectedAuthor.id, data)
      .then(() => {
        setEditModalOpen(false);
        setSelectedAuthor(null);
        fetchAuthors();
      })
      .finally(() => setModalLoading(false));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Gestión de Autores
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Administra los autores del sistema
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenModal}
      >
        Nuevo autor
      </Button>
      <AuthorTable
        authors={authors}
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
      <AuthorModal
        open={modalOpen}
        loading={modalLoading}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />
      <AuthorModal
        open={editModalOpen}
        loading={modalLoading}
        author={selectedAuthor}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedAuthor(null);
        }}
        onSubmit={handleEdit}
      />
    </Box>
  );
}
