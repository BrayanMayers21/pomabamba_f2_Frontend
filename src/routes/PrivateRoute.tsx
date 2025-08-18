import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to="/login" />;
};
