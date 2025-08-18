// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = useAuthStore((state) => state.login);
  const error = useAuthStore((state) => state.error);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/admin/");
    } catch {
      // error ya está en el store
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 12, p: 4, borderRadius: 3 }}>
        {/* Logo */}
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            src="src/assets/images/logo.svg"
            alt="Logo"
            style={{ height: "80px", objectFit: "contain" }}
          />
        </Box>

        <Typography
          variant="body1"
          textAlign="center"
          color="text.secondary"
          mb={4}
        >
          Por favor, ingresa tus credenciales para continuar con el inicio de sesión.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <TextField
            id="email"
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            fullWidth
            margin="normal"
          />

          {/* Password */}
          <TextField
            id="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Error */}
          {error && (
            <Typography
              color="error"
              variant="body2"
              fontWeight="bold"
              mt={1}
            >
              {error}
            </Typography>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Ingresar
          </Button>
        </form>

        {/* Links */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="body2">
            <Link to="/" style={{ color: "#1976d2", textDecoration: "none" }}>
              ← Volver al inicio
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link to="/olvide-contrasenia" style={{ color: "#1976d2", textDecoration: "none" }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </Typography>
        </Box>

      </Paper>
    </Container>
  );
}
