
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

  // Check if user has admin role from backend
  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error('Error checking admin role:', error);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed, event:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check admin role from backend asynchronously (outside callback)
        if (currentSession?.user) {
          setTimeout(() => {
            checkAdminRole(currentSession.user.id).then(isAdminUser => {
              setIsAdmin(isAdminUser);
              console.log('Auth state changed:', { userId: currentSession.user.id, isAdmin: isAdminUser });
            });
          }, 0);
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
      
      // Check admin role from backend
      if (currentSession?.user) {
        checkAdminRole(currentSession.user.id).then(isAdminUser => {
          setIsAdmin(isAdminUser);
          console.log('Initial session check:', { userId: currentSession.user.id, isAdmin: isAdminUser });
        });
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
