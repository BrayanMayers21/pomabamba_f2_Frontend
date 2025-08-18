import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  content: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  title = "Confirmar acción",
  content,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>Cancelar</Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        Eliminar
      </Button>
    </DialogActions>
  </Dialog>
);
