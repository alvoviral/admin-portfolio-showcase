
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();
  
  // Show loading or placeholder while checking authentication
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }
  
  // Redirect if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated, render the outlet (child route components)
  return <Outlet />;
};

export default ProtectedRoute;
