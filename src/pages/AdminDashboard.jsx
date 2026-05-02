import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { disburseAPI } from '../utils/api';

const NETWORK_BG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAC9vLWXSvwSI2h0CKq34bMTqAhkF-bPwiZlrLWO-t4h-XiKCBB7PLHJwpFhA1JHM9iwKTQjtITrUNJ5xLatfRJrzmkz7V46u6cDKIKwAQuCKznelploTBoyxJ_gB-rzVHXV1lqRXRzp8OlgmzD10OM8WTRMXN55GQu3E6qPIiVqyyd67nVrEL7saCtk8WzgG-OsZYb_CEwwuHWqsf2exuSPp4acbmqCYOM47YDkO1qP8maoJrorXcJHyfbwFOtcf-eweqL23sHKcc';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({ asset: 'USDC (Ethereum Mainnet)', target: '', amount: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.target || !formData.amount) { toast.error('All fields required'); return; }
    setSubmitting(true);
    try {
      await disburseAPI.create({ scheme_name: formData.asset, amount: parseFloat(formData.amount), beneficiary_id: formData.target });
      toast.success('Disbursement authorized successfully');
      setFormData({ ...formData, target: '', amount: '' });
    } catch (err) { toast.error(err.response?.data?.detail || 'Authorization failed'); }
    finally { setSubmitting(false); }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-xs">Disbursement Control</h1>
        <p className="font-body-base text-body-base text-on-surface-variant">Authorize and route institutional liquidity pools across validated nodes.</p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-gutter">
        {/* Left Column */}
        <div className="xl:col-span-8 flex flex-col gap-gutter">
          {/* Network Topology Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-xl p-md relative overflow-hidden min-h-[400px] flex flex-col"
          >
            <div className="absolute inset-0 z-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('${NETWORK_BG}')` }} />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="relative z-10 flex justify-between items-start mb-auto">
              <div>
                <h3 className="font-headline-md text-headline-md text-primary-container">Network Topology</h3>
                <p className="font-body-sm text-body-sm text-tertiary-fixed-dim">Real-time node synchronization status</p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-high/80 px-3 py-1.5 rounded-full border border-secondary/30">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="font-label-caps text-label-caps text-secondary">Optimal</span>
              </div>
            </div>
            <div className="relative z-10 grid grid-cols-3 gap-sm mt-8">
              {[
                { label: 'Active Nodes', value: '1,402' },
                { label: 'Consensus Rate', value: '99.98%' },
                { label: 'Pending TX', value: '45', color: 'text-primary-fixed-dim' },
              ].map((stat, i) => (
                <div key={i} className="bg-surface-container/50 backdrop-blur-md rounded-lg p-sm border border-outline-variant/30 text-center">
                  <span className="block font-label-caps text-label-caps text-on-surface-variant mb-1">{stat.label}</span>
                  <span className={`block font-headline-md text-headline-md ${stat.color || 'text-on-surface'}`}>{stat.value}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Configuration Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Routing Logic */}
            <div className="glass-panel rounded-xl p-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">route</span> Routing Logic
                </h3>
                <button className="text-primary-container hover:text-primary-fixed transition-colors">
                  <span className="material-symbols-outlined">edit</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-high/50 border border-outline-variant/20">
                  <div>
                    <span className="block font-body-sm text-body-sm font-semibold text-on-surface">Auto-Split Liquidity</span>
                    <span className="block font-label-caps text-label-caps text-on-surface-variant">Distribute across Top 3 pools</span>
                  </div>
                  <div className="w-10 h-5 bg-secondary-container rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-0.5 w-4 h-4 bg-on-secondary-container rounded-full shadow-sm" />
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-surface-container-high/50 border border-outline-variant/20">
                  <div>
                    <span className="block font-body-sm text-body-sm font-semibold text-on-surface">Gas Optimization</span>
                    <span className="block font-label-caps text-label-caps text-on-surface-variant">Max Gwei: 45</span>
                  </div>
                  <div className="w-10 h-5 bg-surface-container-highest rounded-full relative cursor-pointer border border-outline-variant">
                    <div className="absolute left-1 top-0.5 w-4 h-4 bg-outline rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Constraints */}
            <div className="glass-panel rounded-xl p-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-outline">shield_lock</span> Risk Constraints
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Slippage Tolerance</span>
                    <span className="font-label-caps text-label-caps text-primary-container">0.5%</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className="bg-primary-container h-2 rounded-full" style={{ width: '25%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-label-caps text-label-caps text-on-surface-variant">Max Transaction Volume</span>
                    <span className="font-label-caps text-label-caps text-tertiary-fixed-dim">500 ETH</span>
                  </div>
                  <div className="w-full bg-surface-container-high rounded-full h-2">
                    <div className="bg-tertiary-fixed-dim h-2 rounded-full" style={{ width: '60%' }} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-outline-variant/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-sm">warning</span>
                  <span className="font-label-caps text-label-caps text-error">Strict KYC Enforcement Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column — Disbursement Form */}
        <div className="xl:col-span-4 flex flex-col gap-gutter">
          <div className="glass-panel rounded-xl p-md h-full flex flex-col">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-6 border-b border-outline-variant/30 pb-4">New Disbursement</h3>
            <div className="flex-1 space-y-6">
              {/* Step 1: Asset Selection */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-primary-container/30" />
                <div className="absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-surface border-2 border-primary-container flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-primary-container" />
                </div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Select Asset</label>
                <div className="relative">
                  <select
                    value={formData.asset}
                    onChange={(e) => setFormData({ ...formData, asset: e.target.value })}
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-base text-on-surface appearance-none focus:outline-none focus:border-primary-container input-well"
                  >
                    <option>USDC (Ethereum Mainnet)</option>
                    <option>USDT (Polygon)</option>
                    <option>WETH (Arbitrum)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-3 text-outline pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Step 2: Destination */}
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-outline-variant/30" />
                <div className="absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-surface border-2 border-outline-variant flex items-center justify-center z-10">
                  <span className="font-label-caps text-label-caps text-outline-variant">2</span>
                </div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Target Address / Pool</label>
                <input
                  type="text"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  placeholder="0x..."
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 font-body-base text-on-surface focus:outline-none focus:border-secondary input-well font-mono text-sm"
                />
              </div>

              {/* Step 3: Amount */}
              <div className="relative pl-8">
                <div className="absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-surface border-2 border-outline-variant flex items-center justify-center z-10">
                  <span className="font-label-caps text-label-caps text-outline-variant">3</span>
                </div>
                <label className="block font-label-caps text-label-caps text-on-surface-variant mb-2 uppercase">Amount</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-outline font-body-base">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-3 pl-8 font-body-base text-on-surface focus:outline-none focus:border-secondary input-well text-right font-mono text-lg"
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-label-caps text-label-caps text-outline">Available: 1,250,000.00 USDC</span>
                  <button className="font-label-caps text-label-caps text-primary-container hover:underline">MAX</button>
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-8 pt-6 border-t border-outline-variant/30">
              <div className="flex justify-between items-center mb-4">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Estimated Network Fee</span>
                <span className="font-body-sm text-body-sm text-on-surface font-mono">~$12.45</span>
              </div>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-primary-container text-on-primary-container py-4 rounded-xl font-headline-md text-headline-md clay-btn hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>fingerprint</span>
                {submitting ? 'Processing...' : 'Authorize Disbursement'}
              </button>
              <p className="font-label-caps text-label-caps text-outline text-center mt-3 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Multi-sig requires 2/3 approvals
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;