import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Area } from "../../../types/area";
import { TablePagination } from "@mui/material";
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";



interface Props {
  areas: Area[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (area: Area) => void;
  onDelete: (id: number) => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export const AreaTable = ({
  areas,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  searchText,
  onSearchTextChange,
}: Props) => {
  const handleChangePage = (_: any, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0); // Volver a la página 0
  };

  // Filtrar áreas por nombre según el texto de búsqueda
  const filteredAreas = areas.filter((area) =>
    area.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginación manual de los datos
  const paginatedAreas = filteredAreas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <TextField
          label="Buscar"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
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
              {paginatedAreas.map((area, index) => (
                <TableRow key={area.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{area.name}</TableCell>
                  <TableCell align="right">
                    {/* Botones editar/eliminar aquí */}
                    <IconButton size="small" onClick={() => onEdit(area)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(area.id)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={areas.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          labelRowsPerPage="Filas por página"
        />
      </Paper>
    </Box>
  );
};

