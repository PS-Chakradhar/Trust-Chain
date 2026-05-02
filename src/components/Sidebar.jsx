import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const NAV_ITEMS = [
  { path: '/dashboard', icon: 'dashboard', label: 'Home', end: true },
  { path: '/dashboard/ledger', icon: 'database', label: 'Ledger Explorer' },
  { path: '/dashboard/audit', icon: 'monitoring', label: 'Risk Audit' },
  { path: '/dashboard/health', icon: 'health_metrics', label: 'System Health' },
  { path: '/dashboard/admin', icon: 'shield_person', label: 'Admin Portal' },
  { path: '/dashboard/settings', icon: 'settings', label: 'Settings' },
];

const PROFILE_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWtibsXiGhVKofJ48m2DoYZAWDSab93OsxJAFPQRvtIVQe-oKq6b4bvt4dGEeQcztb-yfGe7Tc_tuW0h9_bZIHXJyr84fcZGZnAQj3uXKDNzG-acoQX5Tpq02tkG_fmSiSBqmpBaZ5CONLxFzjDTjOtaxG8wnsNa0b1gYdrxzXRNZKNdgBS8y3raN9V7Yn90qzWjQLVqT8_hiiu8OCSqUDKc1b8htGZWvka9BlJoyUxqYa_qOJZksTw7zUll_nuWPZIVd36grZisY';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleDeployContract = () => {
    toast.success('Contract deployment initiated — connecting to Polygon Testnet...', { icon: '🚀', duration: 3000 });
  };

  const handleSupport = () => {
    toast('Support tickets available — contact admin@trustchain.io', { icon: '💬', duration: 3000 });
  };

  return (
    <nav className="bg-slate-950/40 backdrop-blur-[20px] h-screen w-72 border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] fixed left-0 top-0 z-40 flex-col pt-16 hidden md:flex">
      {/* Profile Section */}
      <div className="px-5 pb-6 border-b border-white/5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high border border-white/10 overflow-hidden">
            <img
              src={PROFILE_IMG}
              alt="Security Officer Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-['Manrope'] text-sm font-bold text-[#FFB7C5]">TrustChain Node</h2>
            <p className="font-['Manrope'] text-[10px] text-outline">v2.4.0-Stable</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 flex flex-col gap-1 font-['Manrope'] text-xs font-semibold">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-white/5 text-[#FFB7C5] rounded-lg px-3 py-2.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-[#FFB7C5]/20 translate-x-0.5 transition-all duration-150'
                : 'flex items-center gap-3 text-slate-500 px-3 py-2.5 hover:bg-white/5 hover:text-slate-200 transition-all rounded-lg'
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1", color: '#FFB7C5' } : {}}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Deploy Contract */}
      <div className="px-4 py-3">
        <button
          onClick={handleDeployContract}
          className="w-full py-2.5 rounded-lg bg-primary-container text-on-primary-container font-['Manrope'] text-xs font-bold clay-btn flex items-center justify-center gap-2 hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          Deploy Contract
        </button>
      </div>

      {/* Footer Links */}
      <div className="px-3 pb-4 flex flex-col gap-1 border-t border-white/5 pt-3">
        <button
          onClick={handleSupport}
          className="flex items-center gap-3 text-slate-500 px-3 py-2 hover:bg-white/5 hover:text-slate-200 transition-all rounded-lg text-left font-['Manrope'] text-xs font-semibold w-full"
        >
          <span className="material-symbols-outlined text-[18px]">contact_support</span>
          Support
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-error px-3 py-2 hover:bg-white/5 hover:text-error transition-all rounded-lg text-left font-['Manrope'] text-xs font-semibold w-full"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
