
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import StarBackground from "../components/StarBackground";
import { useProjects } from "../context/ProjectsContext";

const Index = () => {
  const { projects } = useProjects();
  const featuredProjects = projects.slice(0, 3);

  const handleWhatsApp = () => {
    const message = "Olá! Estou interessado em seus serviços de IA.";
    window.open(`https://wa.me/5511999999999?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="flex-grow flex flex-col justify-center items-center text-center px-4 py-12 md:py-24 relative">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 text-white leading-tight">
          <span className="text-nexplay-gold">Nexplay IA</span><br />
          <span>O Futuro da Inovação</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mb-8">
          Explorando o universo da inteligência artificial com soluções inovadoras para transformar sua empresa.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link to="/projetos" className="btn-primary">
            Explore Agora
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <button onClick={handleWhatsApp} className="btn-secondary">
            Fale Conosco
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-6 md:px-12 bg-nexplay-dark relative">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-nexplay-gold">Projetos Destacados</h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Conheça algumas das nossas soluções mais inovadoras em inteligência artificial e tecnologia avançada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/projetos" className="btn-primary">
              Ver Todos os Projetos
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 md:px-12 bg-nexplay-dark border-t border-gray-800">
        <div className="container mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Pronto para Transformar seu Negócio com IA?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Entre em contato agora mesmo e descubra como nossas soluções inovadoras podem impulsionar sua empresa para o futuro.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/contato" className="btn-primary">
                Entre em Contato
              </Link>
              <button onClick={handleWhatsApp} className="btn-secondary">
                Conversar no WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
