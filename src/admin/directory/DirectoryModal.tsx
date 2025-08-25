import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
} from "@mui/material";

interface DirectoryModalProps {
  open: boolean;
  loading: boolean;
  directory?: any;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export default function DirectoryModal({
  open,
  loading,
  directory,
  onClose,
  onSubmit,
}: DirectoryModalProps) {
  const [name, setName] = useState(directory?.name || "");
  const [description, setDescription] = useState(directory?.description || "");
  const [email, setEmail] = useState(directory?.email || "");
  const [phone, setPhone] = useState(directory?.phone || "");
  const [fullName, setFullName] = useState(directory?.full_name || "");
  const [position, setPosition] = useState(directory?.position || "");
  const [year, setYear] = useState(
    directory?.year ? String(directory.year) : ""
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>(
    directory?.photo_url || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setName(directory?.name || "");
    setDescription(directory?.description || "");
    setEmail(directory?.email || "");
    setPhone(directory?.phone || "");
    setFullName(directory?.full_name || "");
    setPosition(directory?.position || "");
    setYear(directory?.year ? String(directory.year) : "");
    setPhotoPreview(directory?.photo_url || "");
    setPhoto(null);
  }, [directory, open]);

  const handleSubmit = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !fullName.trim() ||
      !position.trim() ||
      !year.trim()
    )
      return;
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("description", description.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    formData.append("full_name", fullName.trim());
    formData.append("position", position.trim());
    formData.append("year", year.trim());
    if (photo) {
      formData.append("photo_url", photo);
    }
    onSubmit(formData);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {directory ? "Editar directorio" : "Nuevo directorio"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Cargo"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Año"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={2}
            required
            disabled={loading}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Teléfono"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <Box
            sx={{
              border: "2px dashed #90caf9",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              cursor: "pointer",
              mt: 2,
              bgcolor: photoPreview ? "primary.50" : "background.paper",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Foto"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: 8,
                }}
              />
            ) : (
              <Typography color="text.secondary">
                Suba su foto o arrastre aquí
              </Typography>
            )}
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handlePhotoChange}
              disabled={loading}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={
            loading ||
            !name.trim() ||
            !description.trim() ||
            !email.trim() ||
            !phone.trim()
          }
        >
          {directory ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
