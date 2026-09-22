import React, { useState } from 'react'
import { Link } from 'react-router'

function Footer() {
  const [clickCount, setClickCount] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Secret admin access: click logo 5 times
  function handleLogoClick() {
    const next = clickCount + 1
    setClickCount(next)
    if (next === 3) setShowHint(true)
    if (next >= 5) {
      setClickCount(0)
      setShowHint(false)
      window.location.href = '/admin'
    }
  }

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      borderTop: '1px solid rgba(99,102,241,0.3)',
      padding: '3rem 1.5rem 1.5rem',
      marginTop: '4rem',
      color: '#94a3b8',
      fontFamily: "'Inter', sans-serif"
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>

          {/* Brand Column */}
          <div>
            <div
              onClick={handleLogoClick}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                cursor: 'pointer', userSelect: 'none', marginBottom: '1rem'
              }}
              title={showHint ? `${5 - clickCount} more clicks for admin` : ''}
            >
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 'bold', fontSize: '1.1rem',
                boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                transition: 'transform 0.2s',
              }}>P</div>
              <span style={{ color: '#e2e8f0', fontWeight: '700', fontSize: '1.1rem' }}>
                ProjectCart
              </span>
            </div>
            {showHint && (
              <p style={{ fontSize: '0.7rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
                🔐 {5 - clickCount} more click{5 - clickCount !== 1 ? 's' : ''} for admin access
              </p>
            )}
            <p style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              Your one-stop shop for premium electronics and gadgets.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Menu', to: '/menu' },
                { label: 'My Orders', to: '/order' },
                { label: 'Wishlist', to: '/wishlist' },
                { label: 'About Us', to: '/about' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.to} style={{
                    color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.color = '#6366f1'}
                    onMouseLeave={e => e.target.style.color = '#94a3b8'}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Electronics', 'Accessories', 'Gadgets', 'Cables & Chargers', 'Storage'].map(cat => (
                <li key={cat} style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  # {cat}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#e2e8f0', fontWeight: '600', marginBottom: '1rem', fontSize: '0.95rem' }}>
              Contact
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <p>📧 support@projectcart.in</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Mumbai, Maharashtra, India</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.4), transparent)',
          marginBottom: '1.5rem'
        }} />

        {/* Bottom bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem'
        }}>
          <p>© 2025 ProjectCart. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#6366f1'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}>Privacy Policy</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#6366f1'}
              onMouseLeave={e => e.target.style.color = '#94a3b8'}>Terms of Service</span>
            {/* Subtle admin link — styled to blend in */}
            <Link
              to="/admin"
              style={{ color: '#1e293b', textDecoration: 'none', fontSize: '0.75rem', transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = '#6366f1'}
              onMouseLeave={e => e.target.style.color = '#1e293b'}
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
