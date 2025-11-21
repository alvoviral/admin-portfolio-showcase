
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Project } from "../models/Project";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  editProject: (project: Project) => Promise<void>;
  loading: boolean;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
};

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch projects from backend on mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // Map database fields to Project model (snake_case to camelCase)
        const mappedProjects: Project[] = (data || []).map(proj => ({
          id: proj.id,
          title: proj.title,
          description: proj.description,
          category: proj.category as any,
          imageUrl: proj.image_url,
          projectUrl: proj.project_url,
          whatsappNumber: proj.whatsapp_number,
          createdAt: proj.created_at
        }));

        setProjects(mappedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error("Erro ao carregar projetos");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    try {
      // Map camelCase to snake_case for database
      const { data, error } = await supabase
        .from('projects')
        .insert({
          title: projectData.title,
          description: projectData.description,
          category: projectData.category,
          image_url: projectData.imageUrl,
          project_url: projectData.projectUrl,
          whatsapp_number: projectData.whatsappNumber
        })
        .select()
        .single();

      if (error) throw error;

      // Map back to Project model
      const newProject: Project = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category as any,
        imageUrl: data.image_url,
        projectUrl: data.project_url,
        whatsappNumber: data.whatsapp_number,
        createdAt: data.created_at
      };

      setProjects((prev) => [newProject, ...prev]);
      toast.success("Projeto adicionado com sucesso!");
    } catch (error: any) {
      console.error('Error adding project:', error);
      toast.error(error.message || "Erro ao adicionar projeto");
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setProjects((prev) => prev.filter((project) => project.id !== id));
      toast.success("Projeto removido com sucesso!");
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast.error(error.message || "Erro ao remover projeto");
    }
  };

  const editProject = async (updatedProject: Project) => {
    try {
      const { error } = await supabase
        .from('projects')
        .update({
          title: updatedProject.title,
          description: updatedProject.description,
          category: updatedProject.category,
          image_url: updatedProject.imageUrl,
          project_url: updatedProject.projectUrl,
          whatsapp_number: updatedProject.whatsappNumber
        })
        .eq('id', updatedProject.id);

      if (error) throw error;

      setProjects((prev) =>
        prev.map((project) => 
          project.id === updatedProject.id ? updatedProject : project
        )
      );
      toast.success("Projeto atualizado com sucesso!");
    } catch (error: any) {
      console.error('Error updating project:', error);
      toast.error(error.message || "Erro ao atualizar projeto");
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject, editProject, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
};
