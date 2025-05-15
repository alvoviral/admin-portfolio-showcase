
import { useProjects } from "@/context/ProjectsContext";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { ProjectCategory } from "@/models/Project";

const AdminDashboard = () => {
  const { projects } = useProjects();
  
  const getCategoryCount = (category: ProjectCategory): number => {
    return projects.filter(project => project.category === category).length;
  };

  const categoryStats = [
    { name: ProjectCategory.SAAS, count: getCategoryCount(ProjectCategory.SAAS), color: "bg-blue-500" },
    { name: ProjectCategory.WEB_SYSTEM, count: getCategoryCount(ProjectCategory.WEB_SYSTEM), color: "bg-amber-500" },
    { name: ProjectCategory.CMS, count: getCategoryCount(ProjectCategory.CMS), color: "bg-purple-500" },
    { name: ProjectCategory.APPS, count: getCategoryCount(ProjectCategory.APPS), color: "bg-green-500" },
    { name: ProjectCategory.PHP, count: getCategoryCount(ProjectCategory.PHP), color: "bg-red-500" },
    { name: ProjectCategory.WORDPRESS, count: getCategoryCount(ProjectCategory.WORDPRESS), color: "bg-cyan-500" },
  ];
  
  const recentProjects = [...projects].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <div className="p-8">
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Dashboard</h1>
              <Link
                to="/admin/projetos/novo"
                className="px-4 py-2 bg-nexplay-gold text-nexplay-dark rounded-md font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Novo Projeto
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-medium text-white mb-2">Total de Projetos</h2>
                <p className="text-3xl font-bold text-nexplay-gold">{projects.length}</p>
              </div>
              
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-medium text-white mb-2">Projeto Mais Recente</h2>
                <p className="text-xl font-medium text-white truncate">
                  {projects.length > 0 ? projects[0].title : "Nenhum projeto"}
                </p>
              </div>
              
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-medium text-white mb-2">Categoria Mais Popular</h2>
                <p className="text-xl font-medium text-white">
                  {categoryStats.sort((a, b) => b.count - a.count)[0]?.name || "N/A"}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-medium text-white mb-4">Projetos por Categoria</h2>
                <div className="space-y-4">
                  {categoryStats.map((category) => (
                    <div key={category.name} className="flex items-center">
                      <span className="text-sm text-gray-300 w-36 truncate">{category.name}</span>
                      <div className="flex-grow h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${category.color}`} 
                          style={{ width: `${projects.length ? (category.count / projects.length) * 100 : 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-300 ml-2 w-6 text-right">{category.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-nexplay-card p-6 rounded-lg border border-gray-800">
                <h2 className="text-lg font-medium text-white mb-4">Projetos Recentes</h2>
                {recentProjects.length > 0 ? (
                  <div className="divide-y divide-gray-800">
                    {recentProjects.map((project) => (
                      <Link 
                        key={project.id} 
                        to={`/admin/projetos/editar/${project.id}`}
                        className="py-3 flex items-center justify-between hover:bg-gray-800/30 px-2 rounded"
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded overflow-hidden mr-3">
                            <img 
                              src={project.imageUrl} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-white">{project.title}</p>
                            <p className="text-sm text-gray-400">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-400">{project.category}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Nenhum projeto encontrado</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
