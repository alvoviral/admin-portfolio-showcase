
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import StarBackground from "../components/StarBackground";
import { useProjects } from "../context/ProjectsContext";
import { ProjectCategory, projectCategories } from "../models/Project";

const ProjectsPage = () => {
  const { projects, loading } = useProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar />

      <main className="flex-grow py-16 px-6 md:px-12">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-nexplay-gold">Nossos Projetos</h1>
          <p className="text-gray-300 mb-8 max-w-2xl">
            Explore nossa coleção de projetos inovadores em inteligência artificial e tecnologia avançada.
          </p>

          <div className="mb-8 flex flex-col md:flex-row justify-between gap-4">
            <div className="flex overflow-x-auto pb-4 md:pb-0 gap-2">
              <button
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === "all" 
                  ? "bg-nexplay-gold text-nexplay-dark" 
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory("all")}
              >
                Todos
              </button>

              {projectCategories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                    selectedCategory === category 
                    ? "bg-nexplay-gold text-nexplay-dark" 
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <p className="text-xl text-gray-400">Carregando projetos...</p>
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">Nenhum projeto encontrado.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
