import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import CreateNoticeForm from "../../../assets/components/noticias/forms/CreateNoticeForm";

export const CreateNoticePageV2 = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    // Redirigir a la lista de noticias después del éxito
    navigate("/admin/notices/list");
  };

  const handleCancel = () => {
    // Redirigir a la lista de noticias si cancela
    navigate("/admin/notices/list");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Crear Nueva Noticia
      </Typography>

      <CreateNoticeForm onSuccess={handleSuccess} onCancel={handleCancel} />
    </Box>
  );
};

export default CreateNoticePageV2;
