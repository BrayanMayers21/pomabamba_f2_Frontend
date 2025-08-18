import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import dayjs from "dayjs";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import { getNoticeCategories, getTags, createNotice } from "../../../api/notices";
import type { NoticeCategory } from "../../../types/noticeCategory";
import type { Tag } from "../../../types/tag";

export const CreateNoticePage = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [noticeCategoryId, setNoticeCategoryId] = useState<number | "">("");
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [extraImages, setExtraImages] = useState<FileList | null>(null);

  const [categories, setCategories] = useState<NoticeCategory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    getNoticeCategories().then((res) => setCategories(res.data));
    getTags().then((res) => setTags(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mainImage) {
      enqueueSnackbar("La imagen principal es obligatoria", { variant: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("body", body);
    formData.append("date", date);
    formData.append("notice_category_id", String(noticeCategoryId));
    tagIds.forEach((id) => formData.append("tag_ids", String(id)));
    formData.append("main_image", mainImage);
    if (extraImages) {
      Array.from(extraImages).forEach((file) => {
        formData.append("extra_images", file);
      });
    }

    try {
      await createNotice(formData);
      enqueueSnackbar("Noticia creada correctamente", { variant: "success" });

      // Limpiar formulario
      setTitle("");
      setSlug("");
      setBody("");
      setDate(dayjs().format("YYYY-MM-DD"));
      setNoticeCategoryId("");
      setTagIds([]);
      setMainImage(null);
      setExtraImages(null);
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.detail || "Error al crear la noticia", {
        variant: "error",
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Crear nueva noticia
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel sx={{ mb: 1 }}>Cuerpo</InputLabel>
            <ReactQuill
              theme="snow"
              value={body}
              onChange={setBody}
              style={{ height: 200, marginBottom: "3rem" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              type="date"
              label="Fecha"
              InputLabelProps={{ shrink: true }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth required>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={noticeCategoryId}
                onChange={(e) => setNoticeCategoryId(Number(e.target.value))}
                label="Categoría"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Etiquetas</InputLabel>
              <Select
                multiple
                value={tagIds}
                onChange={(e) => setTagIds(e.target.value as number[])}
                input={<OutlinedInput label="Etiquetas" />}
                renderValue={(selected) =>
                  tags
                    .filter((tag) => selected.includes(tag.id))
                    .map((tag) => tag.name)
                    .join(", ")
                }
              >
                {tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.id}>
                    <Checkbox checked={tagIds.includes(tag.id)} />
                    <ListItemText primary={tag.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel>Imagen principal</InputLabel>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setMainImage(e.target.files?.[0] || null)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InputLabel>Imágenes adicionales</InputLabel>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setExtraImages(e.target.files)}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" variant="contained">
              Crear noticia
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>

  );
};
