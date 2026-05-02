import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Sidebar from './components/Sidebar';
import TopAppBar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AuditorDashboard from './pages/AuditorDashboard';
import PublicDashboard from './pages/PublicDashboard';

const DashboardLayout = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="bg-background text-on-background font-body-base antialiased min-h-screen flex">
      <Sidebar />
      <main className="flex-1 md:ml-72 flex flex-col min-h-screen relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-primary-container/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-secondary-container/10 blur-[100px] rounded-full pointer-events-none" />

        {/* TopAppBar */}
        <TopAppBar />

        {/* Content */}
        <div className="flex-1 p-8 lg:p-12 z-10">
          {user.role === 'admin' && <AdminDashboard />}
          {user.role === 'auditor' && <AuditorDashboard />}
          {user.role === 'public' && <PublicDashboard />}
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center justify-center gap-6 px-8 py-12 border-t border-white/5 bg-slate-950 z-20 relative">
          <div className="flex gap-6 flex-wrap justify-center">
            <a href="#" className="font-['Manrope'] text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Whitepaper</a>
            <a href="#" className="font-['Manrope'] text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Governance</a>
            <a href="#" className="font-['Manrope'] text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors">API Docs</a>
            <a href="#" className="font-['Manrope'] text-xs uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Security Audit</a>
          </div>
          <p className="font-['Manrope'] text-xs uppercase tracking-widest text-slate-500">
            © 2024 TrustChain Protocol. Decentralized Ledger Systems.
          </p>
        </footer>
      </main>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/public" element={<PublicDashboard />} />
        <Route path="/dashboard/*" element={
          <ProtectedRoute allowedRoles={['admin', 'auditor', 'public']}>
            <DashboardLayout />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#272a2c',
            color: '#e0e3e5',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            fontFamily: "'Manrope', sans-serif",
            fontSize: '0.85rem',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
          },
        }}
      />
    </BrowserRouter>
  </AuthProvider>
);

export default App;