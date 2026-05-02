import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import TopAppBar from '../components/Navbar';

const HERO_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvHmG-eIepvXWS9UwcgQOv4U89KWhg0rqBmYy3_sUNMCY6hmC9cS9roOvBw7msH0E2aJxFSlHJRJNjMf5wcahcWQNZQaFx9PjReKo8kl_HxZQ8_VQAPwhya6E1-UHYUgrL8XdwY8NWxXKeE5nDdsQgV9h5nji1Xvrr2Up4din5kOoIzBbrmk3IwEj0FObsRxDDmag-YFll8CV8N3CKyLc5YH5qVIHkA5l_eohD4WThN_NhLI49qu6CZJ4DgU4Us01tSw62KO15dQg';
const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUMe08BXMHhN2lhcyMuu3SpXloUIWGxT7dtj9OkWmOSO_FRXU1rEER_0iZ0mJ5c7nGwf0qyFCxYP5rb1YPcyW_vy5qj0pG32qU4qCoLOS1W68w91VgRgZfkfH6dszTFwU78fA8OSnROQ97bQjvYSbjazUv-TmGBGgEn3hizQchSFxrbPoMko89AoYoihp7qwsCF_Z0VJGthwtixhI_TxYaHhnX66jdhYF8K72mLyRLua6hPWmPzA2FoLLZ26fGdeVfNp4Ockrfahk';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleDeployContract = () => {
    toast.success('Contract deployment initiated — connecting to Polygon Testnet...', { icon: '🚀', duration: 3000 });
  };

  return (
    <div className="bg-[#020617] text-on-background font-body-base min-h-screen flex flex-col">
      {/* TopAppBar — shows high-level nav (Overview, Explorer, Documentation, Governance) */}
      <TopAppBar showNav />

      <main className="flex-grow flex flex-col md:flex-row">
        {/* Sidebar — shows operational navigation (different from top nav) */}
        <aside className="hidden md:flex flex-col pt-16 h-screen w-64 border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] bg-slate-950/40 backdrop-blur-[20px] fixed left-0 top-0 z-40">
          <div className="px-5 pb-6">
            <div className="flex items-center gap-3 mb-6">
              <img src={PROFILE_IMG} alt="Node" className="w-10 h-10 rounded-full object-cover border border-primary-container/30" />
              <div>
                <h2 className="font-['Manrope'] text-sm font-bold text-on-surface">TrustChain Node</h2>
                <p className="font-['Manrope'] text-[10px] text-outline">v2.4.0-Stable</p>
              </div>
            </div>
            <button
              onClick={handleDeployContract}
              className="w-full bg-primary-container text-on-primary-fixed px-3 py-2.5 rounded-lg font-['Manrope'] text-xs font-bold clay-btn flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Deploy Contract
            </button>
          </div>

          {/* Sidebar nav — operational items (Home, Ledger, Audit, etc.) */}
          <nav className="flex-grow px-3 flex flex-col gap-1">
            <button onClick={() => navigate('/')} className="flex items-center gap-3 bg-white/5 text-[#FFB7C5] rounded-lg px-3 py-2.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-[#FFB7C5]/20 font-['Manrope'] text-xs font-semibold translate-x-0.5 duration-150 w-full text-left">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span> Home
            </button>
            {[
              { icon: 'database', label: 'Ledger Explorer', path: '/public' },
              { icon: 'monitoring', label: 'Risk Audit', path: '/login' },
              { icon: 'health_metrics', label: 'System Health', path: '/login' },
              { icon: 'shield_person', label: 'Admin Portal', path: '/login' },
              { icon: 'settings', label: 'Settings', path: '/login' },
            ].map((item) => (
              <button key={item.label} onClick={() => navigate(item.path)} className="flex items-center gap-3 text-slate-500 px-3 py-2.5 hover:bg-white/5 hover:text-slate-200 transition-all font-['Manrope'] text-xs font-semibold w-full text-left rounded-lg">
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span> {item.label}
              </button>
            ))}
          </nav>

          {/* Sidebar footer */}
          <div className="px-3 pb-5 pt-3 border-t border-white/5 mt-2 flex flex-col gap-1">
            <button onClick={() => toast('Support tickets available in Admin Portal', { icon: '💬' })} className="flex items-center gap-3 text-slate-500 px-3 py-2 hover:bg-white/5 hover:text-slate-200 transition-all font-['Manrope'] text-xs font-semibold w-full text-left rounded-lg">
              <span className="material-symbols-outlined text-[18px]">contact_support</span> Support
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow md:ml-64 p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden mb-8 min-h-[360px] flex items-center justify-between p-10 glass-card"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-surface-container/90 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url('${HERO_BG}')` }} />
            <div className="relative z-20 max-w-2xl">
              <h2 className="font-['Manrope'] text-4xl font-extrabold text-on-surface mb-3 leading-tight">
                Secure Your <br />
                <span className="text-primary-container text-glow-primary">Digital Assets</span>
              </h2>
              <p className="font-['Manrope'] text-sm text-outline mb-6 max-w-lg leading-relaxed">
                Advanced decentralized ledger systems providing unprecedented clarity and professional rigor for modern asset managers.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary-container text-on-primary-fixed px-5 py-2.5 rounded-lg font-['Manrope'] text-sm font-bold clay-btn hover:scale-[0.97] transition-transform duration-200"
                >
                  Start Audit
                </button>
                <button
                  onClick={() => navigate('/public')}
                  className="bg-surface-variant text-on-surface px-5 py-2.5 rounded-lg font-['Manrope'] text-sm font-bold hover:bg-surface-container-highest transition-colors duration-200 border border-outline-variant"
                >
                  View Explorer
                </button>
              </div>
            </div>
          </motion.section>

          {/* Stats Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {[
              { label: 'Total Tracked', value: '$4.2B', sub: '+12.5% this week', subIcon: 'trending_up', subColor: 'text-secondary text-glow-secondary', glowColor: 'bg-primary-container/10' },
              { label: 'Blocks Sealed', value: '8.4M', sub: '100% integrity', subIcon: 'check_circle', subColor: 'text-outline', glowColor: 'bg-secondary/10' },
              { label: 'Flagged Txs', value: '24', sub: 'Requires review', subIcon: 'warning', subColor: 'text-error', glowColor: 'bg-error/10' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-xl p-5 flex flex-col justify-between h-40 relative overflow-hidden group cursor-default"
              >
                <div className={`absolute -right-8 -top-8 w-28 h-28 ${stat.glowColor} rounded-full blur-2xl group-hover:opacity-80 transition-opacity pointer-events-none`} />
                <div>
                  <p className="font-['Manrope'] text-[10px] text-outline uppercase tracking-widest mb-1 font-semibold">{stat.label}</p>
                  <h3 className="font-['Manrope'] text-3xl font-extrabold text-on-surface">{stat.value}</h3>
                </div>
                <div className={`flex items-center gap-1.5 ${stat.subColor}`}>
                  <span className="material-symbols-outlined text-[14px]">{stat.subIcon}</span>
                  <span className="font-['Manrope'] text-xs">{stat.sub}</span>
                </div>
              </motion.div>
            ))}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center justify-center gap-4 px-6 py-8 border-t border-white/5 bg-slate-950 md:ml-64 md:w-[calc(100%-16rem)]">
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
    </div>
  );
};

export default LandingPage;