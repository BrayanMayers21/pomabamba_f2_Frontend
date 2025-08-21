import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  Box,
  Avatar,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import type { Banner } from "../../../types/banner";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: FormData) => void;
  banner?: Banner | null;
  loading?: boolean;
}

export const BannerModal = ({
  open,
  onClose,
  onSave,
  banner,
  loading = false,
}: Props) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [link, setLink] = useState("");
  const [status, setStatus] = useState<"active" | "inactive">("active");
  const [bannerType, setBannerType] = useState<"static" | "animated">("static");
  const [order, setOrder] = useState<number | string>("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState(false);

  // Resetear el formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (open) {
      if (banner) {
        // Modo edición
        setTitle(banner.title);
        setText(banner.text || "");
        setLink(banner.link || "");
        setStatus(banner.status);
        setBannerType(banner.banner_type || "static");
        setOrder(banner.order || "");
        setStartDate(banner.start_date);
        setEndDate(banner.end_date);
        setImagePreview(banner.image);
      } else {
        // Modo creación
        setTitle("");
        setText("");
        setLink("");
        setStatus("active");
        setBannerType("static");
        setOrder("");
        setStartDate("");
        setEndDate("");
        setImagePreview("");
      }
      setImageFile(null);
    }
  }, [open, banner]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede ser mayor a 5MB");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("text", text);
    formData.append("link", link);
    formData.append("status", status);

    // Enviar el tipo de banner seleccionado
    formData.append("banner_type", bannerType);

    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    if (order !== "") {
      formData.append("order", order.toString());
    }

    // Solo agregar imagen si se seleccionó una nueva
    if (imageFile) {
      formData.append("image", imageFile);
    }

    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {banner ? "Editar Banner" : "Crear Nuevo Banner"}
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 2 }}>
            {/* Sección: Información Básica */}
            <Box
              sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Información Básica
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 2,
                }}
              >
                {/* Título */}
                <TextField
                  label="Título del Banner"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="outlined"
                  sx={{ gridColumn: { xs: "span 2", sm: "span 1" } }}
                />

                {/* Tipo de banner */}
                <FormControl
                  fullWidth
                  sx={{ gridColumn: { xs: "span 2", sm: "span 1" } }}
                >
                  <InputLabel>Tipo de Banner</InputLabel>
                  <Select
                    value={bannerType}
                    onChange={(e) =>
                      setBannerType(e.target.value as "static" | "animated")
                    }
                    label="Tipo de Banner"
                    variant="outlined"
                  >
                    <MenuItem value="static">Estático</MenuItem>
                    <MenuItem value="animated">Animado</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Texto */}
              <TextField
                label="Descripción del Banner"
                fullWidth
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                helperText="Descripción que se mostrará en el banner (opcional)"
              />
            </Box>

            {/* Sección: Configuración y Enlaces */}
            <Box
              sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Configuración y Enlaces
              </Typography>

              <Box
                sx={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 2 }}
              >
                {/* Enlace */}
                <TextField
                  label="Enlace de Destino"
                  fullWidth
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  helperText="URL completa hacia donde dirigir al hacer clic (opcional)"
                  variant="outlined"
                />

                {/* Orden */}
                <TextField
                  label="Orden de Visualización"
                  type="number"
                  fullWidth
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  helperText="Prioridad de mostrar (opcional)"
                  variant="outlined"
                />
              </Box>
            </Box>

            {/* Sección: Programación Temporal */}
            <Box
              sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Programación Temporal
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                {/* Fechas */}
                <TextField
                  label="Fecha de Inicio"
                  type="date"
                  fullWidth
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />

                <TextField
                  label="Fecha de Finalización"
                  type="date"
                  fullWidth
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                />

                {/* Estado */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={status === "active"}
                        onChange={(e) =>
                          setStatus(e.target.checked ? "active" : "inactive")
                        }
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ textAlign: "center" }}>
                        <Typography variant="body2" fontWeight={600}>
                          {status === "active" ? "Activo" : "Inactivo"}
                        </Typography>
                      </Box>
                    }
                    labelPlacement="top"
                  />
                  <Typography variant="caption" sx={{ mt: 1 }}>
                    Estado: {status === "active" ? "Activo" : "Inactivo"}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Sección: Imagen del Banner */}
            <Box
              sx={{
                p: 3,
                border: 1,
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                Imagen del Banner
              </Typography>

              <InputLabel
                sx={{
                  mb: 2,
                  fontSize: "0.9rem",
                  color: "text.secondary",
                }}
              >
                {banner ? "Cambiar imagen (opcional)" : "Imagen del banner *"}
              </InputLabel>

              {/* Zona de drag & drop mejorada */}
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  border: 2,
                  borderStyle: "dashed",
                  borderColor: isDragOver ? "primary.main" : "divider",
                  borderRadius: 3,
                  p: 4,
                  textAlign: "center",
                  bgcolor: isDragOver ? "primary.light" : "background.default",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  minHeight: 200,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  "&:hover": {
                    borderColor: "primary.main",
                    bgcolor: "primary.light",
                    transform: "translateY(-2px)",
                    boxShadow: 3,
                  },
                }}
                onClick={() => document.getElementById("image-input")?.click()}
              >
                {imagePreview ? (
                  <Box sx={{ width: "100%" }}>
                    <Box
                      sx={{
                        mb: 3,
                        display: "flex",
                        justifyContent: "center",
                        "& img": {
                          borderRadius: 2,
                          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      <Avatar
                        src={imagePreview}
                        alt="Preview"
                        variant="rounded"
                        sx={{
                          width: { xs: 250, sm: 350 },
                          height: { xs: 150, sm: 200 },
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body1"
                      color="primary"
                      fontWeight={500}
                    >
                      Imagen cargada correctamente
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 1 }}
                    >
                      Haz clic o arrastra una nueva imagen para cambiar
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h2"
                        color="textSecondary"
                        sx={{
                          fontSize: "4rem",
                          filter: "grayscale(50%)",
                          opacity: 0.7,
                        }}
                      >
                      </Typography>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: isDragOver ? "primary.main" : "text.primary",
                      }}
                    >
                      {isDragOver
                        ? "Suelta la imagen aquí"
                        : "Arrastra una imagen aquí"}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ mb: 2 }}
                    >
                      o haz clic para seleccionar un archivo
                    </Typography>
                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: "background.paper",
                        borderRadius: 1,
                        border: 1,
                        borderColor: "divider",
                        display: "inline-block",
                      }}
                    >
                      <Typography variant="caption" color="textSecondary">
                        Formatos: JPG, PNG, GIF | Máximo: 5MB
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Input file oculto */}
              <input
                id="image-input"
                type="file"
                accept="image/*"
                required={!banner && !imageFile}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />

              {!banner && !imageFile && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    mt: 2,
                    display: "block",
                    textAlign: "center",
                    fontWeight: 500,
                    p: 1,
                    bgcolor: "warning.light",
                    borderRadius: 1,
                    border: 1,
                    borderColor: "warning.main",
                  }}
                >
                  La imagen es obligatoria para crear un nuevo banner
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            gap: 2,
          }}
        >
          <Button
            onClick={onClose}
            disabled={loading}
            variant="outlined"
            size="large"
            sx={{
              minWidth: 120,
            }}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={
              loading ||
              !title.trim() ||
              !startDate ||
              !endDate ||
              (!banner && !imageFile)
            }
            sx={{
              minWidth: 150,
            }}
          >
            {loading
              ? "Guardando..."
              : banner
                ? "Actualizar Banner"
                : "Crear Banner"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
