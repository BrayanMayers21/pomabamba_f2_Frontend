import {

    Box,
    Typography,
    CircularProgress,
} from "@mui/material";

export const Spinner = () => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            py: 3,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
            bgcolor: "background.paper",
            gap: 2,
        }}
    >
        <CircularProgress size={24} />
        <Typography variant="body2" color="text.secondary">
            Cargando información...
        </Typography>
    </Box>
);