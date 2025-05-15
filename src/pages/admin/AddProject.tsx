
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ProjectForm from "@/components/ProjectForm";

const AddProject = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Adicionar Projeto</h1>
            <ProjectForm />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AddProject;
