
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProjectForm from "@/components/ProjectForm";
import { useProjects } from "@/context/ProjectsContext";
import { Project } from "@/models/Project";
import { toast } from "sonner";

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [project, setProject] = useState<Project | undefined>();
  
  useEffect(() => {
    if (!id) {
      navigate("/admin/projetos");
      return;
    }
    
    const foundProject = projects.find(p => p.id === id);
    if (!foundProject) {
      toast.error("Projeto não encontrado");
      navigate("/admin/projetos");
      return;
    }
    
    setProject(foundProject);
  }, [id, projects, navigate]);
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Editar Projeto</h1>
            {project && <ProjectForm project={project} isEditing={true} />}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EditProject;
