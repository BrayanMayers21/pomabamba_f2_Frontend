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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import type { Notice } from "../../../types/notice";

interface Props {
  notices: Notice[];
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (notice: Notice) => void;
  onDelete: (id: number) => void;
  searchText: string;
  onSearchTextChange: (text: string) => void;
}

export const NoticeTable = ({
  notices,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
  searchText,
  onSearchTextChange,
}: Props) => {
  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0); // Reinicia la paginación
  };

  // Filtrado por título
  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // Paginación manual
  const paginatedNotices = filteredNotices.slice(
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
                <TableCell>Título</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedNotices.map((notice, index) => (
                <TableRow key={notice.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{notice.title}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => onEdit(notice)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => onDelete(notice.id)}>
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedNotices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No se encontraron resultados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredNotices.length}
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
