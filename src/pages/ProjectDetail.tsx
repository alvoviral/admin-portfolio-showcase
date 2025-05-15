
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarBackground from "../components/StarBackground";
import { useProjects } from "../context/ProjectsContext";
import { getCategoryColor } from "../models/Project";
import { toast } from "sonner";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const [project, setProject] = useState(projects.find(p => p.id === id));
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/projetos");
      return;
    }

    const foundProject = projects.find(p => p.id === id);
    if (!foundProject) {
      toast.error("Projeto não encontrado");
      navigate("/projetos");
      return;
    }

    setProject(foundProject);
  }, [id, projects, navigate]);

  if (!project) {
    return null;
  }

  const handleWhatsApp = () => {
    const message = `Olá! Estou interessado no projeto ${project.title}`;
    window.open(`https://wa.me/5511963425087?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleViewProject = () => {
    window.open(project.projectUrl, '_blank');
  };

  const handleCloseEmbed = () => {
    setShowEmbed(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar />

      {showEmbed ? (
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
      ) : (
        <main className="flex-grow py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="mb-6">
              <Link to="/projetos" className="text-nexplay-gold hover:underline flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Voltar para Projetos
              </Link>
            </div>

            <div className="bg-nexplay-card border border-gray-800 rounded-lg overflow-hidden">
              <div className="h-80 w-full">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{project.title}</h1>
                  <span className={`badge ${getCategoryColor(project.category)} text-white`}>
                    {project.category}
                  </span>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-nexplay-gold mb-2">Descrição</h2>
                    <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 pt-6">
                    <button
                      onClick={handleViewProject}
                      className="btn-primary flex-1"
                    >
                      Ver Projeto
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </button>
                    <button
                      onClick={handleWhatsApp}
                      className="btn-secondary flex-1"
                    >
                      Fale Conosco
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {!showEmbed && <Footer />}
    </div>
  );
};

export default ProjectDetail;
