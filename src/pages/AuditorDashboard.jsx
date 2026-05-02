import React from 'react';
import { motion } from 'framer-motion';

const INVESTIGATIONS = [
  { id: '#INV-8921', entity: 'Nexus Exchange', icon: 'account_balance', risk: 'Liquidity Drain Pattern', priority: 'HIGH', priorColor: 'text-error bg-error/10 border-error/20' },
  { id: '#INV-8920', entity: 'Aether Protocol', icon: 'token', risk: 'Flash Loan Exploit', priority: 'HIGH', priorColor: 'text-error bg-error/10 border-error/20' },
  { id: '#INV-8915', entity: 'DAO Treasury', icon: 'group', risk: 'Governance Attack', priority: 'MED', priorColor: 'text-primary-container bg-primary-container/10 border-primary-container/20' },
];

const AuditorDashboard = () => {
  const scanPercent = 76;
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (scanPercent / 100) * circumference;

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div>
        <h1 className="font-display-lg text-display-lg text-on-surface mb-2">Auditor Dashboard</h1>
        <p className="font-body-base text-body-base text-outline">Real-time risk assessment and ledger integrity analysis.</p>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
        {/* Deep Scan Circle */}
        <div className="md:col-span-12 xl:col-span-4 glass-panel rounded-xl p-6 flex flex-col items-center justify-center relative min-h-[400px]">
          <h3 className="font-headline-md text-headline-md text-on-surface w-full text-left absolute top-6 left-6">Network Deep Scan</h3>
          <div className="relative w-64 h-64 mt-8">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-secondary/20 shadow-[0_0_40px_rgba(77,224,130,0.3)]" />
            {/* Progress Ring SVG */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle
                cx="50" cy="50" r="45" fill="none"
                stroke="#4de082" strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="drop-shadow-[0_0_8px_rgba(77,224,130,0.8)]"
                style={{ transition: 'stroke-dashoffset 1.5s ease' }}
              />
            </svg>
            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-highest/30 rounded-full backdrop-blur-sm m-6 border border-white/5 shadow-inner">
              <span className="font-display-lg text-[40px] font-bold text-secondary text-glow-secondary">{scanPercent}%</span>
              <span className="font-label-caps text-label-caps text-outline mt-1 tracking-widest">SCANNING</span>
            </div>
          </div>
          <div className="w-full flex justify-between mt-8 px-4 font-body-sm text-body-sm">
            <div className="flex flex-col">
              <span className="text-outline">Nodes Verified</span>
              <span className="text-on-surface font-bold">14,290</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-outline">Anomalies</span>
              <span className="text-error font-bold">3</span>
            </div>
          </div>
        </div>

        {/* Critical Risk Cards */}
        <div className="md:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Smart Contract Vulnerability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-error-container/30 border border-error/20 mb-4">
                <span className="w-2 h-2 rounded-full bg-error glow-error" />
                <span className="font-label-caps text-label-caps text-error">CRITICAL ALERT</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Smart Contract Vulnerability</h3>
              <p className="font-body-sm text-body-sm text-outline mb-6 w-4/5">Reentrancy risk detected in liquidity pool contract 0x7F...9A2. Immediate audit required.</p>
              <div className="flex justify-between items-end">
                <div>
                  <span className="block font-label-caps text-label-caps text-outline mb-1">EXPOSURE</span>
                  <span className="font-headline-md text-[20px] text-on-surface">$4.2M</span>
                </div>
                <button className="px-4 py-2 bg-error/10 text-error border border-error/30 rounded-lg font-label-caps text-label-caps hover:bg-error/20 transition-colors">
                  Isolate Contract
                </button>
              </div>
            </div>
          </motion.div>

          {/* KYC Threshold */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-6xl text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>gavel</span>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-white/10 mb-4">
                <span className="w-2 h-2 rounded-full bg-primary-container glow-primary" />
                <span className="font-label-caps text-label-caps text-primary-container">COMPLIANCE</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">KYC Threshold Breach</h3>
              <p className="font-body-sm text-body-sm text-outline mb-6 w-4/5">Multiple transactions exceeding standard tier limits without elevated verification.</p>
              <div className="flex justify-between items-end">
                <div>
                  <span className="block font-label-caps text-label-caps text-outline mb-1">FLAGGED WALLETS</span>
                  <span className="font-headline-md text-[20px] text-on-surface">12</span>
                </div>
                <button className="px-4 py-2 bg-surface-container-highest text-on-surface border border-white/10 rounded-lg font-label-caps text-label-caps hover:bg-white/5 transition-colors">
                  Review Logs
                </button>
              </div>
            </div>
          </motion.div>

          {/* Consensus Health (spans 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-panel rounded-xl p-6 relative overflow-hidden md:col-span-2"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Consensus Health</h3>
                <p className="font-body-sm text-body-sm text-outline mt-1">Validator participation and block finality metrics.</p>
              </div>
              <span className="px-3 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20 font-label-caps text-label-caps flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
                Optimal
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'ACTIVE VALIDATORS', value: '1,024', color: 'text-on-surface' },
                { label: 'AVG BLOCK TIME', value: '2.1s', color: 'text-on-surface' },
                { label: 'UPTIME', value: '99.99%', color: 'text-secondary' },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-lg bg-surface-container-lowest border border-white/5">
                  <span className="block font-label-caps text-label-caps text-outline mb-2">{m.label}</span>
                  <span className={`font-display-lg text-[28px] ${m.color}`}>{m.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Active Investigations Table */}
      <div className="glass-panel rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-container-highest/20">
          <h3 className="font-headline-md text-headline-md text-on-surface">Active Investigations</h3>
          <button className="text-primary-container font-label-caps text-label-caps hover:text-primary transition-colors flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm">
            <thead className="font-label-caps text-label-caps text-outline bg-surface-container-lowest/50">
              <tr>
                <th className="p-4 font-semibold border-b border-white/5">Case ID</th>
                <th className="p-4 font-semibold border-b border-white/5">Entity</th>
                <th className="p-4 font-semibold border-b border-white/5">Risk Type</th>
                <th className="p-4 font-semibold border-b border-white/5">Priority</th>
                <th className="p-4 font-semibold border-b border-white/5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {INVESTIGATIONS.map((inv, i) => (
                <motion.tr
                  key={i}
                  className="hover:bg-white/[0.02] transition-colors group"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <td className="p-4 text-on-surface font-mono">{inv.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center border border-white/10">
                        <span className="material-symbols-outlined text-[16px] text-outline">{inv.icon}</span>
                      </div>
                      <span className="text-on-surface">{inv.entity}</span>
                    </div>
                  </td>
                  <td className="p-4 text-outline">{inv.risk}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded border font-label-caps text-[10px] ${inv.priorColor}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${inv.priority === 'HIGH' ? 'bg-error glow-error' : 'bg-primary-container glow-primary'}`} />
                      {inv.priority}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-white/10 text-on-surface transition-all">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditorDashboard;
