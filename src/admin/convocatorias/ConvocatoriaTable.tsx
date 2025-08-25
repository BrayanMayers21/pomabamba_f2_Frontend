import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

interface ConvocatoriaTableProps {
  convocatorias: any[];
  page: number;
  rowsPerPage: number;
  totalCount: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRows: number) => void;
  onEdit: (convocatoria: any) => void;
  onDelete: (id: number) => void;
}

export function ConvocatoriaTable({
  convocatorias,
  page,
  rowsPerPage,
  totalCount,
  onPageChange,
  onRowsPerPageChange,
  onEdit,
  onDelete,
}: ConvocatoriaTableProps) {
  const safeConvocatorias = Array.isArray(convocatorias) ? convocatorias : [];

  const handleChangePage = (_: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Cargo</TableCell>
                <TableCell>Área</TableCell>
                <TableCell>Vacantes</TableCell>
                <TableCell>Remuneración</TableCell>
                <TableCell>Inicio</TableCell>
                <TableCell>Fin</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Bases</TableCell>
                <TableCell>Cronograma</TableCell>
                <TableCell>Resultados</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {safeConvocatorias.map((conv, index) => (
                <TableRow key={conv.id}>
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell>{conv.position}</TableCell>
                  <TableCell>{conv.area}</TableCell>
                  <TableCell>{conv.vacancies}</TableCell>
                  <TableCell>{conv.remuneration}</TableCell>
                  <TableCell>{conv.start_date}</TableCell>
                  <TableCell>{conv.end_date}</TableCell>
                  <TableCell>
                    {conv.status === "active"
                      ? "Activo"
                      : conv.status === "inactive"
                        ? "Inactivo"
                        : "Cerrado"}
                  </TableCell>
                  <TableCell>
                    {conv.bases_pdf ? (
                      <a
                        href={conv.bases_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Bases
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {conv.schedule_pdf ? (
                      <a
                        href={conv.schedule_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cronograma
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    {conv.results_pdf ? (
                      <a
                        href={conv.results_pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resultados
                      </a>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => onEdit(conv)}
                      aria-label="Editar convocatoria"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => onDelete(conv.id)}
                      aria-label="Eliminar convocatoria"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {safeConvocatorias.length === 0 && (
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
