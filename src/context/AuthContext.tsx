
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean; // Added admin status check
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  isAdmin: false, // Default value
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para verificar se o usuário é um administrador
  const checkIfAdmin = (email: string | undefined) => {
    const adminEmail = 'admin@nexplay.com.br';
    const isUserAdmin = email === adminEmail;
    console.log('Verificando admin:', { email, adminEmail, isAdmin: isUserAdmin });
    return isUserAdmin;
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed, event:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check if the user is an admin based on email
        if (currentSession?.user) {
          const userEmail = currentSession.user.email;
          // Check if the email matches the admin email
          const adminStatus = checkIfAdmin(userEmail);
          setIsAdmin(adminStatus);
          console.log('Auth state changed:', { userEmail, isAdmin: adminStatus });
        } else {
          setIsAdmin(false);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Initial session check, session exists:', !!currentSession);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Check if the user is an admin based on email
      if (currentSession?.user) {
        const userEmail = currentSession.user.email;
        // Check if the email matches the admin email
        const adminStatus = checkIfAdmin(userEmail);
        setIsAdmin(adminStatus);
        console.log('Initial session check:', { userEmail, isAdmin: adminStatus });
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    console.log('Signing out user');
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
