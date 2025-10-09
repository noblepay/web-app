import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcdqrejjeybcoquhrmen.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZHFyZWpqZXliY29xdWhybWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NzQzOTcsImV4cCI6MjA3MTI1MDM5N30.RoRMQ1MPMCgFvgzgoLqTa7WVEh0LClx_hQzfVI-Gazk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Get the current origin for redirect URLs
export const getRedirectURL = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:5173'; // fallback for development
};