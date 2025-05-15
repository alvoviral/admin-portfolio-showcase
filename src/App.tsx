
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProjectsProvider } from "./context/ProjectsContext";

// Public Pages
import Index from "./pages/Index";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import ContactPage from "./pages/ContactPage";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectsAdmin from "./pages/admin/ProjectsAdmin";
import AddProject from "./pages/admin/AddProject";
import EditProject from "./pages/admin/EditProject";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ProjectsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/projetos" element={<ProjectsPage />} />
            <Route path="/projetos/:id" element={<ProjectDetail />} />
            <Route path="/contato" element={<ContactPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/projetos" element={<ProjectsAdmin />} />
            <Route path="/admin/projetos/novo" element={<AddProject />} />
            <Route path="/admin/projetos/editar/:id" element={<EditProject />} />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ProjectsProvider>
  </QueryClientProvider>
);

export default App;
