import {
  Box,
  Chip,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  IconButton,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import type { Banner } from "../../../types/banner";

interface Props {
  open: boolean;
  banner: Banner | null;
  onClose: () => void;
  onEdit: (banner: Banner) => void;
}

export const BannerDetailModal = ({ open, banner, onClose, onEdit }: Props) => {
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
    if (banner) {
      onEdit(banner);
      onClose();
    }
  };

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
            <InfoOutlinedIcon />
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Detalle del Banner
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              Información completa del banner
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
        {banner && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Información básica */}
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
                  <Avatar sx={{ bgcolor: "#3b82f6", width: 40, height: 40 }}>
                    <InfoOutlinedIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Información General
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      ID del Banner
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, color: "#1e293b" }}
                    >
                      #{banner.id}
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
                      label={banner.status === "active" ? "Activo" : "Inactivo"}
                      color={banner.status === "active" ? "success" : "error"}
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

                <Divider sx={{ my: 3, borderColor: "#e2e8f0" }} />

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                  >
                    Título
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: "#1e293b",
                      lineHeight: 1.4,
                    }}
                  >
                    {banner.title}
                  </Typography>
                </Box>

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
                      fontStyle: banner.text ? "normal" : "italic",
                    }}
                  >
                    {banner.text || "Sin descripción disponible"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Configuración */}
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
                  <Avatar sx={{ bgcolor: "#8b5cf6", width: 40, height: 40 }}>
                    <SettingsOutlinedIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Configuración
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                    mb: 3,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Tipo de Banner
                    </Typography>
                    <Chip
                      label={banner.banner_type || "No especificado"}
                      color="default"
                      size="medium"
                      variant="outlined"
                      sx={{
                        fontWeight: 500,
                        borderColor: "#d1d5db",
                        color: "#374151",
                      }}
                    />
                  </Box>

                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                    >
                      Orden de Visualización
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#1e293b",
                        fontSize: "1.1rem",
                      }}
                    >
                      {banner.order || "Sin orden definido"}
                    </Typography>
                  </Box>
                </Box>

                {banner.link && (
                  <>
                    <Divider sx={{ mb: 3, borderColor: "#e2e8f0" }} />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ color: "#64748b", fontWeight: 500, mb: 1 }}
                      >
                        Enlace de Destino
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LinkOutlinedIcon
                          sx={{ color: "#3b82f6", fontSize: 20 }}
                        />
                        <a
                          href={banner.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#3b82f6",
                            textDecoration: "none",
                            fontWeight: 500,
                            fontSize: "0.9rem",
                          }}
                        >
                          {banner.link}
                        </a>
                      </Box>
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Fechas */}
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
                    <CalendarTodayOutlinedIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Programación
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 3,
                  }}
                >
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#f0fdf4",
                      border: "1px solid #bbf7d0",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#166534", fontWeight: 600, mb: 1 }}
                    >
                      Fecha de Inicio
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#15803d",
                        fontSize: "0.95rem",
                      }}
                    >
                      {formatDate(banner.start_date)}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      bgcolor: "#fef2f2",
                      border: "1px solid #fecaca",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "#991b1b", fontWeight: 600, mb: 1 }}
                    >
                      Fecha de Fin
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#dc2626",
                        fontSize: "0.95rem",
                      }}
                    >
                      {formatDate(banner.end_date)}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Imagen */}
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
                    <ImageOutlinedIcon />
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, color: "#1e293b" }}
                  >
                    Imagen del Banner
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#64748b", fontWeight: 500, mb: 2 }}
                  >
                    URL de la Imagen
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "#f8fafc",
                      borderRadius: 2,
                      border: "1px solid #e2e8f0",
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      wordBreak: "break-all",
                      color: "#475569",
                      lineHeight: 1.4,
                    }}
                  >
                    {banner.image}
                  </Box>
                </Box>

                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#64748b", fontWeight: 500, mb: 2 }}
                  >
                    Vista previa
                  </Typography>
                  <Box
                    sx={{
                      display: "inline-block",
                      p: 2,
                      border: "2px dashed #d1d5db",
                      borderRadius: 3,
                      bgcolor: "#f9fafb",
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        borderColor: "#9ca3af",
                        bgcolor: "#f3f4f6",
                      },
                    }}
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "350px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        boxShadow:
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y5ZmFmYiIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI3NSIgcj0iMjAiIGZpbGw9IiNkMWQ1ZGIiLz48cGF0aCBkPSJtMTMwIDk1IDQwIDMwIDQwLTMwIiBzdHJva2U9IiNkMWQ1ZGIiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==";
                        (e.target as HTMLImageElement).style.filter =
                          "grayscale(1)";
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        )}
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
        {banner && (
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
            Editar Banner
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
