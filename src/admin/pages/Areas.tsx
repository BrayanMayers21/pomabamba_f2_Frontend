// import { useEffect, useState } from "react";
// import { Box, Button, Typography, Divider, Alert } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import BusinessIcon from "@mui/icons-material/Business";
// import type { Area } from "../../types/area";
// import { getAreas, createArea, updateArea, deleteArea } from "../../api/areas";
// import { AreaModal, AreaDetailModal, AreaTable } from "../components/Area";
// import { useSnackbar } from "notistack";
// import { Spinner } from "../components/Spinner";
// import { ConfirmDialog } from "../components/ConfirmDialog";

// export default function AreasPage() {
//   const { enqueueSnackbar } = useSnackbar();
//   const [areas, setAreas] = useState<Area[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedArea, setSelectedArea] = useState<Area | null>(null);
//   const [areaToDelete, setAreaToDelete] = useState<Area | null>(null);
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [detailModalOpen, setDetailModalOpen] = useState(false);
//   const [areaForDetail, setAreaForDetail] = useState<Area | null>(null);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchText, setSearchText] = useState("");
//   const [modalLoading, setModalLoading] = useState(false);
//   const [searchLoading, setSearchLoading] = useState(false);

//   const fetchAreas = async (search = "") => {
//     setLoading(true);
//     setSearchLoading(!!search);

//     try {
//       const { data } = await getAreas();
//       // Filtrar áreas por búsqueda si se proporciona
//       let filteredAreas = data;
//       if (search.trim()) {
//         filteredAreas = data.filter((area) =>
//           area.name.toLowerCase().includes(search.toLowerCase())
//         );
//       }

//       setAreas(filteredAreas);
//     } catch (error) {
//       console.error("Error al cargar áreas:", error);
//       enqueueSnackbar("Error al cargar las áreas", { variant: "error" });
//       setAreas([]);
//     } finally {
//       setLoading(false);
//       setSearchLoading(false);
//     }
//   };

//   const handleSave = async (data: Partial<Area>) => {
//     setModalLoading(true);
//     try {
//       if (selectedArea) {
//         // Actualizar área existente
//         await updateArea(selectedArea.id, data);
//         enqueueSnackbar("Área actualizada correctamente", {
//           variant: "success",
//         });
//       } else {
//         // Crear nueva área
//         await createArea(data);
//         enqueueSnackbar("Área creada correctamente", { variant: "success" });
//       }

//       // Recargar áreas y cerrar modal
//       await fetchAreas(searchText);
//       setOpenModal(false);
//       setSelectedArea(null);
//     } catch (error: any) {
//       console.error("Error al guardar área:", error);
//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.detail ||
//         "Error al guardar el área";
//       enqueueSnackbar(message, { variant: "error" });
//       throw error; // Re-lanzar para que el modal maneje el estado
//     } finally {
//       setModalLoading(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!areaToDelete) return;

//     try {
//       await deleteArea(areaToDelete.id);
//       enqueueSnackbar("Área eliminada correctamente", { variant: "success" });

//       // Recargar áreas
//       await fetchAreas(searchText);

//       // Ajustar página si es necesario
//       const updatedAreas = areas.filter((a) => a.id !== areaToDelete.id);
//       const maxPage = Math.ceil(updatedAreas.length / rowsPerPage);
//       if (page >= maxPage && maxPage > 0) {
//         setPage(Math.max(0, maxPage - 1));
//       }
//     } catch (error: any) {
//       console.error("Error al eliminar área:", error);
//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.detail ||
//         "Error al eliminar el área";
//       enqueueSnackbar(message, { variant: "error" });
//     } finally {
//       setConfirmOpen(false);
//       setAreaToDelete(null);
//     }
//   };

//   const handleSearch = (search: string) => {
//     setSearchText(search);
//     setPage(0); // Volver a la primera página al buscar
//     fetchAreas(search);
//   };

