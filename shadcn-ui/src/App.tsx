import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SupabaseAuthProvider } from '@/components/auth/SupabaseAuthProvider';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Remittance from '@/pages/Remittance';
import MobileRecharge from '@/pages/MobileRecharge';
import BillPayment from '@/pages/BillPayment';
import AuthCallback from '@/pages/AuthCallback';

function App() {
  return (
    <Router>
      <SupabaseAuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/remittance" 
            element={
              <ProtectedRoute>
                <Remittance />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mobile-recharge" 
            element={
              <ProtectedRoute>
                <MobileRecharge />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bill-payment" 
            element={
              <ProtectedRoute>
                <BillPayment />
              </ProtectedRoute>
            } 
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </SupabaseAuthProvider>
    </Router>
  );
}

export default App;