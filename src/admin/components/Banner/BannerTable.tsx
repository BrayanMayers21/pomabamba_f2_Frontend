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
  InputAdornment,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import type { Banner } from "../../../types/banner";
import { useState } from "react";
import { BannerDetailModal } from "./BannerDetailModal";

interface Props {
  banners: Banner[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  searchLoading?: boolean;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (banner: Banner) => void;
  onDelete: (id: number) => void;
  searchText: string;
  onSearchTextChange: (text: string) => void; // Mantenemos por compatibilidad pero no se usa
  onSearch: (text: string) => void;
}

export const BannerTable = ({
  banners,
  page,
  rowsPerPage,
  totalCount,
  searchLoading = false,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  searchText,
  onSearch,
}: Props) => {
  // Estado local para el campo de búsqueda
  const [searchInput, setSearchInput] = useState("");
  // Estado para el modal de detalle
  const [selectedBanner, setSelectedBanner] = useState<Banner | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

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
    console.log(
      "🔎 BannerTable - handleSearchClick con input:",
      `"${searchInput}"`
    );
    onSearch(searchInput);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log(
        " Enter presionado en búsqueda con input:",
        `"${searchInput}"`
      );
      handleSearchClick();
    }
  };

  const handleClearSearch = () => {
    console.log("🧹 Limpiando búsqueda");
    setSearchInput("");
    onSearch("");
  };

  const handleViewDetail = (banner: Banner) => {
    setSelectedBanner(banner);
    setDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setDetailModalOpen(false);
    setSelectedBanner(null);
  };

  // Los datos ya vienen filtrados y paginados del servidor
  const displayBanners = Array.isArray(banners) ? banners : [];

  return (
    <Box>
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
          label="Buscar banner"
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

      {/* Mostrar información de la búsqueda actual */}
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
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Título</TableCell>
                <TableCell>Texto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Orden</TableCell>
                <TableCell>Enlace</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {displayBanners.map((banner, index) => (
                <TableRow key={banner.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 200 }}>{banner.title}</Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 250 }}>
                      {banner.text || "Sin texto"}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={banner.status === "active" ? "Activo" : "Inactivo"}
                      color={banner.status === "active" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={banner.banner_type || "N/A"}
                      color="default"
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{banner.order || "-"}</TableCell>
                  <TableCell>
                    <Box sx={{ maxWidth: 150 }}>
                      {banner.link ? (
                        <a
                          href={banner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          {banner.link}
                        </a>
                      ) : (
                        "-"
                      )}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleViewDetail(banner)}
                      title="Ver detalle"
                    >
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onEdit(banner)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(banner.id)}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {displayBanners.length === 0 && (
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
        />
      </Paper>

      <BannerDetailModal
        open={detailModalOpen}
        banner={selectedBanner}
        onClose={handleCloseDetailModal}
        onEdit={onEdit}
      />
    </Box>
  );
};
