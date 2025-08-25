import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import type { Alert } from "../../../types/alert";

interface AlertModalProps {
  open: boolean;
  loading: boolean;
  title: string;
  setTitle: (v: string) => void;
  message: string;
  setMessage: (v: string) => void;
  type: Alert["type"];
  setType: (v: Alert["type"]) => void;
  duration: number;
  setDuration: (v: number) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  imageUrl: string;
  setImageUrl: (v: string) => void;
  linkUrl: string;
  setLinkUrl: (v: string) => void;
  active: boolean;
  setActive: (v: boolean) => void;
  onClose: () => void;
  onSubmit: () => void;
}

export function AlertModal({
  open,
  loading,
  title,
  setTitle,
  message,
  setMessage,
  type,
  setType,
  duration,
  setDuration,
  endDate,
  setEndDate,
  imageUrl,
  setImageUrl,
  linkUrl,
  setLinkUrl,
  active,
  setActive,
  onClose,
  onSubmit,
}: AlertModalProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title" sx={{ pb: 0 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <NotificationsIcon color="primary" sx={{ fontSize: 32 }} />
          <Typography variant="h5" component="div" fontWeight={600}>
            Nueva Alertaaaaaa
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers sx={{ bgcolor: "background.default" }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 1 }}
          autoComplete="off"
        >
          <TextField
            label="Título de la alerta"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ejemplo: Corte de energía programado"
            inputProps={{ maxLength: 80 }}
            helperText={`${title.length}/80 caracteres`}
          />
          <TextField
            label="Mensaje detallado"
            fullWidth
            required
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe la alerta para los usuarios"
            inputProps={{ maxLength: 300 }}
            helperText={`${message.length}/300 caracteres`}
          />
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControl fullWidth>
              <InputLabel id="type-label">Tipo</InputLabel>
              <Select
                labelId="type-label"
                value={type}
                onChange={(e) => setType(e.target.value as Alert["type"])}
                label="Tipo"
              >
                <MenuItem value="info">Información</MenuItem>
                <MenuItem value="warning">Advertencia</MenuItem>
                <MenuItem value="error">Error</MenuItem>
                <MenuItem value="success">Éxito</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Duración (segundos)"
              type="number"
              fullWidth
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              inputProps={{ min: 0, max: 4294967295 }}
              helperText="Tiempo que la alerta estará visible"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="Fecha de finalización"
              type="date"
              fullWidth
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              helperText="La alerta dejará de mostrarse después de esta fecha"
            />
            <TextField
              label="URL de imagen (opcional)"
              fullWidth
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              helperText="Imagen ilustrativa para la alerta"
            />
          </Box>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <TextField
              label="URL de enlace (opcional)"
              fullWidth
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://ejemplo.com"
              helperText="Enlace relacionado a la alerta"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  color="primary"
                />
              }
              label={<Typography fontWeight={500}>Alerta Activa</Typography>}
            />
          </Box>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button onClick={onClose} disabled={loading} variant="outlined">
              Cancelar
            </Button>
            <Button
              onClick={onSubmit}
              variant="contained"
              disabled={loading || !title.trim() || !message.trim()}
              size="large"
            >
              {loading ? "Creando..." : "Crear Alerta"}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
