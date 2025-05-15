
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import StarBackground from "../components/StarBackground";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  // Redirecionar se o usuário já estiver logado
  if (user) {
    console.log("Usuário já está logado, redirecionando...", { isAdmin });
    if (isAdmin) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Tentando fazer login com:', { email });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erro de login:', error.message);
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: error.message,
        });
        setLoading(false);
        return;
      }

      console.log('Login bem-sucedido:', data);

      // A lógica de redirecionamento foi movida para o useEffect que monitora o estado de autenticação
      // O redirecionamento será feito automaticamente pelo componente quando o estado de autenticação mudar
      toast({
        title: "Login realizado com sucesso",
        description: "Você será redirecionado em instantes.",
      });
      
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro durante o login. Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <StarBackground />
      <Navbar />

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-nexplay-card p-8 rounded-lg shadow-lg border border-nexplay-gold/30">
          <h1 className="text-2xl font-bold text-nexplay-gold mb-6 text-center">Login</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="bg-nexplay-dark border-nexplay-gold/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-nexplay-dark border-nexplay-gold/30 text-white"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-nexplay-gold hover:bg-nexplay-gold/80 text-nexplay-dark"
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Ainda não tem uma conta?{" "}
              <Link to="/registro" className="text-nexplay-gold hover:underline">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;
