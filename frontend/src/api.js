// Dynamic API URL for local development and production deployments
const rawApiUrl = import.meta.env.VITE_API_URL || '';
const API_BASE = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : rawApiUrl
  ? `${rawApiUrl.replace(/\/+$/, '')}/api`
  : '/api';

export const getStoredToken = () => localStorage.getItem('token');
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  try {
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const setAuthData = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const clearAuthData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getHeaders = () => {
  const token = getStoredToken();
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth endpoints
  async register(name, email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Registration failed');
    return data;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');
    return data;
  },

  async getCurrentUser() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch user');
    return await res.json();
  },

  // Expense endpoints with filter support
  async getExpenses(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category && filters.category !== 'All') {
      params.append('category', filters.category);
    }
    if (filters.search && filters.search.trim()) {
      params.append('search', filters.search.trim());
    }
    if (filters.startDate) {
      params.append('startDate', filters.startDate);
    }
    if (filters.endDate) {
      params.append('endDate', filters.endDate);
    }

    const query = params.toString() ? `?${params.toString()}` : '';
    const res = await fetch(`${API_BASE}/expenses${query}`, {
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch expenses');
    return data.data;
  },

  async addExpense(expense) {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(expense),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to add expense');
    return data.data;
  },

  async deleteExpense(id) {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete expense');
    return data;
  },

  async updateExpense(id, updateData) {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update expense');
    return data.data;
  }
};
