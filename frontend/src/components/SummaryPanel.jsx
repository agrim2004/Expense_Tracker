function SummaryPanel({ expenses, totalAmount }) {
  const categories = ['Food', 'Travel', 'Marketing', 'Utilities', 'Other'];
  
  const categoryTotals = categories.map(cat => ({
    name: cat,
    amount: expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + exp.amount, 0)
  }));

  return (
    <section className="glass-card">
      <div className="total-display">
        <p>Total Spending</p>
        <h2>₹{totalAmount.toFixed(2)}</h2>
      </div>

      <div className="breakdown">
        <h3 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Spending by Category
        </h3>
        {categoryTotals.map(cat => {
          const percentage = totalAmount > 0 ? (cat.amount / totalAmount) * 100 : 0;
          return (
            <div key={cat.name} className="category-row">
              <div className="category-meta">
                <span>{cat.name}</span>
                <span>₹{cat.amount.toFixed(2)}</span>
              </div>
              <div className="progress-bg">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%`, background: `hsl(${150 + (categories.indexOf(cat.name) * 40)}, 70%, 50%)` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SummaryPanel;
