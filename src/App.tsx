import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from './auth/AuthLayout';
import LoginPage from './auth/pages/LoginPage';
import { PublicRoute } from "./routes/PublicRoutes";
import AdminLayout from "./admin/AdminLayout";
import { PrivateRoute } from "./routes/PrivateRoute";
import { SnackbarProvider } from "notistack";

export default function App() {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }}>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas importadas */}
          <Route element={PublicRoute.element}>
            {PublicRoute.children?.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </SnackbarProvider>
  );
}
