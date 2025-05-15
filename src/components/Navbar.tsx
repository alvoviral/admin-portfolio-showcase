
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="w-full py-4 px-6 md:px-12">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-nexplay-gold">Nexplay IA</span>
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="text-white hover:text-nexplay-gold transition-all">Home</Link>
          <Link to="/sobre" className="text-white hover:text-nexplay-gold transition-all">Sobre</Link>
          <Link to="/projetos" className="text-white hover:text-nexplay-gold transition-all">Projetos</Link>
          <Link to="/contato" className="text-white hover:text-nexplay-gold transition-all">Contato</Link>
        </div>
        
        {user ? (
          <div className="flex items-center gap-4">
            <Link to="/admin" className="bg-transparent hover:bg-nexplay-gold text-nexplay-gold hover:text-nexplay-dark border border-nexplay-gold py-2 px-4 rounded transition-colors">
              Admin
            </Link>
            <Button 
              variant="outline" 
              onClick={signOut}
              className="border-red-500 text-red-500 hover:bg-red-500/10"
            >
              Sair
            </Button>
          </div>
        ) : (
          <Link to="/login" className="bg-transparent hover:bg-nexplay-gold text-nexplay-gold hover:text-nexplay-dark border border-nexplay-gold py-2 px-4 rounded transition-colors">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
