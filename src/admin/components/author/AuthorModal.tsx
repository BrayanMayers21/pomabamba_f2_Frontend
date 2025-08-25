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

interface AuthorModalProps {
  open: boolean;
  loading: boolean;
  author?: any;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export default function AuthorModal({
  open,
  loading,
  author,
  onClose,
  onSubmit,
}: AuthorModalProps) {
  const [fullName, setFullName] = useState(author?.full_name || "");
  const [bio, setBio] = useState(author?.bio || "");
  const [email, setEmail] = useState(author?.email || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(
    author?.avatar || ""
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFullName(author?.full_name || "");
    setBio(author?.bio || "");
    setEmail(author?.email || "");
    setAvatarPreview(author?.avatar || "");
    setAvatar(null);
  }, [author, open]);

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim()) return;
    const formData = new FormData();
    formData.append("full_name", fullName.trim());
    formData.append("bio", bio.trim());
    formData.append("email", email.trim());
    if (avatar) {
      formData.append("avatar", avatar);
    }
    onSubmit(formData);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{author ? "Editar autor" : "Nuevo autor"}</DialogTitle>
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
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Biografía"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            fullWidth
            multiline
            minRows={2}
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
              bgcolor: avatarPreview ? "primary.50" : "background.paper",
            }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarPreview ? (
              <img
                src={avatarPreview}
                alt="Avatar"
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
              onChange={handleAvatarChange}
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
          disabled={loading || !fullName.trim() || !email.trim()}
        >
          {author ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
