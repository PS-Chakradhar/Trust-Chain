import React, { useState } from 'react';
import { transactionAPI } from '../utils/api';

const TransactionForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    sender: '',
    recipient: '',
    amount: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await transactionAPI.create({
        ...formData,
        amount: parseFloat(formData.amount),
      });
      setFormData({ sender: '', recipient: '', amount: '' });
      setSuccess('TRANSACTION RECORDED IN LEDGER');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'RECORDING FAILED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerIcon}>⬡</div>
        <h3 style={styles.title}>NEW TRANSACTION</h3>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>ORIGIN</label>
          <input
            type="text"
            name="sender"
            placeholder="SENDER IDENTIFIER"
            value={formData.sender}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>DESTINATION</label>
          <input
            type="text"
            name="recipient"
            placeholder="RECIPIENT IDENTIFIER"
            value={formData.recipient}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>VALUE</label>
          <input
            type="number"
            name="amount"
            placeholder="AMOUNT (INR)"
            value={formData.amount}
            onChange={handleChange}
            style={styles.input}
            step="0.01"
            min="0"
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'PROCESSING...' : 'EXECUTE TRANSACTION'}
        </button>
      </form>
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
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '1.5rem',
  },
  headerIcon: {
    fontSize: '1.5rem',
    color: '#00ff88',
    textShadow: '0 0 20px #00ff88',
  },
  title: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#fff',
    letterSpacing: '0.15em',
    margin: 0,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    fontSize: '0.7rem',
    color: '#8a8a9a',
    letterSpacing: '0.15em',
  },
  input: {
    padding: '0.875rem 1rem',
    fontSize: '0.95rem',
    letterSpacing: '0.05em',
    background: 'rgba(10, 10, 15, 0.8)',
    border: '1px solid rgba(0, 240, 255, 0.15)',
    borderRadius: '8px',
    color: '#fff',
    outline: 'none',
    transition: 'all 0.3s ease',
  },
  button: {
    width: '100%',
    padding: '1rem',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    background: 'linear-gradient(90deg, #00ff88, #00f0ff)',
    border: 'none',
    borderRadius: '8px',
    color: '#0a0a0f',
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
  error: {
    padding: '0.875rem',
    borderRadius: '8px',
    background: 'rgba(255, 0, 85, 0.15)',
    border: '1px solid rgba(255, 0, 85, 0.3)',
    color: '#ff0055',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textAlign: 'center',
  },
  success: {
    padding: '0.875rem',
    borderRadius: '8px',
    background: 'rgba(0, 255, 136, 0.15)',
    border: '1px solid rgba(0, 255, 136, 0.3)',
    color: '#00ff88',
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textAlign: 'center',
  },
};

export default TransactionForm;