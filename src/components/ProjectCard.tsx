
import { Link } from "react-router-dom";
import { Project, getCategoryColor } from "../models/Project";
import { useState } from "react";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [showEmbed, setShowEmbed] = useState(false);

  const handleWhatsApp = () => {
    const message = `Olá! Estou interessado no projeto ${project.title}`;
    window.open(`https://wa.me/5511963425087?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewOnPlatform = () => {
    setShowEmbed(true);
  };

  const handleCloseEmbed = () => {
    setShowEmbed(false);
  };

  if (showEmbed) {
    return (
      <div className="fixed inset-0 z-50 bg-nexplay-dark flex flex-col">
        <div className="bg-nexplay-card p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{project.title}</h2>
          <button 
            onClick={handleCloseEmbed}
            className="text-white hover:text-nexplay-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div className="flex-grow">
          <iframe 
            src={project.projectUrl} 
            className="w-full h-full border-none"
            title={project.title}
            sandbox="allow-scripts allow-same-origin allow-forms"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

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
        
        <div className="flex justify-center mb-4">
          <button
            onClick={handleViewOnPlatform}
            className="btn-primary"
          >
            Visualizar na Plataforma
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
              <line x1="8" y1="21" x2="16" y2="21"/>
              <line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          </button>
        </div>
        
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
