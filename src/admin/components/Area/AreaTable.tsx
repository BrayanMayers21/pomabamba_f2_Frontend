import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TablePagination,
  TextField,
  Box,
  Typography,
  Chip,
  Button,
  InputAdornment,
  Tooltip,
  Skeleton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Business as BusinessIcon,
  Info as InfoIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import type { Area } from "../../../types/area";
import React, { useState } from "react";

interface Props {
  areas: Area[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  loading?: boolean;
  searchLoading?: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (area: Area) => void;
  onDelete: (id: number) => void;
  onViewDetail: (area: Area) => void;
  searchText: string;
  onSearch: (text: string) => void;
}

export const AreaTable = ({
  areas,
  page,
  rowsPerPage,
  totalCount,
  loading = false,
  searchLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  onViewDetail,
  searchText,
  onSearch,
}: Props) => {
  const [searchInput, setSearchInput] = useState("");

  // Estado local para el campo de búsqueda
  React.useEffect(() => {
    setSearchInput(searchText);
  }, [searchText]);

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0); // Volver a la primera página
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

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    // Búsqueda en tiempo real opcional
    if (value === "") {
      onSearch("");
    }
  };

  // Mostrar skeleton mientras carga
  if (loading) {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Skeleton variant="rectangular" width={300} height={56} />
        </Box>
        <Paper>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton width={30} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={150} />
                    </TableCell>
                    <TableCell align="right">
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Skeleton variant="circular" width={32} height={32} />
                        <Skeleton variant="circular" width={32} height={32} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
  }

  // Mostrar mensaje cuando no hay áreas
  if (areas.length === 0 && !searchText) {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            label="Buscar área"
            variant="outlined"
            size="small"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
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
        </Box>

        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <BusinessIcon
              sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay áreas registradas
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              Comienza creando la primera área para organizar la estructura
              institucional de la UGEL Pomabamba.
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  }

  // Mostrar mensaje cuando no hay resultados de búsqueda
  if (areas.length === 0 && searchText) {
    return (
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <TextField
            label="Buscar área"
            variant="outlined"
            size="small"
            value={searchInput}
            onChange={(e) => handleSearchInputChange(e.target.value)}
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
        </Box>

        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <SearchIcon
              sx={{ fontSize: 64, color: "text.secondary", opacity: 0.5 }}
            />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No se encontraron resultados
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 400 }}
            >
              No hay áreas que coincidan con "{searchText}". Intenta con otros
              términos de búsqueda.
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClearSearch}
              startIcon={<ClearIcon />}
            >
              Limpiar búsqueda
            </Button>
          </Box>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      {/* Barra de búsqueda */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 2,
          gap: 1,
          flexWrap: "wrap",
        }}
      >
        <TextField
          label="Buscar área"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
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

      {/* Información de la búsqueda actual */}
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

      {/* Tabla de áreas */}
      <Paper>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: "grey.50" }}>
                <TableCell sx={{ fontWeight: 600 }}>#</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Nombre del Área</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Estado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {areas.map((area, index) => (
                <TableRow
                  key={area.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "action.hover",
                    },
                    "&:nth-of-type(even)": {
                      bgcolor: "grey.50",
                    },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {page * rowsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <BusinessIcon
                        sx={{ fontSize: 20, color: "primary.main" }}
                      />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {area.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label="Activa"
                      color="success"
                      size="small"
                      variant="outlined"
                      icon={<InfoIcon />}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        justifyContent: "flex-end",
                      }}
                    >
                      <Tooltip title="Ver detalle" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onViewDetail(area)}
                          sx={{
                            color: "info.main",
                            "&:hover": {
                              bgcolor: "info.50",
                            },
                          }}
                        >
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar área" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onEdit(area)}
                          sx={{
                            color: "primary.main",
                            "&:hover": {
                              bgcolor: "primary.50",
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar área" arrow>
                        <IconButton
                          size="small"
                          onClick={() => onDelete(area.id)}
                          sx={{
                            color: "error.main",
                            "&:hover": {
                              bgcolor: "error.50",
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <TablePagination
          component="div"
          count={totalCount}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
          }
          sx={{
            borderTop: 1,
            borderColor: "divider",
          }}
        />
      </Paper>

      {/* Información adicional */}
      <Box sx={{ mt: 2, p: 2, bgcolor: "info.50", borderRadius: 1 }}>
        <Typography
          variant="body2"
          color="info.main"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <InfoIcon fontSize="small" />
          Total de áreas: {totalCount} | Página {page + 1} de{" "}
          {Math.ceil(totalCount / rowsPerPage)}
        </Typography>
      </Box>
    </Box>
  );
};
