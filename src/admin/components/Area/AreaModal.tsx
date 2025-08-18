import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { useState, useEffect } from "react";
import type { Area } from "../../../types/area";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: Partial<Area>) => void;
  initialData?: Area | null;
}

export const AreaModal = ({ open, onClose, onSave, initialData }: Props) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (open) {
      setName(initialData?.name || "");
    }
  }, [initialData, open]);

  const handleSubmit = () => {
    onSave({ name });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialData ? "Editar Área" : "Nueva Área"}</DialogTitle>
      <DialogContent>
        <TextField label="Nombre" fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};
