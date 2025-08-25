import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  TablePagination,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface AuthorTableProps {
  authors: any[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (author: any) => void;
  onDelete: (id: number) => void;
  searchText?: string;
  onSearch?: (text: string) => void;
}

export function AuthorTable({
  authors,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  searchText = "",
  onSearch,
}: AuthorTableProps) {
  const [searchInput, setSearchInput] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

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
    if (onSearch) onSearch(searchInput);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId !== null) {
      onDelete(deleteId);
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && onSearch) {
      handleSearchClick();
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    if (onSearch) onSearch("");
  };

  const safeAuthors = Array.isArray(authors) ? authors : [];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 1 }}>
        <TextField
          label="Buscar autor"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={handleSearchKeyPress}
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
        <Button
          variant="contained"
          onClick={handleSearchClick}
          sx={{ minWidth: "auto", px: 2 }}
        >
          Buscar
        </Button>
        {searchText && (
          <Button
            variant="outlined"
            onClick={handleClearSearch}
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
              <TableRow sx={{ bgcolor: "primary.light" }}>
                <TableCell>#</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Nombre completo</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Biografía</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeAuthors.map((author, index) => (
                <TableRow
                  key={author.id}
                  hover
                  sx={{ "&:last-child td": { border: 0 } }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    {author.avatar ? (
                      <img
                        src={author.avatar}
                        alt={author.name}
                        style={{ width: 36, height: 36, borderRadius: "50%" }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: "grey.200",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {author.name ? author.name[0] : "?"}
                        </Typography>
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    {author.full_name || `Autor ${author.id}`}
                  </TableCell>
                  <TableCell>{author.email || ""}</TableCell>
                  <TableCell>{author.bio || ""}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(author)}
                      aria-label="Editar autor"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(author.id)}
                      aria-label="Eliminar autor"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {safeAuthors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
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
      {/* Modal de confirmación de eliminación */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>¿Está seguro que desea eliminar este autor?</DialogTitle>
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
