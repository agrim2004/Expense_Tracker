import { useState, useEffect, useCallback, useMemo } from 'react'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import SummaryPanel from './components/SummaryPanel'
import CurrencyConverter from './components/CurrencyConverter'
import Auth from './components/Auth'
import { api, getStoredUser, clearAuthData } from './api'
import './App.css'
import logo from './assets/logo.png'

function App() {
  const [user, setUser] = useState(() => getStoredUser());
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch expenses from Express + MongoDB backend
  const fetchExpenses = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setServerError(null);
    try {
      const data = await api.getExpenses();
      setExpenses(data);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      if (err.message && err.message.includes('authorized')) {
        handleLogout();
      } else {
        setServerError('Unable to sync with database. Please verify backend is running.');
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else {
      setExpenses([]);
    }
  }, [user, fetchExpenses]);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    clearAuthData();
    setUser(null);
    setExpenses([]);
    handleResetFilters();
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setStartDate('');
    setEndDate('');
  };

  const addExpense = async (expense) => {
    try {
      const newExpense = await api.addExpense(expense);
      setExpenses((prev) => [newExpense, ...prev]);
    } catch (err) {
      alert(`Error saving expense: ${err.message}`);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await api.deleteExpense(id);
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      alert(`Error deleting expense: ${err.message}`);
    }
  };

  // Instant reactive client-side filtering
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      // 1. Keyword / Name search
      if (searchTerm.trim()) {
        const matchesName = exp.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
        if (!matchesName) return false;
      }

      // 2. Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        if (exp.category !== selectedCategory) return false;
      }

      // 3. Start date filter
      if (startDate) {
        const expDate = new Date(exp.date || exp.createdAt);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        if (expDate < start) return false;
      }

      // 4. End date filter
      if (endDate) {
        const expDate = new Date(exp.date || exp.createdAt);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        if (expDate > end) return false;
      }

      return true;
    });
  }, [expenses, searchTerm, selectedCategory, startDate, endDate]);

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);

  return (
    <div className="container animate-fade-in">
      {user && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '1rem',
            width: '100%',
            marginBottom: '0.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '0.5rem 1.2rem',
              borderRadius: '25px',
              border: '1px solid var(--glass-border)',
              fontSize: '0.95rem'
            }}
          >
            <span style={{ color: 'var(--primary)' }}>●</span>
            <span>{user.name}</span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255, 77, 77, 0.15)',
              color: 'var(--danger)',
              border: '1px solid rgba(255, 77, 77, 0.3)',
              padding: '0.5rem 1.2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.95rem',
              minHeight: '42px',
              transition: 'var(--transition)'
            }}
          >
            Logout
          </button>
        </div>
      )}

      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          marginBottom: '3rem'
        }}
      >
        <img
          src={logo}
          alt="Logo"
          className="logo"
        />

        <h1
          style={{
            fontSize: '4.5rem',
            color: 'var(--primary)',
            margin: 0
          }}
        >
          Expense Tracker
        </h1>
      </header>

      {/* Main Content */}
      {!user ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : (
        <>
          {serverError && (
            <div
              style={{
                background: 'rgba(255, 77, 77, 0.15)',
                border: '1px solid var(--danger)',
                color: '#ff8080',
                padding: '0.8rem 1rem',
                borderRadius: '10px',
                marginBottom: '1.5rem',
                textAlign: 'center'
              }}
            >
              {serverError}
            </div>
          )}

          {loading && expenses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <div className="loading-dots" style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>
                Loading your expenses from MongoDB
              </div>
            </div>
          ) : (
            <main className="dashboard-grid">
              <div className="left-column">
                <ExpenseForm onAddExpense={addExpense} />
                <SummaryPanel expenses={filteredExpenses} totalAmount={totalAmount} />
              </div>

              <div className="right-column">
                <CurrencyConverter totalAmount={totalAmount} />
                <ExpenseList 
                  expenses={filteredExpenses} 
                  totalCount={expenses.length}
                  onDeleteExpense={deleteExpense}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  startDate={startDate}
                  onStartDateChange={setStartDate}
                  endDate={endDate}
                  onEndDateChange={setEndDate}
                  onResetFilters={handleResetFilters}
                />
              </div>
            </main>
          )}
        </>
      )}

      <footer
        style={{
          marginTop: '4rem',
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '2rem'
        }}
      >
        <p>&copy; {new Date().getFullYear()} Expense Tracker</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          Developed by <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Agrim</span>
        </p>
      </footer>
    </div>
  )
}

export default App
