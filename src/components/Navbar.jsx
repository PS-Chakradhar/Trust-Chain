import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const TopAppBar = ({ showNav = false }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const auth = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast(`Searching: "${searchQuery}"`, { icon: '🔍' });
      setSearchQuery('');
    }
  };

  const handleNotifications = () => {
    setShowProfile(false);
    setShowNotif((prev) => !prev);
  };

  const handleProfile = () => {
    setShowNotif(false);
    setShowProfile((prev) => !prev);
  };

  return (
    <header className="flex justify-between items-center w-full px-6 py-3 sticky top-0 z-50 bg-slate-950/60 backdrop-blur-[20px] border-b border-white/10 shadow-2xl">
      <div className="flex items-center gap-4">
        <h1
          className="text-xl font-black tracking-tighter text-[#FFB7C5] drop-shadow-[0_0_15px_rgba(255,183,197,0.4)] font-['Manrope'] cursor-pointer"
          onClick={() => navigate('/')}
        >
          TrustChain
        </h1>
        {/* Top nav shows high-level categories — different from sidebar's operational items */}
        {showNav && (
          <nav className="hidden lg:flex gap-5 items-center ml-6">
            <button onClick={() => navigate('/')} className="text-[#FFB7C5] font-semibold border-b-2 border-[#FFB7C5] pb-0.5 transition-colors duration-300 font-['Manrope'] text-xs">Overview</button>
            <button onClick={() => navigate('/public')} className="text-slate-400 font-medium hover:text-[#FFB7C5] transition-colors duration-300 font-['Manrope'] text-xs">Explorer</button>
            <button onClick={() => navigate('/login')} className="text-slate-400 font-medium hover:text-[#FFB7C5] transition-colors duration-300 font-['Manrope'] text-xs">Documentation</button>
            <button onClick={() => navigate('/login')} className="text-slate-400 font-medium hover:text-[#FFB7C5] transition-colors duration-300 font-['Manrope'] text-xs">Governance</button>
          </nav>
        )}
      </div>
      <div className="flex items-center gap-3">
        {/* Search */}
        <form onSubmit={handleSearch} className="relative hidden sm:block">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search blocks, txns..."
            className="bg-surface-container-high/50 border border-outline/20 rounded-full pl-9 pr-4 py-1.5 text-xs font-['Manrope'] text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-transparent transition-all w-52 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]"
          />
        </form>

        {/* Notifications */}
        <div className="relative">
          <button onClick={handleNotifications} className="text-slate-400 hover:text-[#FFB7C5] transition-colors duration-300 relative p-1">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border border-slate-950" />
          </button>
          {showNotif && (
            <div className="absolute right-0 top-10 w-72 glass-panel rounded-xl shadow-2xl border border-white/10 p-4 z-50">
              <h4 className="font-['Manrope'] text-xs font-bold text-on-surface mb-3 uppercase tracking-widest">Notifications</h4>
              {[
                { msg: 'Block #8,401,244 sealed', time: '2m ago', icon: 'check_circle', color: 'text-secondary' },
                { msg: 'Flagged transaction detected', time: '5m ago', icon: 'warning', color: 'text-error' },
                { msg: 'Node sync complete', time: '12m ago', icon: 'sync', color: 'text-tertiary-fixed' },
              ].map((n, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-t border-white/5 first:border-t-0">
                  <span className={`material-symbols-outlined text-[16px] mt-0.5 ${n.color}`}>{n.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-['Manrope'] text-on-surface">{n.msg}</p>
                    <p className="text-[10px] font-['Manrope'] text-outline">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button onClick={handleProfile} className="text-slate-400 hover:text-[#FFB7C5] transition-colors duration-300 p-1">
            <span className="material-symbols-outlined text-[20px]">account_circle</span>
          </button>
          {showProfile && (
            <div className="absolute right-0 top-10 w-56 glass-panel rounded-xl shadow-2xl border border-white/10 p-4 z-50">
              <h4 className="font-['Manrope'] text-xs font-bold text-on-surface mb-1 uppercase tracking-widest">
                {auth?.user ? auth.user.name || auth.user.username : 'Guest'}
              </h4>
              <p className="text-[10px] font-['Manrope'] text-outline mb-3 capitalize">{auth?.user?.role || 'Not logged in'}</p>
              <div className="border-t border-white/5 pt-2 flex flex-col gap-1">
                <button onClick={() => { navigate('/dashboard'); setShowProfile(false); }} className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-['Manrope'] text-on-surface-variant hover:bg-white/5 hover:text-on-surface transition-colors text-left">
                  <span className="material-symbols-outlined text-[16px]">dashboard</span> Dashboard
                </button>
                {auth?.user ? (
                  <button onClick={() => { auth.logout(); navigate('/'); setShowProfile(false); }} className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-['Manrope'] text-error hover:bg-white/5 transition-colors text-left">
                    <span className="material-symbols-outlined text-[16px]">logout</span> Logout
                  </button>
                ) : (
                  <button onClick={() => { navigate('/login'); setShowProfile(false); }} className="flex items-center gap-2 w-full px-2 py-1.5 rounded text-xs font-['Manrope'] text-secondary hover:bg-white/5 transition-colors text-left">
                    <span className="material-symbols-outlined text-[16px]">login</span> Login
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Connect Node */}
        <button
          onClick={() => {
            if (auth?.user) {
              navigate('/dashboard');
            } else {
              navigate('/login');
            }
          }}
          className="hidden md:flex items-center gap-1.5 bg-primary-container text-on-primary-container font-['Manrope'] text-xs font-bold px-4 py-1.5 rounded-full glow-primary hover:bg-primary transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">link</span>
          {auth?.user ? 'Dashboard' : 'Connect Node'}
        </button>
      </div>
    </header>
  );
};

export default TopAppBar;