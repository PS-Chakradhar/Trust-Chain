import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
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
        <div className="flex-1 p-6 lg:p-10 z-10">
          <Routes>
            <Route index element={
              <>
                {user.role === 'admin' && <AdminDashboard />}
                {user.role === 'auditor' && <AuditorDashboard />}
                {user.role === 'public' && <PublicDashboard />}
              </>
            } />
            <Route path="ledger" element={<PublicDashboard />} />
            <Route path="audit" element={<AuditorDashboard />} />
            <Route path="health" element={<PublicDashboard />} />
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="settings" element={<SettingsPlaceholder />} />
          </Routes>
        </div>

        {/* Footer */}
        <footer className="w-full flex flex-col items-center justify-center gap-4 px-6 py-8 border-t border-white/5 bg-slate-950 z-20 relative">
          <div className="flex gap-6 flex-wrap justify-center">
            {['Whitepaper', 'Governance', 'API Docs', 'Security Audit'].map((link) => (
              <button key={link} onClick={() => toast(`${link} — coming soon`, { icon: '📄' })} className="font-['Manrope'] text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
                {link}
              </button>
            ))}
          </div>
          <p className="font-['Manrope'] text-[10px] uppercase tracking-widest text-slate-500">
            © 2024 TrustChain Protocol. Decentralized Ledger Systems.
          </p>
        </footer>
      </main>
    </div>
  );
};

/* Settings placeholder page */
const SettingsPlaceholder = () => (
  <div className="space-y-6">
    <header>
      <h1 className="font-['Manrope'] text-3xl font-extrabold text-on-surface mb-1">Settings</h1>
      <p className="font-['Manrope'] text-sm text-on-surface-variant">Configure node preferences and account parameters.</p>
    </header>
    <div className="glass-panel rounded-xl p-6">
      <div className="space-y-4">
        {[
          { label: 'Network', value: 'Polygon Mumbai Testnet', icon: 'lan' },
          { label: 'Gas Strategy', value: 'Standard (Auto)', icon: 'local_gas_station' },
          { label: 'Notifications', value: 'Enabled', icon: 'notifications_active' },
          { label: 'Theme', value: 'Dark Mode', icon: 'dark_mode' },
          { label: 'Language', value: 'English', icon: 'translate' },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center p-3 rounded-lg bg-surface-container-high/50 border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[18px] text-outline">{item.icon}</span>
              <span className="font-['Manrope'] text-sm font-semibold text-on-surface">{item.label}</span>
            </div>
            <span className="font-['Manrope'] text-xs text-on-surface-variant">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const App = () => (
  <AuthProvider>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/public" element={
          <div className="bg-background text-on-background font-body-base antialiased min-h-screen flex flex-col">
            <TopAppBar showNav />
            <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
              <PublicDashboard />
            </div>
          </div>
        } />
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