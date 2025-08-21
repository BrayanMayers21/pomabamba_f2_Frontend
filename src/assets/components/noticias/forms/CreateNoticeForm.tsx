"use client";

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";
import {
  X,
  Upload,
  Plus,
  FileText,
  Calendar,
  ImageIcon,
  AlertCircle,
} from "lucide-react";
import { createNotice, getNoticeCategories, getTags } from "../hooks/apis";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { useDropzone } from "react-dropzone";

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

interface CreateNoticeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateNoticeForm: React.FC<CreateNoticeFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  // Estado para detectar tema
  const [isDark, setIsDark] = useState(false);

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [categoryId, setCategoryId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [extraImages, setExtraImages] = useState<FileList | null>(null);

  // Estados para opciones
  const [categories, setCategories] = useState<Category[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>([]);

  // Estados de control
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Detectar tema
  useEffect(() => {
    const checkTheme = () => {
      const isDarkMode =
        (document.documentElement.hasAttribute("data-toolpad-color-scheme") &&
          document.documentElement.getAttribute("data-toolpad-color-scheme") ===
            "dark") ||
        document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    // Observar cambios en el tema
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-toolpad-color-scheme", "class"],
    });

    return () => observer.disconnect();
  }, []);

  // Cargar categorías y etiquetas al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([
          getNoticeCategories(),
          getTags(),
        ]);

        setCategories(categoriesRes.data.results || categoriesRes.data || []);
        setTagsList(tagsRes.data.results || tagsRes.data || []);
      } catch (error) {
        console.error("Error cargando categorías y etiquetas:", error);
      }
    };

    loadData();
  }, []);

  // Generar slug automáticamente desde el título
  useEffect(() => {
    if (title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "") // Remover caracteres especiales
        .replace(/\s+/g, "-") // Reemplazar espacios con guiones
        .trim();
      setSlug(generatedSlug);
    }
  }, [title]);

  // Validar formulario
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = "El título es obligatorio";
    if (!slug.trim()) newErrors.slug = "El slug es obligatorio";
    if (!body.trim()) newErrors.body = "El contenido es obligatorio";
    if (!categoryId) newErrors.category = "La categoría es obligatoria";
    if (!mainImage) newErrors.mainImage = "La imagen principal es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("body", body);
      formData.append("date", date);
      formData.append("notice_category", categoryId);

      // Agregar etiquetas seleccionadas
      selectedTags.forEach((tagId) => {
        formData.append("label_ids", tagId.toString());
      });

      // Agregar imagen principal
      if (mainImage) {
        formData.append("main_image", mainImage);
      }

      // Agregar imágenes adicionales
      if (extraImages) {
        Array.from(extraImages).forEach((file) => {
          formData.append("extra_images", file);
        });
      }

      await createNotice(formData);

      // Limpiar formulario
      resetForm();

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Error al crear noticia:", error);

      // Manejar errores específicos del backend
      if (error.response?.data) {
        const backendErrors: { [key: string]: string } = {};
        Object.keys(error.response.data).forEach((key) => {
          backendErrors[key] = Array.isArray(error.response.data[key])
            ? error.response.data[key][0]
            : error.response.data[key];
        });
        setErrors(backendErrors);
      } else {
        setErrors({ general: "Error al crear la noticia. Intenta de nuevo." });
      }
    } finally {
      setLoading(false);
    }
  };

  // Resetear formulario
  const resetForm = () => {
    setTitle("");
    setSlug("");
    setBody("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategoryId("");
    setSelectedTags([]);
    setMainImage(null);
    setExtraImages(null);
    setErrors({});
  };

  // Manejar selección de etiquetas
  const handleTagToggle = (tagId: number) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // Manejar cambio de imagen principal con drag & drop
  const onDropMainImage = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setMainImage(acceptedFiles[0]);
      setErrors((prev) => ({ ...prev, mainImage: "" }));
    }
  }, []);

  const {
    getRootProps: getMainRootProps,
    getInputProps: getMainInputProps,
    isDragActive: isMainDragActive,
    isDragReject: isMainDragReject,
  } = useDropzone({
    onDrop: onDropMainImage,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  // Manejar cambio de imágenes adicionales con drag & drop
  const onDropExtraImages = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const dataTransfer = new DataTransfer();
      acceptedFiles.forEach((file) => dataTransfer.items.add(file));
      setExtraImages(dataTransfer.files);
    }
  }, []);

  const {
    getRootProps: getExtraRootProps,
    getInputProps: getExtraInputProps,
    isDragActive: isExtraDragActive,
    isDragReject: isExtraDragReject,
  } = useDropzone({
    onDrop: onDropExtraImages,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB por archivo
  });

  return (
    <div className="w-full">
      <div
        className={`min-h-screen p-4 ${isDark ? " text-white" : "bg-gray-50 text-gray-900"}`}
      >
        <Card
          className={`shadow-xl border ${isDark ? " border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}
        >
          <CardContent className="p-8 space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.general && (
                <div className="flex items-start gap-3 p-4 bg-muted border-l-4 border-destructive rounded-r-lg">
                  <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-destructive">
                      Error al crear la noticia
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {errors.general}
                    </p>
                  </div>
                </div>
              )}

              {/* Información Básica */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Información Básica
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Título */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="title"
                      className={`text-sm font-medium flex items-center gap-2 ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      <FileText
                        className={`h-4 w-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}
                      />
                      Título *
                    </Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                      }
                      placeholder="Ingresa el título de la noticia"
                      className={`transition-all duration-200 ${
                        errors.title
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : isDark
                            ? " border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />
                    {errors.title && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.title}
                      </p>
                    )}
                  </div>

                  {/* Slug */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="slug"
                      className={`text-sm font-medium ${isDark ? "text-gray-200" : "text-gray-700"}`}
                    >
                      Slug *
                    </Label>
                    <Input
                      id="slug"
                      value={slug}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSlug(e.target.value)
                      }
                      placeholder="url-de-la-noticia"
                      className={`transition-all duration-200 ${
                        errors.slug
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                          : isDark
                            ? " border-gray-600 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500/20"
                      }`}
                    />
                    {errors.slug && (
                      <p className=" text-white text-sm flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.slug}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Contenido */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Contenido
                  </h3>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="body"
                    className="text-sm font-medium text-foreground"
                  >
                    Contenido *
                  </Label>
                  <div
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-200 ${errors.body ? "border-red-500" : isDark ? "border-gray-600 hover:border-gray-400" : "border-gray-300 hover:border-gray-400"}`}
                    data-color-mode={isDark ? "dark" : "light"}
                  >
                    <MDEditor
                      value={body}
                      onChange={(val) => setBody(val || "")}
                      preview="edit"
                      hideToolbar={false}
                      height={400}
                    />
                  </div>
                  {errors.body && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <X className="h-3 w-3" />
                      {errors.body}
                    </p>
                  )}
                </div>
              </div>

              {/* Metadatos */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Metadatos
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fecha */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="date"
                      className="text-sm font-medium text-foreground flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4 text-foreground" />
                      Fecha de publicación
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDate(e.target.value)
                      }
                      className="transition-all duration-200"
                    />
                  </div>

                  {/* Categoría */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-foreground" />
                      Categoría *
                    </Label>
                    <Select value={categoryId} onValueChange={setCategoryId}>
                      <SelectTrigger
                        className={`transition-all duration-200 ${errors.category ? "border-destructive focus:border-destructive focus:ring-destructive/20" : "focus:ring-primary/20"}`}
                      >
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-destructive flex items-center gap-1">
                        <X className="h-3 w-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Etiquetas */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-foreground" />
                    Etiquetas
                  </h3>
                </div>

                <div className="border-2 border-dashed border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-200">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                    {tagsList.map((tag) => (
                      <label
                        key={tag.id}
                        className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                          selectedTags.includes(tag.id)
                            ? "bg-primary/10 border-primary text-primary-foreground"
                            : "bg-background border-border hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagToggle(tag.id)}
                          className="rounded text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm font-medium">{tag.name}</span>
                      </label>
                    ))}
                  </div>

                  {selectedTags.length > 0 && (
                    <div className="border-t border-border pt-4">
                      <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4" />
                        Etiquetas seleccionadas ({selectedTags.length}):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map((tagId) => {
                          const tag = tagsList.find((t) => t.id === tagId);
                          return tag ? (
                            <Badge
                              key={tag.id}
                              variant="secondary"
                              className="px-3 py-1 text-sm font-medium"
                            >
                              {tag.name}
                              <button
                                type="button"
                                onClick={() => handleTagToggle(tag.id)}
                                className="ml-2 hover:text-destructive transition-colors duration-200"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Imágenes */}
              <div className="space-y-6">
                <div className="border-l-4 border-primary pl-4">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-foreground" />
                    Imágenes
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Imagen principal */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Upload className="h-4 w-4 text-foreground" />
                      Imagen principal *
                    </Label>
                    <div
                      {...getMainRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        isMainDragActive
                          ? "border-primary bg-primary/10 scale-105"
                          : isMainDragReject
                            ? "border-destructive bg-destructive/10"
                            : mainImage
                              ? "border-primary bg-primary/5 hover:bg-primary/10"
                              : errors.mainImage
                                ? "border-destructive bg-destructive/5 hover:border-destructive"
                                : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <input {...getMainInputProps()} />
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={`p-4 rounded-full transition-all duration-300 ${
                            isMainDragActive
                              ? "bg-primary/20 scale-110"
                              : isMainDragReject
                                ? "bg-destructive/20"
                                : mainImage
                                  ? "bg-primary/20"
                                  : "bg-muted"
                          }`}
                        >
                          <Upload
                            className={`h-10 w-10 ${
                              isMainDragActive
                                ? "text-primary animate-bounce"
                                : isMainDragReject
                                  ? "text-destructive"
                                  : mainImage
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <p
                            className={`text-base font-semibold text-foreground`}
                          >
                            {isMainDragActive
                              ? "¡Suelta la imagen aquí!"
                              : isMainDragReject
                                ? "Archivo no válido"
                                : mainImage
                                  ? `✓ ${mainImage.name}`
                                  : "Arrastra una imagen o haz clic"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            PNG, JPG, GIF, WEBP hasta 10MB
                          </p>
                          {mainImage && (
                            <div className="flex items-center gap-2 text-sm text-foreground">
                              <span>
                                Tamaño:{" "}
                                {(mainImage.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {errors.mainImage && (
                      <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        <p className="text-sm text-destructive font-medium">
                          {errors.mainImage}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Imágenes adicionales */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Plus className="h-4 w-4 text-foreground" />
                      Imágenes adicionales (opcional)
                    </Label>
                    <div
                      {...getExtraRootProps()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                        isExtraDragActive
                          ? "border-primary bg-primary/10 scale-105"
                          : isExtraDragReject
                            ? "border-destructive bg-destructive/10"
                            : extraImages && extraImages.length > 0
                              ? "border-primary bg-primary/5 hover:bg-primary/10"
                              : "border-border bg-muted/30 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      <input {...getExtraInputProps()} />
                      <div className="flex flex-col items-center gap-4">
                        <div
                          className={`p-4 rounded-full transition-all duration-300 ${
                            isExtraDragActive
                              ? "bg-primary/20 scale-110"
                              : isExtraDragReject
                                ? "bg-destructive/20"
                                : extraImages && extraImages.length > 0
                                  ? "bg-primary/20"
                                  : "bg-muted"
                          }`}
                        >
                          <Plus
                            className={`h-10 w-10 ${
                              isExtraDragActive
                                ? "text-primary animate-bounce"
                                : isExtraDragReject
                                  ? "text-destructive"
                                  : extraImages && extraImages.length > 0
                                    ? "text-primary"
                                    : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        <div className="space-y-2">
                          <p className="text-base font-semibold text-foreground">
                            {isExtraDragActive
                              ? "¡Suelta las imágenes aquí!"
                              : isExtraDragReject
                                ? "Algunos archivos no son válidos"
                                : extraImages && extraImages.length > 0
                                  ? `✓ ${extraImages.length} imagen(es) seleccionada(s)`
                                  : "Arrastra imágenes o haz clic"}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Múltiples archivos PNG, JPG, GIF, WEBP hasta 10MB
                            cada uno
                          </p>
                          {extraImages && extraImages.length > 0 && (
                            <div className="pt-2 border-t border-border">
                              <div className="flex flex-wrap gap-2">
                                {Array.from(extraImages).map((file, index) => (
                                  <Badge
                                    key={index}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {file.name} (
                                    {(file.size / 1024 / 1024).toFixed(1)}MB)
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Botones */}
              <Separator className="my-8" />
              <div className="flex flex-col sm:flex-row gap-4 sm:justify-end pt-4">
                {onCancel && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="px-8 py-3 h-auto transition-all duration-200 font-medium"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 h-auto font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>Creando noticia...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Crear Noticia</span>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateNoticeForm;
