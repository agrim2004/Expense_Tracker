import React from 'react';

function ExpenseList({ 
  expenses, 
  onDeleteExpense,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  onResetFilters,
  totalCount
}) {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Food': return '🍔';
      case 'Travel': return '✈️';
      case 'Marketing': return '📈';
      case 'Utilities': return '💡';
      default: return '📦';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return '';
    }
  };

  const isFiltered = Boolean(
    searchTerm || 
    (selectedCategory && selectedCategory !== 'All') || 
    startDate || 
    endDate
  );

  // Quick preset: This Month
  const handleSetThisMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
    onStartDateChange(firstDay);
    onEndDateChange(lastDay);
  };

  // Quick preset: Today
  const handleSetToday = () => {
    const today = new Date().toISOString().split('T')[0];
    onStartDateChange(today);
    onEndDateChange(today);
  };

  return (
    <section className="glass-card" style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', flexWrap: 'wrap', gap: '10px' }}>
        <h2 style={{ fontSize: '2.1rem', margin: 0 }}>Recent Expenses</h2>
        <span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          {isFiltered ? `Showing ${expenses.length} of ${totalCount}` : `Total: ${totalCount}`}
        </span>
      </div>

      {/* Filter and Search Bar */}
      <div className="filter-panel" style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '12px',
        padding: '1rem',
        marginBottom: '1.5rem',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.8rem'
      }}>
        {/* Search input & Category dropdown */}
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 2, minWidth: '180px' }}>
            <input
              type="text"
              placeholder="🔍 Search expense name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                fontSize: '0.9rem'
              }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '140px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.9rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                fontSize: '0.9rem'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
              <option value="Marketing">Marketing</option>
              <option value="Utilities">Utilities</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Date range pickers and quick presets */}
        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '130px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>From:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => onStartDateChange(e.target.value)}
              style={{
                width: '80%',
                padding: '0.45rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                fontSize: '0.82rem',
                colorScheme: 'dark'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, minWidth: '130px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>To:</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => onEndDateChange(e.target.value)}
              style={{
                width: '800%',
                padding: '0.45rem 0.6rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--glass-border)',
                color: 'white',
                fontSize: '0.82rem',
                colorScheme: 'dark'
              }}
            />
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              type="button"
              onClick={handleSetToday}
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleSetThisMonth}
              style={{
                padding: '0.45rem 0.75rem',
                fontSize: '0.78rem',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: 'var(--text-primary)',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer'
              }}
            >
              This Month
            </button>
            {isFiltered && (
              <button
                type="button"
                onClick={onResetFilters}
                style={{
                  padding: '0.45rem 0.75rem',
                  fontSize: '0.78rem',
                  borderRadius: '6px',
                  background: 'rgba(255, 77, 77, 0.15)',
                  color: 'var(--danger)',
                  border: '1px solid rgba(255, 77, 77, 0.3)',
                  cursor: 'pointer'
                }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Expense Item List */}
      {expenses.length === 0 ? (
        <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          {isFiltered ? (
            <div>
              <p style={{ marginBottom: '0.8rem' }}>No expenses found matching your search or filters.</p>
              <button
                onClick={onResetFilters}
                style={{
                  background: 'none',
                  border: '1px solid var(--primary)',
                  color: 'var(--primary)',
                  padding: '0.4rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.85rem'
                }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <p>No expenses yet. Start by adding one!</p>
          )}
        </div>
      ) : (
        <div className="expense-list">
          {expenses.map((expense) => (
            <div key={expense.id} className="expense-item">
              <div className="expense-info">
                <span className="category-icon">{getCategoryIcon(expense.category)}</span>
                <div>
                  <h3>{expense.name}</h3>
                  <p style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
                    <span>{expense.category}</span>
                    <span style={{ opacity: 0.5 }}>•</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
                      {formatDate(expense.date || expense.createdAt)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="expense-actions">
                <span className="amount">₹{parseFloat(expense.amount).toFixed(2)}</span>
                <button 
                  className="delete-btn" 
                  onClick={() => onDeleteExpense(expense.id)}
                  title="Delete expense"
                >
                  &times;
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
