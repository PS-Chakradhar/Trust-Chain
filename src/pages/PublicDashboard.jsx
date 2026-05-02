import React from 'react';
import { motion } from 'framer-motion';

const BARS = [
  { label: 'Q1', value: 2.4, color: 'primary-container' },
  { label: 'Q2', value: 3.1, color: 'secondary' },
  { label: 'Q3', value: 1.8, color: 'tertiary-fixed' },
  { label: 'Q4', value: 4.5, color: 'primary-container' },
  { label: 'Q5', value: 2.9, color: 'secondary' },
];

const TRANSACTIONS = [
  { hash: '0x8f...3a2b', type: 'Liquidity Provision', amount: '45,000 USDC', status: 'verified', time: '2 mins ago' },
  { hash: '0x1c...9d4f', type: 'Contract Execution', amount: '--', status: 'flagged', time: '5 mins ago' },
  { hash: '0x4a...2e11', type: 'Asset Transfer', amount: '120.5 ETH', status: 'verified', time: '12 mins ago' },
  { hash: '0x7b...c4d8', type: 'Stake Deposit', amount: '500 MATIC', status: 'verified', time: '18 mins ago' },
];

const PublicDashboard = () => {
  const maxVal = Math.max(...BARS.map(b => b.value));

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display-lg text-display-lg text-on-surface drop-shadow-md">Global Ledger</h1>
          <p className="font-body-base text-body-base text-on-surface-variant mt-2 max-w-2xl">
            Real-time monitoring of decentralized fund distribution and network consensus across all active validator nodes.
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-sm bg-surface-container-high/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/5 shadow-lg">
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#4de082]" />
          <span className="font-label-caps text-label-caps text-secondary">Network Syncing</span>
        </div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Main Chart Card */}
        <div className="lg:col-span-8 bg-surface-container/60 backdrop-blur-[20px] border-t border-l border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="font-headline-md text-headline-md text-on-surface">Fund Distribution</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Cross-chain liquidity pools (30d)</p>
            </div>
            <div className="bg-surface-container-highest/80 rounded-lg px-3 py-1 border border-outline/20">
              <span className="font-label-caps text-label-caps text-primary-container">+14.2% Vol</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="h-64 flex items-end justify-between gap-4 relative z-10 mt-auto pt-10 border-b border-white/5 pb-4">
            {BARS.map((bar, i) => {
              const height = (bar.value / maxVal) * 240;
              const isPeak = bar.value === maxVal;
              return (
                <motion.div
                  key={i}
                  className="w-full relative group/bar flex flex-col items-center"
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                >
                  <div className="absolute -top-8 opacity-0 group-hover/bar:opacity-100 transition-opacity font-label-caps text-label-caps text-on-surface bg-surface-container-highest px-2 py-1 rounded z-20">
                    {bar.value}M
                  </div>
                  <motion.div
                    className={`w-full rounded-t-md border-t-2 transition-all duration-500 hover:opacity-80 ${
                      bar.color === 'primary-container'
                        ? `bg-gradient-to-t from-primary-container/10 to-primary-container/${isPeak ? '60' : '40'} border-primary-container${isPeak ? '' : '/80'} ${isPeak ? 'shadow-[0_0_25px_rgba(255,183,197,0.4)]' : 'shadow-[0_0_15px_rgba(255,183,197,0.2)]'}`
                        : bar.color === 'secondary'
                        ? 'bg-gradient-to-t from-secondary/10 to-secondary/40 border-secondary/80 shadow-[0_0_15px_rgba(77,224,130,0.2)]'
                        : 'bg-gradient-to-t from-tertiary-fixed/10 to-tertiary-fixed/40 border-tertiary-fixed/80 shadow-[0_0_15px_rgba(218,226,253,0.2)]'
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Grid Lines Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#e0e3e5_1px,transparent_1px),linear-gradient(to_bottom,#e0e3e5_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        </div>

        {/* Metrics Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* TVL Card */}
          <div className="bg-surface-container/60 backdrop-blur-[20px] border-t border-l border-white/10 rounded-xl p-6 shadow-xl flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-secondary">deployed_code</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Total Value Locked</span>
            </div>
            <div className="font-display-lg text-display-lg text-on-surface">$1.42B</div>
            <div className="mt-2 text-secondary font-body-sm text-body-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +5.2% vs last week
            </div>
          </div>

          {/* Active Nodes Card */}
          <div className="bg-surface-container/60 backdrop-blur-[20px] border-t border-l border-white/10 rounded-xl p-6 shadow-xl flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-primary-container">cycle</span>
              <span className="font-label-caps text-label-caps text-on-surface-variant">Active Nodes</span>
            </div>
            <div className="font-display-lg text-display-lg text-on-surface">8,492</div>
            <div className="mt-2 text-on-surface-variant font-body-sm text-body-sm flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
              99.98% uptime
            </div>
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-surface-container/60 backdrop-blur-[20px] border-t border-l border-white/10 rounded-xl p-6 shadow-2xl overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-headline-md text-headline-md text-on-surface">Recent Ledger Entries</h3>
          <button className="font-label-caps text-label-caps text-primary-container hover:text-primary transition-colors flex items-center gap-1">
            View All
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Txn Hash</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Type</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Amount</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant">Status</th>
                <th className="py-3 px-4 font-label-caps text-label-caps text-on-surface-variant text-right">Time</th>
              </tr>
            </thead>
            <tbody className="font-body-sm text-body-sm text-on-surface">
              {TRANSACTIONS.map((tx, i) => (
                <motion.tr
                  key={i}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors group"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <td className="py-4 px-4 font-mono text-tertiary-fixed">{tx.hash}</td>
                  <td className="py-4 px-4">{tx.type}</td>
                  <td className="py-4 px-4">{tx.amount}</td>
                  <td className="py-4 px-4">
                    {tx.status === 'verified' ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary-container/20 border border-secondary-container/30 text-secondary shadow-[inset_0_1px_2px_rgba(77,224,130,0.2)]">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        <span className="font-label-caps text-label-caps">Verified</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-error/20 border border-error/30 text-error shadow-[inset_0_1px_2px_rgba(255,180,171,0.2)]">
                        <span className="material-symbols-outlined text-[14px]">warning</span>
                        <span className="font-label-caps text-label-caps">Flagged</span>
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right text-on-surface-variant">{tx.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;