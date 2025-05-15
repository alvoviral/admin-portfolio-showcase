
import { useState, useEffect } from "react";
import { Project, ProjectCategory, projectCategories } from "../models/Project";
import { useProjects } from "../context/ProjectsContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ProjectFormProps {
  project?: Project;
  isEditing?: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, isEditing = false }) => {
  const { addProject, editProject } = useProjects();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ProjectCategory.SAAS,
    imageUrl: "",
    projectUrl: "",
    whatsappNumber: ""
  });

  useEffect(() => {
    if (isEditing && project) {
      setFormData({
        title: project.title,
        description: project.description,
        category: project.category,
        imageUrl: project.imageUrl,
        projectUrl: project.projectUrl,
        whatsappNumber: project.whatsappNumber
      });
    }
  }, [isEditing, project]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title.trim()) {
      toast.error("O título é obrigatório");
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error("A descrição é obrigatória");
      return;
    }
    
    if (!formData.imageUrl.trim()) {
      toast.error("A URL da imagem é obrigatória");
      return;
    }
    
    try {
      new URL(formData.imageUrl);
    } catch {
      toast.error("A URL da imagem é inválida");
      return;
    }
    
    if (!formData.projectUrl.trim()) {
      toast.error("A URL do projeto é obrigatória");
      return;
    }
    
    try {
      new URL(formData.projectUrl);
    } catch {
      toast.error("A URL do projeto é inválida");
      return;
    }
    
    if (!formData.whatsappNumber.trim()) {
      toast.error("O número do WhatsApp é obrigatório");
      return;
    }
    
    if (isEditing && project) {
      editProject({
        ...project,
        ...formData
      });
    } else {
      addProject(formData);
    }
    
    navigate("/admin/projetos");
  };

  const handleCancel = () => {
    navigate("/admin/projetos");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-white">
            Título
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="Nome do projeto"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="text-white">
            Categoria
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          >
            {projectCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-white">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          placeholder="Descrição detalhada do projeto"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-white">
            URL da Imagem
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="projectUrl" className="text-white">
            URL do Projeto
          </label>
          <input
            type="url"
            id="projectUrl"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleChange}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
            placeholder="https://exemplo.com/projeto"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="whatsappNumber" className="text-white">
          Número do WhatsApp (com código do país)
        </label>
        <input
          type="text"
          id="whatsappNumber"
          name="whatsappNumber"
          value={formData.whatsappNumber}
          onChange={handleChange}
          className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-white"
          placeholder="5511999999999"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-nexplay-gold text-nexplay-dark rounded hover:bg-yellow-500"
        >
          {isEditing ? "Atualizar" : "Adicionar"} Projeto
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