//   const handlePageChange = (newPage: number) => {
//     setPage(newPage);
//   };

//   const handleRowsPerPageChange = (newRowsPerPage: number) => {
//     setRowsPerPage(newRowsPerPage);
//     setPage(0); // Volver a la primera página
//   };

//   const handleEdit = (area: Area) => {
//     setSelectedArea(area);
//     setOpenModal(true);
//   };

//   const handleDeleteClick = (areaOrId: Area | number) => {
//     if (typeof areaOrId === "number") {
//       // Si recibimos un ID, buscar el área correspondiente
//       const area = areas.find((a) => a.id === areaOrId);
//       if (area) {
//         setAreaToDelete(area);
//         setConfirmOpen(true);
//       }
//     } else {
//       // Si recibimos un área directamente
//       setAreaToDelete(areaOrId);
//       setConfirmOpen(true);
//     }
//   };

//   const handleViewDetail = (area: Area) => {
//     setAreaForDetail(area);
//     setDetailModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setSelectedArea(null);
//   };

//   useEffect(() => {
//     fetchAreas();
//   }, []);

//   return (
//     <Box sx={{ p: 2 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           mb: 2,
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           justifyContent: { sm: "space-between" },
//           alignItems: "center",
//           gap: 2,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//           <BusinessIcon sx={{ fontSize: 40, color: "primary.main" }} />
//           <Box>
//             <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
//               Gestión de Áreas
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Administra las áreas institucionales de la UGEL Pomabamba
//             </Typography>
//           </Box>
//         </Box>

//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           fullWidth
//           sx={{
//             width: { xs: "100%", sm: "auto" },
//             background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//             boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
//             "&:hover": {
//               background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
//               boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.6)",
//             },
//           }}
//           onClick={() => {
//             setSelectedArea(null);
//             setOpenModal(true);
//           }}
//         >
//           Nueva Área
//         </Button>
//       </Box>

//       <Divider sx={{ my: 3 }} />

//       {/* Información del sistema */}
//       <Alert severity="info" sx={{ mb: 3 }} icon={<BusinessIcon />}>
//         <Typography variant="body2">
//           <strong>Áreas:</strong> Las áreas representan las diferentes secciones
//           o departamentos de la UGEL Pomabamba. Cada área puede contener
//           personal, documentos y responsabilidades específicas.
//         </Typography>
//       </Alert>

//       {/* Tabla de áreas */}
//       {loading ? (
//         <Spinner />
//       ) : (
//         <AreaTable
//           areas={areas}
//           page={page}
//           rowsPerPage={rowsPerPage}
//           totalCount={areas.length}
//           loading={loading}
//           searchLoading={searchLoading}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleRowsPerPageChange}
//           onEdit={handleEdit}
//           onDelete={handleDeleteClick}
//           onViewDetail={handleViewDetail}
//           searchText={searchText}
//           onSearch={handleSearch}
//         />
//       )}

//       {/* Modal para crear/editar área */}
//       <AreaModal
//         open={openModal}
//         onClose={handleCloseModal}
//         onSave={handleSave}
//         initialData={selectedArea}
//         loading={modalLoading}
//       />

//       {/* Modal de detalle del área */}
//       <AreaDetailModal
//         open={detailModalOpen}
//         area={areaForDetail}
//         onClose={() => {
//           setDetailModalOpen(false);
//           setAreaForDetail(null);
//         }}
//         onEdit={handleEdit}
//         onDelete={handleDeleteClick}
//       />

//       {/* Dialog de confirmación para eliminar */}
//       <ConfirmDialog
//         open={confirmOpen}
//         title="Confirmar eliminación"
//         content={`¿Estás seguro de que deseas eliminar el área "${areaToDelete?.name}"? Esta acción no se puede deshacer.`}
//         onConfirm={handleDelete}
//         onCancel={() => {
//           setConfirmOpen(false);
//           setAreaToDelete(null);
//         }}
//       />
//     </Box>
//   );
// }
