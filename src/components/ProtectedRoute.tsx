
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading, isAdmin } = useAuth();
  
  console.log('ProtectedRoute check:', { user: !!user, isAdmin, loading });
  
  // Show loading or placeholder while checking authentication
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Carregando...</div>;
  }
  
  // Redirect if user is not authenticated or not an admin
  if (!user || !isAdmin) {
    console.log('Access denied: User is not admin or not authenticated');
    return <Navigate to="/login" replace />;
  }
  
  // If user is authenticated and is admin, render the outlet (child route components)
  console.log('Access granted: User is authenticated and is admin');
  return <Outlet />;
};

export default ProtectedRoute;
