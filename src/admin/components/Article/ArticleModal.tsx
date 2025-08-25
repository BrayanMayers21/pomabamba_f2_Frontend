import React, { useRef } from "react";
import { getAuthors, getCategories } from "../../../api/dropdowns";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
} from "@mui/material";
import type { Article } from "../../../types/article";

interface ArticleModalProps {
  open: boolean;
  loading: boolean;
  article?: Article | null;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

export function ArticleModal({
  open,
  loading,
  article,
  onClose,
  onSubmit,
}: ArticleModalProps) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [summary, setSummary] = React.useState("");
  const [mainImage, setMainImage] = React.useState<File | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const [dragActive, setDragActive] = React.useState(false);
  const [publishDate, setPublishDate] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [authorsList, setAuthorsList] = React.useState<any[]>([]);
  const [categoriesList, setCategoriesList] = React.useState<any[]>([]);
  const [status, setStatus] = React.useState("archived");
  const [views, setViews] = React.useState(0);

  React.useEffect(() => {
    setTitle(article?.title || "");
    setContent(article?.content || "");
    setSummary(article?.summary || "");
    setPublishDate(
      article?.publish_date ? article.publish_date.slice(0, 10) : ""
    );
    setAuthor(
      article?.author && typeof article.author === "object" && article.author.id
        ? String(article.author.id)
        : ""
    );
    setCategory(
      article?.category &&
        typeof article.category === "object" &&
        article.category.id
        ? String(article.category.id)
        : ""
    );
    setStatus(article?.status || "archived");
    setViews(article?.views ?? 0);
    setMainImage(null); // No se puede cargar imagen previa, solo nueva
  }, [article, open]);

  React.useEffect(() => {
    getAuthors()
      .then((res) => setAuthorsList(res.data.results || res.data || []))
      .catch(() => setAuthorsList([]));
    getCategories()
      .then((res) => setCategoriesList(res.data.results || res.data || []))
      .catch(() => setCategoriesList([]));
  }, []);

  const handleSubmit = () => {
    if (
      !title.trim() ||
      !content.trim() ||
      !summary.trim() ||
      !publishDate ||
      !author ||
      !category ||
      !status
    )
      return;
    const formData = new FormData();
    formData.append("title", title.trim());
    formData.append("content", content.trim());
    formData.append("summary", summary.trim());
    if (mainImage) formData.append("main_image", mainImage);
    formData.append("publish_date", publishDate);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("status", status);
    formData.append("views", views.toString());
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {article ? "Editar artículo" : "Nuevo artículo"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <TextField
            label="Contenido"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            fullWidth
            multiline
            minRows={4}
            required
            disabled={loading}
          />
          <TextField
            label="Resumen"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
            required
            disabled={loading}
          />
          <Box
            ref={dropRef}
            sx={{
              border: dragActive ? "2px solid #1976d2" : "2px dashed #aaa",
              borderRadius: 2,
              p: 2,
              textAlign: "center",
              bgcolor: dragActive ? "#e3f2fd" : "inherit",
              cursor: "pointer",
              mb: 1,
            }}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setMainImage(e.dataTransfer.files[0]);
              }
            }}
            onClick={() => dropRef.current?.querySelector("input")?.click()}
          >
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setMainImage(e.target.files[0]);
                }
              }}
            />
            {mainImage ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <span>Imagen seleccionada: {mainImage.name}</span>
                <img
                  src={URL.createObjectURL(mainImage)}
                  alt="Vista previa"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 180,
                    borderRadius: 8,
                    marginTop: 8,
                  }}
                />
              </Box>
            ) : (
              <span>
                Arrastra y suelta la imagen aquí o haz clic para seleccionar
              </span>
            )}
          </Box>
          <TextField
            label="Fecha de publicación"
            type="date"
            value={publishDate}
            onChange={(e) => setPublishDate(e.target.value)}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            disabled={loading}
          />
          <TextField
            label="Autor"
            select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            fullWidth
            required
            disabled={loading}
          >
            {authorsList.map((a) => (
              <MenuItem key={a.id} value={a.id}>
                {a.name || a.full_name || a.username || a.id}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Categoría"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            required
            disabled={loading}
          >
            {categoriesList.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name || c.title || c.id}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Estado"
            select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
            disabled={loading}
          >
            <MenuItem value="archived">Archivado</MenuItem>
            <MenuItem value="published">Publicado</MenuItem>
            <MenuItem value="draft">Borrador</MenuItem>
          </TextField>
          <TextField
            label="Vistas"
            type="number"
            value={views}
            onChange={(e) => setViews(Number(e.target.value))}
            fullWidth
            required
            inputProps={{ min: 0 }}
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !title.trim() || !content.trim()}
        >
          {article ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
