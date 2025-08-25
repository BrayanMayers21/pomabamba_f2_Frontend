import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  getCategories,
  createCategory,
  updateCategory,
} from "../../api/categories";
import CategoryModal from "../components/category/CategoryModal";
import { CategoryTable } from "../components/category/CategoryTable";

export default function CategoriesList() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [page, setPage] = useState(0); // MUI TablePagination usa base 0
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");

  const fetchCategories = () => {
    setLoading(true);
    // El backend espera page base 1
    getCategories(page + 1, rowsPerPage, searchText)
      .then((res) => {
        setCategories(res.data.results || []);
        setTotalCount(res.data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudieron cargar las categorías");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, [page, rowsPerPage, searchText]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(0);
  };
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleEditModal = (category: any) => {
    setSelectedCategory(category);
    setEditModalOpen(true);
  };

  const handleOpenModal = () => {
    setSelectedCategory(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async (id: number) => {
    try {
      const { deleteCategory } = await import("../../api/categories");
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      // Puedes mostrar un mensaje de error con Snackbar o similar si lo deseas
    }
  };

  const handleCreate = (data: FormData) => {
    setModalLoading(true);
    createCategory(data)
      .then(() => {
        setModalOpen(false);
        fetchCategories();
      })
      .finally(() => setModalLoading(false));
  };

  const handleEdit = (data: FormData) => {
    if (!selectedCategory) return;
    setModalLoading(true);
    updateCategory(selectedCategory.id, data)
      .then(() => {
        setEditModalOpen(false);
        setSelectedCategory(null);
        fetchCategories();
      })
      .finally(() => setModalLoading(false));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
        Gestión de Categorías
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Administra las categorías del sistema
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenModal}
      >
        Nueva categoría
      </Button>
      <CategoryTable
        categories={categories}
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
      <CategoryModal
        open={modalOpen}
        loading={modalLoading}
        onClose={handleCloseModal}
        onSubmit={handleCreate}
      />
      <CategoryModal
        open={editModalOpen}
        loading={modalLoading}
        category={selectedCategory}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleEdit}
      />
    </Box>
  );
}
