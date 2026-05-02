import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ─── JWT Token Management ────────────────────────────────────────────

const getAccessToken = () => localStorage.getItem('access_token');
const getRefreshToken = () => localStorage.getItem('refresh_token');

const setTokens = (access, refresh) => {
  localStorage.setItem('access_token', access);
  localStorage.setItem('refresh_token', refresh);
};

const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

// Request interceptor — attach Bearer token
API.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — auto-refresh on 401
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            'http://localhost:8000/api/auth/token/refresh/',
            { refresh: refreshToken }
          );
          setTokens(data.access, refreshToken);
          originalRequest.headers.Authorization = `Bearer ${data.access}`;
          return API(originalRequest);
        } catch (refreshError) {
          clearTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      } else {
        clearTokens();
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ─── Auth API ────────────────────────────────────────────────────────

export const authAPI = {
  login: async (credentials) => {
    const { data } = await API.post('/auth/token/', credentials);
    setTokens(data.access, data.refresh);
    return data;
  },
  me: () => API.get('/auth/me/'),
  logout: () => {
    clearTokens();
    return Promise.resolve();
  },
};

// ─── Transaction API ─────────────────────────────────────────────────

export const transactionAPI = {
  list: (params) => API.get('/transactions/', { params }),
  get: (id) => API.get(`/transactions/${id}/`),
  create: (data) => API.post('/transactions/', data),
  verify: () => API.get('/transactions/verify/'),
  flagged: () => API.get('/transactions/flagged/'),
  stats: () => API.get('/transactions/stats/'),
};

// ─── Disburse API ────────────────────────────────────────────────────

export const disburseAPI = {
  create: (data) => API.post('/disburse/', data),
};

// ─── Flag API ────────────────────────────────────────────────────────

export const flagAPI = {
  list: (params) => API.get('/flags/', { params }),
  clear: (id) => API.post(`/flags/${id}/clear/`),
  escalate: (id) => API.post(`/flags/${id}/escalate/`),
};

// ─── Audit API ───────────────────────────────────────────────────────

export const auditAPI = {
  list: () => API.get('/audit-logs/'),
};

// ─── Public API ──────────────────────────────────────────────────────

export const publicAPI = {
  lookup: (params) => API.get('/public/lookup/', { params }),
};

// ─── Stats API ───────────────────────────────────────────────────────

export const statsAPI = {
  get: () => API.get('/stats/'),
};

export const auditStatsAPI = {
  get: () => API.get('/audit/stats/'),
};

export { setTokens, clearTokens };
export default API;
