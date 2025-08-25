import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Add as AddIcon, Edit as EditIcon } from "@mui/icons-material";
import type { Area } from "../../../types/area";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Area>) => Promise<void>;
  initialData?: Area | null;
  loading?: boolean;
}

export const AreaModal = ({
  open,
  onClose,
  onSave,
  initialData,
  loading = false,
}: Props) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Resetear el formulario cuando se abre/cierra el modal
  useEffect(() => {
    if (open) {
      if (initialData) {
        // Modo edición
        setName(initialData.name);
      } else {
        // Modo creación
        setName("");
      }
      setNameError("");
      setIsSubmitting(false);
    }
  }, [open, initialData]);

  const validateForm = () => {
    let isValid = true;

    // Validar nombre
    if (!name.trim()) {
      setNameError("El nombre del área es obligatorio");
      isValid = false;
    } else if (name.trim().length < 3) {
      setNameError("El nombre debe tener al menos 3 caracteres");
      isValid = false;
    } else if (name.trim().length > 150) {
      setNameError("El nombre no puede exceder 150 caracteres");
      isValid = false;
    } else {
      setNameError("");
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({ name: name.trim() });
      // No cerrar aquí, dejar que el componente padre maneje el cierre
    } catch (error) {
      console.error("Error al guardar área:", error);
      // El error se maneja en el componente padre
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const isEditMode = !!initialData;
  const isFormValid = name.trim().length >= 3 && name.trim().length <= 150;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow:
            "0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)",
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            py: 3,
          }}
        >
          <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)" }}>
            {isEditMode ? <EditIcon /> : <AddIcon />}
          </Avatar>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {isEditMode ? "Editar Área" : "Nueva Área"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
              {isEditMode
                ? "Modifica la información del área seleccionada"
                : "Crea una nueva área para organizar la estructura institucional"}
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 3, pt: 3 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Información del Área */}
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
                Información del Área
              </Typography>

              <TextField
                label="Nombre del Área"
                fullWidth
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                variant="outlined"
                error={!!nameError}
                helperText={
                  nameError ||
                  "Ingresa el nombre de la nueva área (mín. 3, máx. 150 caracteres)"
                }
                disabled={isSubmitting}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&:hover fieldset": {
                      borderColor: "primary.main",
                    },
                  },
                }}
                InputProps={{
                  placeholder: "Ej: Tesorería, Contabilidad, Personal...",
                }}
              />

              {/* Información adicional */}
              <Box sx={{ mt: 2, p: 2, bgcolor: "info.50", borderRadius: 1 }}>
                <Typography
                  variant="body2"
                  color="info.main"
                  sx={{ fontWeight: 500 }}
                >
                  💡 Consejo: Usa nombres claros y descriptivos que faciliten la
                  identificación de cada área.
                </Typography>
              </Box>
            </Box>

            {/* Área actual (solo en modo edición) */}
            {isEditMode && initialData && (
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
                    color: "secondary.main",
                    fontWeight: 600,
                  }}
                >
                  Área Actual
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{ bgcolor: "secondary.main", width: 40, height: 40 }}
                  >
                    <EditIcon />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {initialData.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ID: #{initialData.id}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            p: 3,
            gap: 2,
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            variant="outlined"
            size="large"
            sx={{
              minWidth: 120,
              borderColor: "#d1d5db",
              color: "#374151",
              fontWeight: 500,
              "&:hover": {
                borderColor: "#9ca3af",
                bgcolor: "#f9fafb",
              },
            }}
          >
            Cancelar
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isFormValid || isSubmitting}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontWeight: 600,
              minWidth: 150,
              boxShadow: "0 4px 14px 0 rgba(102, 126, 234, 0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                boxShadow: "0 6px 20px 0 rgba(102, 126, 234, 0.6)",
              },
              "&:disabled": {
                background: "#e5e7eb",
                color: "#9ca3af",
                boxShadow: "none",
              },
            }}
          >
            {isSubmitting ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} color="inherit" />
                Guardando...
              </Box>
            ) : isEditMode ? (
              "Actualizar Área"
            ) : (
              "Crear Área"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
