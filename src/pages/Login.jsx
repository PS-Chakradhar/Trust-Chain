import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TopAppBar from '../components/Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) { setError('Please enter credentials'); return; }
    setLoading(true);
    setError('');
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
  };

  const fillDemo = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="bg-background text-on-background font-body-base antialiased min-h-screen flex flex-col relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <TopAppBar />

      {/* Centered Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-sm glass-panel rounded-xl p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="text-center mb-5">
            <div className="w-12 h-12 rounded-full bg-surface-container-high border border-white/10 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-primary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                shield_person
              </span>
            </div>
            <h2 className="font-['Manrope'] text-lg font-bold text-on-surface mb-0.5">TrustChain</h2>
            <p className="font-body-sm text-body-sm text-outline">Secure Portal — Authentication Required</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1.5 uppercase">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 text-sm font-['Manrope'] text-on-surface focus:outline-none focus:border-secondary input-well"
                autoComplete="username"
              />
            </div>
            <div>
              <label className="block font-label-caps text-label-caps text-on-surface-variant mb-1.5 uppercase">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2.5 text-sm font-['Manrope'] text-on-surface focus:outline-none focus:border-secondary input-well"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 p-2.5 rounded-lg bg-error-container/30 border border-error/20 text-error text-xs font-['Manrope']">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-3 rounded-lg font-['Manrope'] text-sm font-bold clay-btn hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
              {loading ? 'Authenticating...' : 'Authenticate'}
            </button>

            <p className="font-label-caps text-label-caps text-outline text-center flex items-center justify-center gap-1 text-[10px]">
              <span className="material-symbols-outlined text-[12px]">lock</span>
              Multi-layer JWT authentication
            </p>
          </form>

          {/* Demo Credentials — inside the card, properly aligned */}
          <div className="mt-5 pt-4 border-t border-white/5">
            <p className="font-label-caps text-[10px] text-outline text-center mb-3 tracking-widest">DEMO CREDENTIALS</p>
            <div className="flex gap-2 justify-center">
              {[
                { role: 'Admin', user: 'admin', pass: 'admin123', color: 'text-error' },
                { role: 'Auditor', user: 'auditor', pass: 'audit123', color: 'text-secondary' },
                { role: 'Public', user: 'public', pass: 'public123', color: 'text-tertiary-fixed' },
              ].map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillDemo(cred.user, cred.pass)}
                  className="px-3 py-1.5 bg-surface-container-high/50 rounded-md text-[11px] font-['Manrope'] font-semibold text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-all border border-white/5"
                >
                  <span className={cred.color}>{cred.role}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;