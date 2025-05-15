
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading, isAdmin } = useAuth();
  
  // Show loading or placeholder while checking authentication
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }
  
  // Redirect if user is not authenticated or not an admin
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated and is admin, render the outlet (child route components)
  return <Outlet />;
};

export default ProtectedRoute;
