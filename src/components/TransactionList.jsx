import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../utils/api';
import { useAuth } from '../context/AuthContext';

const TransactionList = ({ refreshTrigger }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const { user } = useAuth();

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const { data } = await transactionAPI.list();
      setTransactions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    try {
      const { data } = await transactionAPI.verify();
      if (data.valid) {
        alert(`LEDGER VERIFIED\n${data.total_transactions} TRANSACTIONS VALID`);
      } else {
        alert(`ALERT: TAMPERING DETECTED\nBROKEN AT TRANSACTION #${data.broken_at}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setVerifying(false);
    }
  };

  const handleFlag = async (id) => {
    const reason = prompt('ENTER FLAG REASON:');
    if (!reason) return;
    try {
      await transactionAPI.flag(id, reason);
      fetchTransactions();
    } catch (err) {
      alert('FLAGGING FAILED');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [refreshTrigger]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={styles.headerIcon}>◈</div>
          <h3 style={styles.title}>LEDGER ENTRIES</h3>
        </div>
        <button onClick={handleVerify} style={styles.verifyBtn} disabled={verifying}>
          {verifying ? 'VERIFYING...' : 'VERIFY LEDGER'}
        </button>
      </div>

      {loading ? (
        <div style={styles.loading}>
          <div style={styles.loadingSpinner}>◈</div>
          <span>LOADING ENTRIES...</span>
        </div>
      ) : (
        <div style={styles.list}>
          {transactions.length === 0 ? (
            <div style={styles.empty}>
              <div style={styles.emptyIcon}>∅</div>
              <span>NO TRANSACTIONS FOUND</span>
            </div>
          ) : (
            transactions.slice(0, 20).map((tx) => (
              <div 
                key={tx.id} 
                style={styles.card}
                data-flagged={tx.is_flagged}
              >
                <div style={styles.cardHeader}>
                  <span style={styles.txId}>#{tx.id}</span>
                  {tx.is_flagged && (
                    <span style={styles.flagged}>⚠ FLAGGED</span>
                  )}
                </div>
                
                <div style={styles.cardBody}>
                  <div style={styles.txRow}>
                    <span style={styles.txLabel}>ORIGIN</span>
                    <span style={styles.txValue}>{tx.sender}</span>
                  </div>
                  <div style={styles.txRow}>
                    <span style={styles.txLabel}>DESTINATION</span>
                    <span style={styles.txValue}>{tx.recipient}</span>
                  </div>
                  <div style={styles.txRow}>
                    <span style={styles.txLabel}>VALUE</span>
                    <span style={styles.txAmount}>₹{Number(tx.amount).toLocaleString()}</span>
                  </div>
                  <div style={styles.txRow}>
                    <span style={styles.txLabel}>HASH</span>
                    <span style={styles.txHash}>
                      {tx.hash?.substring(0, 24)}...
                    </span>
                  </div>
                </div>

                {user?.role === 'admin' && !tx.is_flagged && (
                  <button
                    onClick={() => handleFlag(tx.id)}
                    style={styles.flagBtn}
                  >
                    ⚠ FLAG TRANSACTION
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    background: 'rgba(18, 18, 26, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    border: '1px solid rgba(0, 240, 255, 0.15)',
    padding: '1.5rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  headerIcon: {
    fontSize: '1.5rem',
    color: '#00f0ff',
    textShadow: '0 0 20px #00f0ff',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.15em',
    margin: 0,
  },
  verifyBtn: {
    padding: '0.5rem 1rem',
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    background: 'transparent',
    border: '1px solid rgba(0, 240, 255, 0.4)',
    borderRadius: '6px',
    color: '#00f0ff',
    cursor: 'pointer',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '3rem',
    color: '#8a8a9a',
  },
  loadingSpinner: {
    fontSize: '2rem',
    color: '#00f0ff',
    animation: 'spin 1s linear infinite',
    textShadow: '0 0 20px #00f0ff',
  },
  empty: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    padding: '3rem',
    color: '#4a4a5a',
  },
  emptyIcon: {
    fontSize: '3rem',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  card: {
    background: 'rgba(10, 10, 15, 0.8)',
    borderRadius: '12px',
    border: '1px solid rgba(0, 240, 255, 0.1)',
    padding: '1rem',
    transition: 'all 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.75rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  },
  txId: {
    fontSize: '0.75rem',
    color: '#00f0ff',
    letterSpacing: '0.1em',
  },
  flagged: {
    fontSize: '0.7rem',
    color: '#ff0055',
    fontWeight: 600,
    letterSpacing: '0.1em',
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  txRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txLabel: {
    fontSize: '0.7rem',
    color: '#4a4a5a',
    letterSpacing: '0.1em',
  },
  txValue: {
    fontSize: '0.9rem',
    color: '#fff',
    letterSpacing: '0.05em',
  },
  txAmount: {
    fontSize: '1rem',
    color: '#00ff88',
    fontWeight: 600,
    letterSpacing: '0.05em',
  },
  txHash: {
    fontSize: '0.75rem',
    color: '#8a8a9a',
    fontFamily: 'monospace',
  },
  flagBtn: {
    width: '100%',
    marginTop: '0.75rem',
    padding: '0.625rem',
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    background: 'transparent',
    border: '1px solid rgba(255, 0, 85, 0.4)',
    borderRadius: '6px',
    color: '#ff0055',
    cursor: 'pointer',
  },
};

export default TransactionList;