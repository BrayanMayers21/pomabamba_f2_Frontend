import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon, Article as ArticleIcon } from "@mui/icons-material";
import { ArticleTable } from "../components/Article/ArticleTable";
import { ArticleModal } from "../components/Article/ArticleModal";
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  toggleArticleStatus,
} from "../../api/articles";
import type { Article, ArticleCreate } from "../../types/article";
import { useSnackbar } from "notistack";

export default function ArticlesPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Fetch y paginación local
  // Fetch con paginación del backend
  const fetchArticles = async () => {
    try {
      setSearchLoading(true);
      const params: any = {
        page: page + 1, // El backend espera páginas basadas en 1
        page_size: rowsPerPage,
      };
      if (searchText.trim()) {
        params.search = searchText.trim();
      }
      const response = await getArticles(params);
      const { data } = response;
      const articlesAdapted = Array.isArray(data.results) ? data.results : [];
      setArticles(articlesAdapted);
      setTotalCount(data.count || articlesAdapted.length);
    } catch (error) {
      enqueueSnackbar("Error al cargar los artículos", { variant: "error" });
      setArticles([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [page, rowsPerPage, searchText]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(0);
  };

  const handleEditModal = (article: Article) => {
    setSelectedArticle(article);
    setOpenModal(true);
  };

  const handleOpenModal = () => {
    setSelectedArticle(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedArticle(null);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteArticle(id);
      enqueueSnackbar("Artículo eliminado correctamente", {
        variant: "success",
      });
      fetchArticles();
    } catch (error) {
      enqueueSnackbar("Error al eliminar el artículo", { variant: "error" });
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await toggleArticleStatus(id, isActive);
      enqueueSnackbar(
        `Artículo ${isActive ? "activado" : "desactivado"} correctamente`,
        { variant: "success" }
      );
      fetchArticles();
    } catch (error) {
      enqueueSnackbar("Error al cambiar el estado del artículo", {
        variant: "error",
      });
    }
  };

  const handleSubmit = async (data: ArticleCreate) => {
    setModalLoading(true);
    try {
      if (selectedArticle) {
        await updateArticle(selectedArticle.id, data);
        enqueueSnackbar("Artículo actualizado correctamente", {
          variant: "success",
        });
      } else {
        // Convert ArticleCreate to FormData
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(key, value as any);
          }
        });
        await createArticle(formData);
        enqueueSnackbar("Artículo creado correctamente", {
          variant: "success",
        });
      }
      handleCloseModal();
      fetchArticles();
    } catch (error) {
      enqueueSnackbar("Error al guardar el artículo", { variant: "error" });
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Cargando artículos...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <ArticleIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Gestión de Artículos
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administra los artículos del sistema
          </Typography>
        </Box>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenModal}
      >
        Nuevo Artículo
      </Button>
      <ArticleTable
        articles={articles}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        searchText={searchText}
        searchLoading={searchLoading}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onSearch={handleSearch}
      />
      <ArticleModal
        open={openModal}
        loading={modalLoading}
        article={selectedArticle}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
