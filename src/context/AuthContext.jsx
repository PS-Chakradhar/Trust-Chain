import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI, clearTokens, setTokens } from '../utils/api';

const AuthContext = createContext(null);

// ─── Demo credentials for hackathon showcase ────────────────────────
const DEMO_USERS = {
  admin:   { username: 'admin',   role: 'admin',   name: 'Admin Officer' },
  auditor: { username: 'auditor', role: 'auditor', name: 'Audit Analyst' },
  public:  { username: 'public',  role: 'public',  name: 'Public Viewer' },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    // Restore from localStorage first (instant UI)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('user');
      }
    }

    const token = localStorage.getItem('access_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authAPI.me();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      // If backend is unreachable, keep the stored user (demo mode)
      if (!storedUser) {
        setUser(null);
        clearTokens();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username, password) => {
    // Try real backend first
    try {
      const data = await authAPI.login({ username, password });
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      // ─── Demo mode fallback (backend not running) ─────────────
      const demoUser = DEMO_USERS[username];
      if (demoUser) {
        setTokens('demo-access-token', 'demo-refresh-token');
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
        return { success: true, user: demoUser };
      }
      return {
        success: false,
        error: err.response?.data?.detail || 'Invalid credentials',
      };
    }
  };

  const logout = async () => {
    await authAPI.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);