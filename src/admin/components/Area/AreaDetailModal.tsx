import {
  Box,
  Chip,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Card,
  CardContent,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Close as CloseIcon,
  Info as InfoIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import type { Area } from "../../../types/area";

interface Props {
  open: boolean;
  area: Area | null;
  onClose: () => void;
  onEdit: (area: Area) => void;
  onDelete: (areaOrId: Area | number) => void;
}

export const AreaDetailModal = ({
  open,
  area,
  onClose,
  onEdit,
  onDelete,
}: Props) => {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const handleEdit = () => {
    if (area) {
      onEdit(area);
      onClose();
    }
  };

  const handleDelete = () => {
    if (area) {
      onDelete(area);
      onClose();
    }
  };

  if (!area) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow:
            "0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          py: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
            <BusinessIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Detalle del Área
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Información completa de {area.name}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: "white",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": {
              bgcolor: "rgba(255,255,255,0.2)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        dividers
        sx={{
          p: 3,
          bgcolor: "#f8fafc",
          minHeight: "500px",
        }}
      >
        <Grid container spacing={3}>
          {/* Información General */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                bgcolor: "white",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Avatar sx={{ bgcolor: "#3b82f6", width: 40, height: 40 }}>
                    <InfoIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Información General
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      ID del Área
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#1e293b" }}
                    >
                      #{area.id}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Nombre del Área
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        lineHeight: 1.4,
                      }}
                    >
                      {area.name}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Estado
                    </Typography>
                    <Chip
                      label="Activa"
                      color="success"
                      size="medium"
                      sx={{
                        fontWeight: 600,
                        px: 2,
                        "& .MuiChip-label": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Información del Sistema */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                bgcolor: "white",
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Avatar sx={{ bgcolor: "#8b5cf6", width: 40, height: 40 }}>
                    <DescriptionIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Información del Sistema
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Fecha de Creación
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "0.95rem",
                      }}
                    >
                      {area.created_at
                        ? formatDate(area.created_at)
                        : "No disponible"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Última Actualización
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "0.95rem",
                      }}
                    >
                      {area.updated_at
                        ? formatDate(area.updated_at)
                        : "No disponible"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Longitud del Nombre
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "0.95rem",
                      }}
                    >
                      {area.name.length} caracteres
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Estadísticas y Métricas */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                bgcolor: "white",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Avatar sx={{ bgcolor: "#10b981", width: 40, height: 40 }}>
                    <PersonIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Estadísticas y Métricas
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="success.main"
                        sx={{ fontWeight: 600 }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        color="success.dark"
                        sx={{ fontWeight: 500 }}
                      >
                        Personal Asignado
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#fef3c7",
                        border: "1px solid #fde68a",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="warning.main"
                        sx={{ fontWeight: 600 }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        color="warning.dark"
                        sx={{ fontWeight: 500 }}
                      >
                        Documentos
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#dbeafe",
                        border: "1px solid #93c5fd",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="info.main"
                        sx={{ fontWeight: 600 }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        color="info.dark"
                        sx={{ fontWeight: 500 }}
                      >
                        Proyectos Activos
                      </Typography>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Paper
                      sx={{
                        p: 2,
                        textAlign: "center",
                        bgcolor: "#f3e8ff",
                        border: "1px solid #c4b5fd",
                        borderRadius: 2,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="secondary.main"
                        sx={{ fontWeight: 600 }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        color="secondary.dark"
                        sx={{ fontWeight: 500 }}
                      >
                        Responsabilidades
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 3, p: 2, bgcolor: "info.50", borderRadius: 1 }}>
                  <Typography
                    variant="body2"
                    color="info.main"
                    sx={{ fontWeight: 500 }}
                  >
                    💡 Nota: Las estadísticas se actualizarán automáticamente
                    cuando se asigne personal, documentos o proyectos a esta
                    área.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Información Adicional */}
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: "1px solid #e2e8f0",
                bgcolor: "white",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
                >
                  <Avatar sx={{ bgcolor: "#f59e0b", width: 40, height: 40 }}>
                    <CalendarIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Información Adicional
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Descripción
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#475569",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                      }}
                    >
                      {area.description ||
                        "Esta área no tiene descripción adicional configurada."}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Observaciones
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#475569",
                        lineHeight: 1.6,
                        fontStyle: "italic",
                      }}
                    >
                      {area.observations ||
                        "No hay observaciones registradas para esta área."}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          p: 3,
          bgcolor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          gap: 2,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          size="large"
          sx={{
            borderColor: "#d1d5db",
            color: "#374151",
            fontWeight: 500,
            px: 3,
            "&:hover": {
              borderColor: "#9ca3af",
              bgcolor: "#f9fafb",
            },
          }}
        >
          Cerrar
        </Button>

        <Button
          onClick={handleEdit}
          variant="contained"
          size="large"
          startIcon={<EditIcon />}
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            fontWeight: 600,
            px: 4,
            boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
            "&:hover": {
              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
              boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.6)",
            },
          }}
        >
          Editar Área
        </Button>

        <Button
          onClick={handleDelete}
          variant="outlined"
          size="large"
          color="error"
          sx={{
            borderColor: "#fca5a5",
            color: "#dc2626",
            fontWeight: 500,
            px: 4,
            "&:hover": {
              borderColor: "#f87171",
              bgcolor: "#fef2f2",
            },
          }}
        >
          Eliminar Área
        </Button>
      </DialogActions>
    </Dialog>
  );
};
