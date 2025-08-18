import { Box, Paper, Typography, Divider } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Panel de Administración
      </Typography>

      <Typography variant="body1" gutterBottom color="text.secondary">
        Aquí puedes ver un resumen general de la plataforma.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* Sección inferior */}
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Información
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Este es un ejemplo de tarjeta que puedes personalizar para mostrar información relevante.
        </Typography>
      </Paper>
    </Box>
  );
}
