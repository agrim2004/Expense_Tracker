import { useState } from 'react'

function ExpenseForm({ onAddExpense }) {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState(getTodayString())

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !amount) return
    
    onAddExpense({ 
      name, 
      amount: parseFloat(amount), 
      category,
      date: date || getTodayString()
    })
    setName('')
    setAmount('')
    setDate(getTodayString())
  }

  return (
    <section className="glass-card">
      <h2 style={{ marginBottom: '1.5rem', fontSize: '2.1rem' }}>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Expense Name</label>
          <input 
            id="name"
            type="text" 
            placeholder="e.g. Office Lunch" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount (₹)</label>
          <input 
            id="amount"
            type="number" 
            step="0.01" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category"
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Marketing">Marketing</option>
            <option value="Utilities">Utilities</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Expense Date</label>
          <input 
            id="date"
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)}
            required
            style={{
              colorScheme: 'dark'
            }}
          />
        </div>

        <button type="submit" className="btn-primary">Add Expense</button>
      </form>
    </section>
  )
}

export default ExpenseForm
