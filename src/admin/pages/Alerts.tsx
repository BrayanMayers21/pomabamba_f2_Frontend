import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {
  Add as AddIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import type { Alert } from "../../types/alert";
// import { AlertTable } from "../../components/AlertTable";
// import { AlertModal } from "../../components/AlertModal";
import {
  getAlerts,
  deleteAlert,
  toggleAlertStatus,
  createAlert,
  updateAlert,
} from "../../api/alerts";
import { useSnackbar } from "notistack";
import { AlertTable } from "../components/Alert/AlertTable";
import { AlertModal } from "../components/Alert/AlertModal";

export default function AlertsPage() {
  const { enqueueSnackbar } = useSnackbar();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<Alert["type"]>("info");
  const [duration, setDuration] = useState<number>(0);
  const [endDate, setEndDate] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [active, setActive] = useState(true);

  const [rawData, setRawData] = useState<any>(null);
  const fetchAlerts = async () => {
    try {
      setSearchLoading(true);
      const response = await getAlerts();
      const { data } = response;
      setRawData(data); // Guardar la respuesta cruda para depuración visual
      let rawAlerts: any[] = [];
      if (Array.isArray(data)) {
        rawAlerts = data;
      } else if (
        data &&
        typeof data === "object" &&
        "results" in data &&
        Array.isArray((data as any).results)
      ) {
        rawAlerts = (data as any).results;
      }
      // Adaptar campo active → is_active si es necesario
      const alertsAdapted = rawAlerts.map((a) => ({
        ...a,
        is_active: typeof a.is_active !== "undefined" ? a.is_active : a.active,
      }));
      let filtered = alertsAdapted;
      // Filtrar por búsqueda
      if (searchText.trim()) {
        filtered = filtered.filter(
          (alert) =>
            alert.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            alert.message?.toLowerCase().includes(searchText.toLowerCase())
        );
      }
      const total = filtered.length;
      setTotalCount(total);
      // Paginar localmente
      let start = page * rowsPerPage;
      let end = start + rowsPerPage;
      // Si la página actual queda vacía y no es la primera, retrocede una página
      if (start >= total && page > 0) {
        setPage(page - 1);
        return;
      }
      setAlerts(filtered.slice(start, end));
    } catch (error) {
      enqueueSnackbar("Error al cargar las alertas", { variant: "error" });
      setAlerts([]);
      setTotalCount(0);
      setRawData(null);
    } finally {
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id);
      enqueueSnackbar("Alerta eliminada correctamente", { variant: "success" });
      fetchAlerts();
    } catch (error) {
      enqueueSnackbar("Error al eliminar la alerta", { variant: "error" });
    }
  };

  const handleToggleStatus = async (id: number, isActive: boolean) => {
    try {
      await toggleAlertStatus(id, isActive);
      enqueueSnackbar(
        `Alerta ${isActive ? "activada" : "desactivada"} correctamente`,
        { variant: "success" }
      );
      fetchAlerts();
    } catch (error) {
      enqueueSnackbar("Error al cambiar el estado de la alerta", {
        variant: "error",
      });
    }
  };

  // Abrir modal para nueva alerta
  const handleOpenModal = () => {
    setSelectedAlert(null);
    setTitle("");
    setMessage("");
    setType("info");
    setDuration(0);
    setEndDate("");
    setImageUrl("");
    setLinkUrl("");
    setActive(true);
    setOpenModal(true);
  };

  // Abrir modal para editar alerta
  const handleEditModal = (alert: Alert) => {
    setSelectedAlert(alert);
    setTitle(alert.title || "");
    setMessage(alert.message || "");
    setType(alert.type || "info");
    setDuration(alert.duration || 0);
    setEndDate(alert.end_date || "");
    setImageUrl(alert.image_url || "");
    setLinkUrl(alert.link_url || "");
    setActive(alert.is_active ?? true);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setTitle("");
    setMessage("");
    setType("info");
    setDuration(0);
    setEndDate("");
    setImageUrl("");
    setLinkUrl("");
    setActive(true);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !message.trim()) {
      enqueueSnackbar("El título y mensaje son obligatorios", {
        variant: "error",
      });
      return;
    }

    setModalLoading(true);
    try {
      const alertData = {
        title: title.trim(),
        message: message.trim(),
        type,
        duration,
        active,
        end_date: endDate,
        image_url: imageUrl,
        link_url: linkUrl,
        is_active: active,
        priority: "low" as "low" | "medium" | "high" | "critical",
      };

      if (selectedAlert) {
        await updateAlert(selectedAlert.id, alertData);
        enqueueSnackbar("Alerta actualizada correctamente", {
          variant: "success",
        });
      } else {
        await createAlert(alertData);
        enqueueSnackbar("Alerta creada correctamente", { variant: "success" });
      }
      handleCloseModal();
      fetchAlerts();
    } catch (error) {
      console.error(
        selectedAlert
          ? "Error al actualizar alerta:"
          : "Error al crear alerta:",
        error
      );
      enqueueSnackbar(
        selectedAlert
          ? "Error al actualizar la alerta"
          : "Error al crear la alerta",
        { variant: "error" }
      );
    } finally {
      setModalLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, [page, rowsPerPage, searchText]);
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newRows: number) => {
    setRowsPerPage(newRows);
    setPage(0);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    setPage(0);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "info":
        return "info";
      case "warning":
        return "warning";
      case "error":
        return "error";
      case "success":
        return "success";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "default";
      case "medium":
        return "primary";
      case "high":
        return "warning";
      case "critical":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography>Cargando alertas...</Typography>
      </Box>
    );
  }

  // Validación adicional de seguridad
  const safeAlerts = Array.isArray(alerts) ? alerts : [];

  // Log visual para depuración
  const debugCount = safeAlerts.length;

  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <NotificationsIcon sx={{ fontSize: 40, color: "primary.main" }} />
        <Box>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Gestión de Alertas
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Administra las alertas y notificaciones del sistema
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ mb: 2 }}
        onClick={handleOpenModal}
      >
        Nueva Alerta
      </Button>

      <AlertTable
        alerts={safeAlerts}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        searchText={searchText}
        searchLoading={searchLoading}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        onEdit={handleEditModal}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onSearch={handleSearch}
      />

      <AlertModal
        open={openModal}
        loading={modalLoading}
        title={title}
        setTitle={setTitle}
        message={message}
        setMessage={setMessage}
        type={type}
        setType={setType}
        duration={duration}
        setDuration={setDuration}
        endDate={endDate}
        setEndDate={setEndDate}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
        active={active}
        setActive={setActive}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
