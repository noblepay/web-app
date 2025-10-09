import { useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from './supabase';

// Re-export the useAuth hook from SupabaseAuthProvider
export { useAuth } from '@/components/auth/SupabaseAuthProvider';

// Additional custom hooks for Supabase operations
export const useSupabase = () => {
  return supabase;
};

// Hook for checking if user is authenticated
export const useIsAuthenticated = () => {
  const { user, loading } = useAuth();
  return { isAuthenticated: !!user, loading };
};

// Hook for user profile operations
export const useProfile = () => {
  const { user } = useAuth();
  
  const getProfile = async () => {
    if (!user) return null;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
      
    return { data, error };
  };
  
  const updateProfile = async (updates: Record<string, unknown>) => {
    if (!user) return { data: null, error: new Error('No user') };
    
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
      
    return { data, error };
  };
  
  return { getProfile, updateProfile };
};