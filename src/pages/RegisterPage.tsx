
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

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Senhas não correspondem",
        description: "Por favor, verifique se as senhas digitadas são iguais.",
      });
      return;
    }
    
    setLoading(true);

    try {
      console.log('Tentando registrar com:', { email });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (error) {
        console.error('Erro no registro:', error.message);
        toast({
          variant: "destructive",
          title: "Erro no registro",
          description: error.message,
        });
        return;
      }

      console.log('Registro bem-sucedido:', data);
      toast({
        title: "Registro realizado com sucesso",
        description: "Você será redirecionado para a página de login.",
      });
      
      // Redirect to login page
      navigate("/login");
    } catch (error) {
      console.error("Erro durante o registro:", error);
      toast({
        variant: "destructive",
        title: "Erro inesperado",
        description: "Ocorreu um erro durante o registro. Tente novamente mais tarde.",
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
          <h1 className="text-2xl font-bold text-nexplay-gold mb-6 text-center">Registro</h1>

          <form onSubmit={handleRegister} className="space-y-6">
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
                minLength={6}
                className="bg-nexplay-dark border-nexplay-gold/30 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              {loading ? "Registrando..." : "Registrar"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-nexplay-gold hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterPage;
