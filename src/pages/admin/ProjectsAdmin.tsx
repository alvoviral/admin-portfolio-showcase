
import { useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useProjects } from "@/context/ProjectsContext";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const ProjectsAdmin = () => {
  const { projects, deleteProject } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleDeleteClick = (projectId: string) => {
    setDeleteProjectId(projectId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (deleteProjectId) {
      deleteProject(deleteProjectId);
      setIsDeleteDialogOpen(false);
      setDeleteProjectId(null);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex-1">
          <div className="p-8">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-2xl font-bold text-white">Gerenciar Projetos</h1>
              <div className="flex gap-4 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Buscar projetos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded text-white flex-grow sm:flex-grow-0 sm:w-64"
                />
                <Link
                  to="/admin/projetos/novo"
                  className="px-4 py-2 bg-nexplay-gold text-nexplay-dark rounded font-medium hover:bg-yellow-500 transition-colors whitespace-nowrap flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Novo Projeto
                </Link>
              </div>
            </div>
            
            <div className="bg-nexplay-card border border-gray-800 rounded-lg overflow-hidden">
              {filteredProjects.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Projeto</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Categoria</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Data</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {filteredProjects.map((project) => (
                        <tr key={project.id} className="hover:bg-gray-800/30">
                          <td className="px-6 py-4">
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
                                <p className="text-sm text-gray-400 truncate max-w-sm">
                                  {project.description.substring(0, 60)}
                                  {project.description.length > 60 ? '...' : ''}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-300">{project.category}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-300">
                              {new Date(project.createdAt).toLocaleDateString()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <Link
                                to={`/projetos/${project.id}`}
                                className="text-blue-500 hover:text-blue-400"
                                title="Visualizar"
                                target="_blank"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              </Link>
                              <Link
                                to={`/admin/projetos/editar/${project.id}`}
                                className="text-amber-500 hover:text-amber-400"
                                title="Editar"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 20h9" />
                                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                              </Link>
                              <button
                                onClick={() => handleDeleteClick(project.id)}
                                className="text-red-500 hover:text-red-400"
                                title="Excluir"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M3 6h18" />
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                  <line x1="10" y1="11" x2="10" y2="17" />
                                  <line x1="14" y1="11" x2="14" y2="17" />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-400">Nenhum projeto encontrado</p>
                  <Link
                    to="/admin/projetos/novo"
                    className="mt-4 inline-block px-4 py-2 bg-nexplay-gold text-nexplay-dark rounded font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Adicionar Projeto
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-nexplay-card border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-white">Confirmar exclusão</DialogTitle>
          </DialogHeader>
          <p className="text-gray-300">
            Tem certeza que deseja excluir este projeto? Esta ação não pode ser desfeita.
          </p>
          <DialogFooter>
            <button
              onClick={() => setIsDeleteDialogOpen(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors ml-2"
            >
              Excluir
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default ProjectsAdmin;
