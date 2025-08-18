import { useEffect, useState } from "react";
import { Box, Button, Typography, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { getNotices } from "../../../api/notices";
import { Spinner } from "../../components/Spinner";
import { NoticeTable } from "../../components/Notice/NoticeTable";
import type { Notice } from "../../../types/notice";

export default function NoticesPage() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const { data } = await getNotices();
      setNotices(data.data);
    } catch (error) {
      console.error("Error al cargar noticias", error);
      enqueueSnackbar("Error al cargar noticias", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          mb: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { sm: "space-between" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Gestión de noticias
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          fullWidth
          sx={{ width: { xs: "100%", sm: "auto" } }}
          onClick={() => navigate("/admin/notices/create-notice")}
        >
          Nueva Noticia
        </Button>
      </Box>

      <Divider sx={{ my: 3 }} />

      {loading ? (
        <Spinner />
      ) : (
        <NoticeTable
          notices={notices}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(newPage) => setPage(newPage)}
          onRowsPerPageChange={(newRows) => setRowsPerPage(newRows)}
          onEdit={() => {}} // ← función vacía
          onDelete={() => {}}
          searchText={searchText}
          onSearchTextChange={setSearchText}
        />
      )}
    </Box>
  );
}
