import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";

interface ConvocatoriaModalProps {
  open: boolean;
  loading: boolean;
  convocatoria?: any;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const ConvocatoriaModal: React.FC<ConvocatoriaModalProps> = ({
  open,
  loading,
  convocatoria,
  onClose,
  onSubmit,
}) => {
  const [position, setPosition] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [area, setArea] = useState("");
  const [vacancies, setVacancies] = useState(1);
  const [remuneration, setRemuneration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [schedulePdf, setSchedulePdf] = useState<File | null>(null);
  const [requirements, setRequirements] = useState("");
  const [basesPdf, setBasesPdf] = useState<File | null>(null);
  const [resultsPdf, setResultsPdf] = useState<File | null>(null);
  const [status, setStatus] = useState("active");

  useEffect(() => {
    setPosition(convocatoria?.position || "");
    setDescription(convocatoria?.description || "");
    setCode(convocatoria?.code || "");
    setArea(convocatoria?.area || "");
    setVacancies(convocatoria?.vacancies || 1);
    setRemuneration(convocatoria?.remuneration || "");
    setStartDate(convocatoria?.start_date || "");
    setEndDate(convocatoria?.end_date || "");
    setRequirements(convocatoria?.requirements || "");
    setStatus(convocatoria?.status || "active");
    setSchedulePdf(null);
    setBasesPdf(null);
    setResultsPdf(null);
  }, [convocatoria, open]);

  const [errors, setErrors] = useState<any>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!position.trim()) newErrors.position = "Obligatorio";
    if (!description.trim()) newErrors.description = "Obligatorio";
    if (!code.trim()) newErrors.code = "Obligatorio";
    if (!area.trim()) newErrors.area = "Obligatorio";
    if (!vacancies || vacancies < 1) newErrors.vacancies = "Obligatorio";
    if (!remuneration.trim()) newErrors.remuneration = "Obligatorio";
    if (!startDate) newErrors.startDate = "Obligatorio";
    if (!endDate) newErrors.endDate = "Obligatorio";
    if (!requirements.trim()) newErrors.requirements = "Obligatorio";
    if (!status) newErrors.status = "Obligatorio";
    // Solo obligatorios los PDF si es creación (no edición)
    if (!convocatoria) {
      if (!schedulePdf) newErrors.schedulePdf = "PDF obligatorio";
      if (!basesPdf) newErrors.basesPdf = "PDF obligatorio";
      if (!resultsPdf) newErrors.resultsPdf = "PDF obligatorio";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    const formData = new FormData();
    formData.append("position", position.trim());
    formData.append("description", description.trim());
    formData.append("code", code);
    formData.append("area", area);
    formData.append("vacancies", vacancies.toString());
    formData.append("remuneration", remuneration);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    if (schedulePdf) formData.append("schedule_pdf", schedulePdf);
    formData.append("requirements", requirements);
    if (basesPdf) formData.append("bases_pdf", basesPdf);
    if (resultsPdf) formData.append("results_pdf", resultsPdf);
    formData.append("status", status);

    // onSubmit puede ser async, pero no retorna nada. Cerramos el modal después de la llamada.
    await onSubmit(formData);
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 3, py: 0, backgroundColor: "#f5f7fa" }}>
        <Typography variant="h5" fontWeight={700} color="primary.main">
          {convocatoria ? "Editar convocatoria" : "Nueva convocatoria"}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ px: 3, py: 0, backgroundColor: "#fafcff" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Paper elevation={0} sx={{ p: 2, mb: 0, background: "#fff" }}>
            <Typography variant="h6" color="primary" fontWeight={600} mb={2}>
              Información Básica
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Cargo *"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                disabled={loading || submitting}
                error={!!errors.position}
                helperText={errors.position}
                sx={{ flex: 2, minWidth: 260, fontSize: "1.15rem" }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
              <TextField
                label="Vacantes *"
                type="number"
                value={vacancies}
                onChange={(e) => setVacancies(Number(e.target.value))}
                required
                inputProps={{ min: 1 }}
                disabled={loading || submitting}
                error={!!errors.vacancies}
                helperText={errors.vacancies}
                sx={{ flex: 1, minWidth: 140, fontSize: "1.15rem" }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
              <TextField
                label="Estado *"
                select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                disabled={loading || submitting}
                error={!!errors.status}
                helperText={errors.status}
                sx={{ flex: 1, minWidth: 140, fontSize: "1.15rem" }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              >
                <MenuItem value="active">Activo</MenuItem>
                <MenuItem value="inactive">Inactivo</MenuItem>
                <MenuItem value="closed">Cerrado</MenuItem>
              </TextField>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
              <TextField
                label="Código *"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                disabled={loading || submitting}
                error={!!errors.code}
                helperText={errors.code}
                sx={{ flex: 1, minWidth: 180, fontSize: "1.15rem" }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
              <TextField
                label="Área *"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                disabled={loading || submitting}
                error={!!errors.area}
                helperText={errors.area}
                sx={{ flex: 1, minWidth: 180, fontSize: "1.15rem" }}
                InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
              />
            </Box>
            <TextField
              label="Descripción *"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              minRows={5}
              required
              disabled={loading || submitting}
              error={!!errors.description}
              helperText={errors.description}
              sx={{ mt: 2, fontSize: "1.15rem" }}
              InputLabelProps={{ sx: { fontSize: "1.1rem" } }}
            />
          </Paper>

          <Paper elevation={0} sx={{ p: 0, mb: 0, background: "#fff" }}>
            <Typography variant="h6" color="primary" fontWeight={600} mb={2}>
              Detalles del Puesto
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                label="Remuneración *"
                value={remuneration}
                onChange={(e) => setRemuneration(e.target.value)}
                required
                disabled={loading || submitting}
                error={!!errors.remuneration}
                helperText={errors.remuneration}
                sx={{ flex: 1, minWidth: 180 }}
              />
              <TextField
                label="Fecha de inicio *"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                disabled={loading || submitting}
                error={!!errors.startDate}
                helperText={errors.startDate}
                sx={{ flex: 1, minWidth: 180 }}
              />
              <TextField
                label="Fecha de fin *"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                InputLabelProps={{ shrink: true }}
                disabled={loading || submitting}
                error={!!errors.endDate}
                helperText={errors.endDate}
                sx={{ flex: 1, minWidth: 180 }}
              />
            </Box>
            <TextField
              label="Requisitos *"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              fullWidth
              multiline
              minRows={3}
              required
              disabled={loading || submitting}
              error={!!errors.requirements}
              helperText={errors.requirements}
              sx={{ mt: 2 }}
            />
          </Paper>
          <Paper elevation={0} sx={{ p: 2, background: "#fff" }}>
            <Typography variant="h6" color="primary" fontWeight={600} mb={2}>
              Documentos
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  minWidth: 180,
                }}
              >
                <Button
                  variant={!!schedulePdf ? "contained" : "outlined"}
                  component="label"
                  disabled={loading || submitting}
                  color={!!schedulePdf ? "success" : "primary"}
                  sx={{ width: "100%" }}
                >
                  {schedulePdf ? "PDF seleccionado" : "Subir cronograma PDF *"}
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSchedulePdf(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {schedulePdf ? schedulePdf.name : errors.schedulePdf}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  minWidth: 180,
                }}
              >
                <Button
                  variant={!!basesPdf ? "contained" : "outlined"}
                  component="label"
                  disabled={loading || submitting}
                  color={!!basesPdf ? "success" : "primary"}
                  sx={{ width: "100%" }}
                >
                  {basesPdf ? "PDF seleccionado" : "Subir bases PDF *"}
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setBasesPdf(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {basesPdf ? basesPdf.name : errors.basesPdf}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  minWidth: 180,
                }}
              >
                <Button
                  variant={!!resultsPdf ? "contained" : "outlined"}
                  component="label"
                  disabled={loading || submitting}
                  color={!!resultsPdf ? "success" : "primary"}
                  sx={{ width: "100%" }}
                >
                  {resultsPdf ? "PDF seleccionado" : "Subir resultados PDF *"}
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResultsPdf(e.target.files[0]);
                      }
                    }}
                  />
                </Button>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {resultsPdf ? resultsPdf.name : errors.resultsPdf}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, backgroundColor: "#f5f7fa" }}>
        <Button
          onClick={onClose}
          disabled={loading || submitting}
          variant="outlined"
          sx={{ fontWeight: 600, borderRadius: 2 }}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || submitting}
          sx={{ minWidth: 120, fontWeight: 600, borderRadius: 2, boxShadow: 2 }}
        >
          {convocatoria ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConvocatoriaModal;
