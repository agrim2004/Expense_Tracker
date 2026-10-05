import { useState } from 'react';
import { api, setAuthData } from '../api';

function Auth({ onAuthSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      let result;
      if (isRegister) {
        if (!name.trim()) {
          throw new Error('Please enter your full name');
        }
        result = await api.register(name.trim(), email.trim(), password);
      } else {
        result = await api.login(email.trim(), password);
      }

      setAuthData(result.token, result.user);
      onAuthSuccess(result.user);
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '560px',
      margin: '2rem auto 4rem auto',
      width: '100%'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          padding: '3.5rem 3rem',
          borderRadius: '24px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 136, 0.08)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ 
            fontSize: '2.4rem', 
            color: 'var(--text-primary)', 
            marginBottom: '0.8rem',
            fontWeight: '700',
            letterSpacing: '-0.02em'
          }}>
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.05rem',
            lineHeight: 1.5
          }}>
            {isRegister
              ? 'Sign up to track and manage your personal expenses'
              : 'Sign in to access your expenses'}
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255, 77, 77, 0.15)',
            border: '1px solid var(--danger)',
            color: '#ff8080',
            padding: '1rem 1.2rem',
            borderRadius: '12px',
            marginBottom: '1.8rem',
            fontSize: '0.95rem'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="form-group" style={{ marginBottom: '1.6rem' }}>
              <label htmlFor="auth-name" style={{ fontSize: '1rem', marginBottom: '0.4rem', display: 'block' }}>
                Your Name
              </label>
              <input
                id="auth-name"
                type="text"
                placeholder="e.g. Agrim Gupta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={isRegister}
                style={{
                  minHeight: '56px',
                  fontSize: '1.05rem',
                  padding: '1rem 1.2rem',
                  borderRadius: '14px'
                }}
              />
            </div>
          )}

          <div className="form-group" style={{ marginBottom: '1.6rem' }}>
            <label htmlFor="auth-email" style={{ fontSize: '1rem', marginBottom: '0.4rem', display: 'block' }}>
              Email Address
            </label>
            <input
              id="auth-email"
              type="email"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                minHeight: '56px',
                fontSize: '1.05rem',
                padding: '1rem 1.2rem',
                borderRadius: '14px'
              }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label htmlFor="auth-password" style={{ fontSize: '1rem', marginBottom: '0.4rem', display: 'block' }}>
              Password
            </label>
            <input
              id="auth-password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              style={{
                minHeight: '56px',
                fontSize: '1.05rem',
                padding: '1rem 1.2rem',
                borderRadius: '14px'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ 
              minHeight: '58px',
              fontSize: '1.15rem',
              fontWeight: '700',
              borderRadius: '14px',
              opacity: loading ? 0.7 : 1, 
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(0, 255, 136, 0.25)'
            }}
          >
            {loading ? 'Please wait...' : isRegister ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '1.05rem' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            {isRegister ? 'Already have an account? ' : "Don't have an account? "}
          </span>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              cursor: 'pointer',
              fontWeight: '700',
              textDecoration: 'underline',
              padding: 0,
              fontSize: '1.05rem',
              minHeight: 'auto'
            }}
          >
            {isRegister ? 'Sign In' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
