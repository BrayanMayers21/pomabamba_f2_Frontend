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

import type { Alert } from "../../../types/alert";

interface AlertTableProps {
  alerts: Alert[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  searchText: string;
  searchLoading?: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (alert: Alert) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, isActive: boolean) => void;
  onSearch: (text: string) => void;
}

export function AlertTable({
  alerts,
  page,
  rowsPerPage,
  totalCount,
  searchText,
  searchLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  // onToggleStatus, // Se elimina si no se usa en la tabla
  onSearch,
}: AlertTableProps) {
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
  // Funciones getTypeColor y getPriorityColor eliminadas porque no se usan

  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2, gap: 1 }}>
        <TextField
          label="Buscar alerta"
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
                <TableCell>Título</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha creación</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeAlerts.map((alert, index) => (
                <TableRow key={alert.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{alert.title}</TableCell>
                  <TableCell>{alert.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={alert.is_active ? "Activo" : "Inactivo"}
                      color={alert.is_active ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {alert.created_at
                      ? new Date(alert.created_at).toLocaleString()
                      : "-"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(alert)}
                      aria-label="Editar alerta"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(alert.id)}
                      aria-label="Eliminar alerta"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {safeAlerts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
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
