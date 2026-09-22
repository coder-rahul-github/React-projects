import React, { useState } from 'react'

// ⚠️ Change this password to whatever you want
const ADMIN_PASSWORD = 'admin@123'

function AdminLogin({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [shaking, setShaking] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    // Simulate slight delay for feel
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        setError('')
        onSuccess()
      } else {
        setShaking(true)
        setError('Incorrect password. Try again.')
        setPassword('')
        setLoading(false)
        setTimeout(() => setShaking(false), 500)
      }
    }, 600)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 60%, #0a0f1e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter','Segoe UI',sans-serif",
      padding: '1rem',
    }}>

      {/* Glowing background orbs */}
      <div style={{
        position: 'fixed', top: '20%', left: '15%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '20%', right: '15%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(135deg, rgba(30,41,59,0.9), rgba(15,23,42,0.95))',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '24px',
          padding: '2.5rem 2rem',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.1)',
          backdropFilter: 'blur(20px)',
          animation: shaking ? 'shake 0.5s ease' : 'none',
        }}
      >
        {/* Lock Icon */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '70px', height: '70px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 0 30px rgba(99,102,241,0.4)',
            fontSize: '2rem',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite',
          }}>
            🔐
          </div>
          <h1 style={{
            color: '#f1f5f9', fontWeight: '800', fontSize: '1.6rem',
            margin: '0 0 0.3rem',
            background: 'linear-gradient(135deg, #c7d2fe, #a5b4fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Admin Access
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', margin: 0 }}>
            Enter your admin password to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Password field */}
          <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
            <label style={{
              display: 'block', color: '#94a3b8', fontSize: '0.8rem',
              fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => { setPassword(e.target.value); setError('') }}
                placeholder="Enter admin password"
                autoFocus
                style={{
                  width: '100%',
                  padding: '0.8rem 3rem 0.8rem 1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: error
                    ? '1px solid rgba(239,68,68,0.6)'
                    : '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '12px',
                  color: '#e2e8f0',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'border 0.2s, box-shadow 0.2s',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                onFocus={e => {
                  e.target.style.border = '1px solid rgba(99,102,241,0.7)'
                  e.target.style.boxShadow = '0 0 0 3px rgba(99,102,241,0.15)'
                }}
                onBlur={e => {
                  e.target.style.border = error
                    ? '1px solid rgba(239,68,68,0.6)'
                    : '1px solid rgba(99,102,241,0.3)'
                  e.target.style.boxShadow = 'none'
                }}
              />
              {/* Show/hide toggle */}
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontSize: '1.1rem', padding: '2px',
                }}
                title={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <p style={{
                color: '#f87171', fontSize: '0.78rem',
                marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                ⚠️ {error}
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading || !password}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '12px',
              border: 'none',
              background: loading
                ? 'rgba(99,102,241,0.5)'
                : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              color: 'white',
              fontWeight: '700',
              fontSize: '0.95rem',
              cursor: loading || !password ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: loading ? 'none' : '0 4px 15px rgba(99,102,241,0.4)',
              opacity: !password ? 0.6 : 1,
              fontFamily: 'inherit',
            }}
            onMouseEnter={e => {
              if (!loading && password) {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(99,102,241,0.5)'
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = loading ? 'none' : '0 4px 15px rgba(99,102,241,0.4)'
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⏳</span>
                Verifying...
              </span>
            ) : (
              '🔓 Unlock Admin Panel'
            )}
          </button>
        </form>

        {/* Hint */}
        <p style={{
          textAlign: 'center', marginTop: '1.5rem',
          color: '#334155', fontSize: '0.72rem',
        }}>
          🔒 Restricted access — authorized personnel only
        </p>
      </div>

      {/* Shake + spin keyframes injected inline */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px); }
          30% { transform: translateX(8px); }
          45% { transform: translateX(-6px); }
          60% { transform: translateX(6px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.4); }
          50% { box-shadow: 0 0 40px rgba(99,102,241,0.7); }
        }
      `}</style>
    </div>
  )
}

export default AdminLogin
