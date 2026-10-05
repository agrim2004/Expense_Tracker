import { useState, useEffect } from 'react'

function CurrencyConverter({ totalAmount }) {
  const [targetCurrency, setTargetCurrency] = useState('INR')
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [rates, setRates] = useState({})

  const currencies = [
  'USD',
  'INR',
  'EUR',
  'GBP',
  'CAD',
  'AUD',
  'JPY'
]

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true)
      setError(null)
      try {
        // I chose the Frankfurter API because it's open-source, fast, and 
        // doesn't require an API key—perfect for a project like this.
        const response = await fetch(`https://open.er-api.com/v6/latest/INR`)
        if (!response.ok) throw new Error('Failed to fetch exchange rates')
        const data = await response.json()
        setRates(data.rates)
      } catch{
        // Fallback logic: if the API is down, we use these hardcoded rates 
        // so the user experience doesn't break.
        setError('Currency API unavailable. Showing estimated rates.')
        setRates({
          USD: 0.012,
          EUR: 0.011,
          GBP: 0.0095,
          INR: 1,
          CAD: 0.016,
          AUD: 0.018,
          JPY: 1.8
        })
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  useEffect(() => {
    const amount = Number(totalAmount) || 0

if (targetCurrency === 'INR') {
  setConvertedAmount(amount)
} 
  else if (rates[targetCurrency]) {
  setConvertedAmount(amount * rates[targetCurrency])
}
  }, [totalAmount, targetCurrency, rates])

  return (
    <section className="glass-card currency-card">
      <div className="currency-header">
        <h2 style={{ fontSize: '2.1rem' }}>Currency Conversion</h2>
        <div className="status-indicator">
          {loading ? (
            <span className="loading-dots">Updating</span>
          ) : error ? (
            <span style={{ color: 'var(--danger)', fontSize: '0.7rem' }}>Offline Mode</span>
          ) : (
            <span style={{ color: 'var(--success)', fontSize: '0.7rem' }}>● Live Rates</span>
          )}
        </div>
      </div>

      <div className="converter-controls">
        <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
          <select 
            value={targetCurrency} 
            onChange={(e) => setTargetCurrency(e.target.value)}
            style={{ width: '100%' }}
          >
            {currencies.map(curr => (
              <option key={curr} value={curr}>{curr}</option>
            ))}
          </select>
        </div>

        <div className="conversion-result">
          {convertedAmount !== null ? (
            <div className="result-value">
              <span className="symbol">{targetCurrency}</span>
              <span className="value">{convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          ) : (
            <span className="placeholder">---</span>
          )}
        </div>
      </div>
    </section>
  )
}

export default CurrencyConverter
