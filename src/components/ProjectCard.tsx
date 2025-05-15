
import { Link } from "react-router-dom";
import { Project, getCategoryColor } from "../models/Project";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const handleWhatsApp = () => {
    const message = `Olá! Estou interessado no projeto ${project.title}`;
    window.open(`https://wa.me/${project.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="card-project flex flex-col h-full">
      <div className="overflow-hidden h-48">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
          <span className={`badge ${getCategoryColor(project.category)} text-white`}>
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">
          {project.description}
        </p>
        
        <div className="flex justify-between mt-auto">
          <Link 
            to={`/projetos/${project.id}`} 
            className="btn-primary"
          >
            Ver detalhes
          </Link>
          
          <button 
            onClick={handleWhatsApp}
            className="btn-secondary"
          >
            Fale Conosco
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
