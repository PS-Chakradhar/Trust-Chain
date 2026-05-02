import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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

  return (
    <nav className="bg-slate-950/40 backdrop-blur-[20px] h-screen w-72 border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] fixed left-0 top-0 z-40 flex-col pt-20 hidden md:flex">
      {/* Profile Section */}
      <div className="px-6 pb-8 border-b border-white/5 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-surface-container-high border border-white/10 overflow-hidden">
            <img
              src={PROFILE_IMG}
              alt="Security Officer Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-headline-md text-[16px] text-[#FFB7C5] font-bold">TrustChain Node</h2>
            <p className="font-body-sm text-body-sm text-outline">v2.4.0-Stable</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-4 flex flex-col gap-2 font-['Manrope'] text-sm font-semibold">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              isActive
                ? 'flex items-center gap-3 bg-white/5 text-[#FFB7C5] rounded-lg px-4 py-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] border border-[#FFB7C5]/20 translate-x-1 transition-all duration-150'
                : 'flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-white/5 hover:text-slate-200 transition-all rounded-lg'
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1", color: '#FFB7C5' } : {}}
                >
                  {item.icon}
                </span>
                <span className="font-label-caps text-label-caps">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Deploy Contract */}
      <div className="p-6">
        <button className="w-full py-3 rounded-lg border border-primary-container text-primary-container font-label-caps text-label-caps hover:bg-primary-container/10 transition-colors">
          Deploy Contract
        </button>
      </div>

      {/* Footer Links */}
      <div className="px-4 pb-6 flex flex-col gap-1 border-t border-white/5 pt-4">
        <button className="flex items-center gap-3 text-slate-500 px-4 py-3 hover:bg-white/5 hover:text-slate-200 transition-all rounded-lg text-left font-['Manrope'] text-sm font-semibold w-full">
          <span className="material-symbols-outlined text-[20px]">contact_support</span>
          Support
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-error px-4 py-3 hover:bg-white/5 hover:text-error transition-all rounded-lg text-left font-['Manrope'] text-sm font-semibold w-full"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
