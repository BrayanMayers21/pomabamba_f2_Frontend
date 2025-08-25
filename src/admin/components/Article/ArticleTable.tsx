import React, { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Typography,
  Box,
  TextField,
  InputAdornment,
  TablePagination,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import type { Article } from "../../../types/article";

interface ArticleTableProps {
  articles: Article[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  searchText: string;
  searchLoading?: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
  onSearch: (text: string) => void;
}

export function ArticleTable({
  articles,
  page,
  rowsPerPage,
  totalCount,
  searchText,
  searchLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onToggleStatus,
  onSearch,
}: ArticleTableProps) {
  const [searchInput, setSearchInput] = useState("");

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  const handleSearchClick = () => {
    onSearch(searchInput);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    onSearch("");
  };

  const safeArticles = Array.isArray(articles) ? articles : [];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 1 }}>
        <TextField
          label="Buscar artículo"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearchKeyPress}
          autoComplete="off"
          disabled={searchLoading}
          sx={{ width: { xs: "100%", sm: "300px" } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleSearchClick}
          disabled={searchLoading}
          sx={{ minWidth: "auto", px: 2 }}
        >
          {searchLoading ? "Buscando..." : "Buscar"}
        </Button>
        {searchText && (
          <Button
            variant="outlined"
            onClick={handleClearSearch}
            disabled={searchLoading}
            sx={{ minWidth: "auto", px: 2 }}
            color="secondary"
          >
            Limpiar
          </Button>
        )}
      </Box>

      {searchText && (
        <Box
          sx={{
            mb: 2,
            p: 1,
            bgcolor: "primary.50",
            borderRadius: 1,
            border: 1,
            borderColor: "primary.200",
          }}
        >
          <Typography variant="body2" color="primary.main">
            Búsqueda activa: "{searchText}" - {totalCount} resultado
            {totalCount !== 1 ? "s" : ""} encontrado
            {totalCount !== 1 ? "s" : ""}
          </Typography>
        </Box>
      )}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Imagen</TableCell>
                <TableCell>Título y resumen</TableCell>
                <TableCell>Autor</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Vistas</TableCell>
                <TableCell>Fecha creación</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeArticles.map((article, index) => (
                <TableRow key={article.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {article.main_image ? (
                      <img
                        src={article.main_image}
                        alt={article.title}
                        style={{
                          width: 56,
                          height: 36,
                          objectFit: "cover",
                          borderRadius: 6,
                          boxShadow: "0 1px 4px #0001",
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 56,
                          height: 36,
                          bgcolor: "grey.200",
                          borderRadius: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          textAlign="center"
                        >
                          Sin imagen
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      gutterBottom
                    >
                      {article.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      <Chip
                        label={
                          typeof article.author === "string"
                            ? article.author
                            : article.author && typeof article.author === "object" && "full_name" in article.author
                              ? article.author.full_name
                              : "-"
                        }
                        icon={<SearchIcon />}
                        size="small"
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        article.status === "publicado"
                          ? "Publicado"
                          : article.status === "borrador"
                            ? "Borrador"
                            : "Archivado"
                      }
                      color={
                        article.status === "publicado"
                          ? "success"
                          : article.status === "borrador"
                            ? "warning"
                            : "default"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={article.views?.toLocaleString() || "0"}
                      color="info"
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {article.created_at
                      ? new Date(article.created_at).toLocaleDateString(
                          "es-PE",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "-"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(article)}
                      aria-label="Editar artículo"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(article.id)}
                      aria-label="Eliminar artículo"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {safeArticles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
        />
      </Paper>
    </Box>
  );
}
