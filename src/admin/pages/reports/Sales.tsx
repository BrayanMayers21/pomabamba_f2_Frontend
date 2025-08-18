import { Box, Typography } from '@mui/material';

export default function Sales() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Panel de Ejemplo de salarios
      </Typography>

      <Typography variant="body1" gutterBottom color="text.secondary">
        Aquí puedes ver un resumen general de la plataforma.
      </Typography>
    </Box>
  );
}
