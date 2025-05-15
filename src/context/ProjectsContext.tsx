
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Project, ProjectCategory } from "../models/Project";
import { v4 as uuidv4 } from 'uuid';
import { toast } from "sonner";

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  deleteProject: (id: string) => void;
  editProject: (project: Project) => void;
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

// Sample projects data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Projeto Andromeda",
    description: "Uma revolução em inteligência artificial com processamento de linguagem natural avançado e integração com sistemas existentes.",
    category: ProjectCategory.SAAS,
    imageUrl: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=1374&auto=format&fit=crop",
    projectUrl: "https://example.com/andromeda",
    whatsappNumber: "5511999999999",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Sistema Nebula",
    description: "Plataforma completa para gerenciamento de dados e análise preditiva com interface intuitiva e dashboards personalizáveis.",
    category: ProjectCategory.WEB_SYSTEM,
    imageUrl: "https://images.unsplash.com/photo-1517976547714-720226b864c1?q=80&w=1470&auto=format&fit=crop",
    projectUrl: "https://example.com/nebula",
    whatsappNumber: "5511999999999",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Quantum Vision",
    description: "Tecnologia de reconhecimento visual avançado com aplicações em segurança, varejo e medicina, utilizando redes neurais profundas.",
    category: ProjectCategory.APPS,
    imageUrl: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?q=80&w=1471&auto=format&fit=crop",
    projectUrl: "https://example.com/quantum",
    whatsappNumber: "5511999999999",
    createdAt: new Date().toISOString()
  }
];

export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const [projects, setProjects] = useState<Project[]>(() => {
    const savedProjects = localStorage.getItem('projects');
    return savedProjects ? JSON.parse(savedProjects) : sampleProjects;
  });

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt'>) => {
    const newProject: Project = {
      ...projectData,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    setProjects((prev) => [newProject, ...prev]);
    toast.success("Projeto adicionado com sucesso!");
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((project) => project.id !== id));
    toast.success("Projeto removido com sucesso!");
  };

  const editProject = (updatedProject: Project) => {
    setProjects((prev) =>
      prev.map((project) => 
        project.id === updatedProject.id ? updatedProject : project
      )
    );
    toast.success("Projeto atualizado com sucesso!");
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject, editProject }}>
      {children}
    </ProjectsContext.Provider>
  );
};
