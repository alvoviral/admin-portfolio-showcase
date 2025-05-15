
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Obrigado por se inscrever!");
    setEmail("");
  };

  return (
    <footer className="bg-nexplay-dark border-t border-gray-800 py-12 px-6 md:px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <Link to="/" className="flex items-center mb-4">
            <span className="text-2xl font-bold text-nexplay-gold">Nexplay IA</span>
          </Link>
          <p className="text-gray-400 mb-4">
            O futuro da inovação com tecnologia de ponta e soluções inteligentes para um mundo em transformação.
          </p>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Nexplay IA. Todos os direitos reservados.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Navegação</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-nexplay-gold transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/sobre" className="text-gray-400 hover:text-nexplay-gold transition-colors">Sobre</Link>
            </li>
            <li>
              <Link to="/projetos" className="text-gray-400 hover:text-nexplay-gold transition-colors">Projetos</Link>
            </li>
            <li>
              <Link to="/contato" className="text-gray-400 hover:text-nexplay-gold transition-colors">Contato</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-4">Newsletter</h3>
          <p className="text-gray-400 mb-4">Fique por dentro das nossas novidades</p>
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu email"
              className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded flex-grow"
              required
            />
            <button
              type="submit"
              className="bg-nexplay-gold text-nexplay-dark px-4 py-2 rounded font-medium"
            >
              Enviar
            </button>
          </form>
          <div className="mt-6 flex space-x-6">
            <Link to="/termos" className="text-gray-400 text-sm hover:text-nexplay-gold transition-colors">
              Termos de Uso
            </Link>
            <Link to="/privacidade" className="text-gray-400 text-sm hover:text-nexplay-gold transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
