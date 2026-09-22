import React, { useState, useMemo } from 'react'
import Products from '../data/Products'

const STATUS_FLOW = ['Packing', 'Dispatch', 'Delivered']

const STATUS_CONFIG = {
  Packing: {
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.15)',
    border: 'rgba(245,158,11,0.4)',
    icon: '📦',
    next: 'Dispatch',
  },
  Dispatch: {
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.15)',
    border: 'rgba(59,130,246,0.4)',
    icon: '🚚',
    next: 'Delivered',
  },
  Delivered: {
    color: '#10b981',
    bg: 'rgba(16,185,129,0.15)',
    border: 'rgba(16,185,129,0.4)',
    icon: '✅',
    next: null,
  },
}

/* ---------- Stat Card ---------- */
function StatCard({ icon, label, value, sub, gradient }) {
  return (
    <div style={{
      background: gradient || 'linear-gradient(135deg,#1e293b,#0f172a)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '16px',
      padding: '1.4rem 1.6rem',
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.2)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* glow circle */}
      <div style={{
        position: 'absolute', top: '-20px', right: '-20px',
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'rgba(99,102,241,0.08)',
      }} />
      <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem' }}>{icon}</div>
      <div style={{ fontSize: '2rem', fontWeight: '700', color: '#f1f5f9', lineHeight: 1.1 }}>
        {value}
      </div>
      <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '0.3rem' }}>{label}</div>
      {sub && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.2rem' }}>{sub}</div>}
    </div>
  )
}

/* ---------- Mini Bar Chart ---------- */
function MiniBarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '80px', padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{
            width: '100%',
            height: `${(d.value / max) * 70}px`,
            minHeight: '4px',
            background: d.color || 'linear-gradient(180deg,#6366f1,#8b5cf6)',
            borderRadius: '4px 4px 0 0',
            transition: 'height 0.6s ease',
            position: 'relative',
          }}>
            <span style={{
              position: 'absolute', top: '-18px', left: '50%', transform: 'translateX(-50%)',
              fontSize: '0.65rem', color: '#94a3b8', whiteSpace: 'nowrap'
            }}>{d.value}</span>
          </div>
          <span style={{ fontSize: '0.6rem', color: '#64748b', textAlign: 'center', lineHeight: 1.1 }}>
            {d.label}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ---------- Tag Pill ---------- */
function TagPill({ tag, count }) {
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
  const color = colors[Math.abs(tag.charCodeAt(0) * 7) % colors.length]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '4px',
      padding: '3px 10px', borderRadius: '999px',
      background: color + '22', border: `1px solid ${color}55`,
      color, fontSize: '0.78rem', fontWeight: '600',
    }}>
      # {tag} <span style={{ background: color, color: 'white', borderRadius: '999px', padding: '0 5px', fontSize: '0.65rem' }}>{count}</span>
    </span>
  )
}

/* ========== MAIN ADMIN DASHBOARD ========== */
function AdminDashboard({ orders = [], updateOrderStatus, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [filterStatus, setFilterStatus] = useState('All')
  const [search, setSearch] = useState('')

  /* ---- Computed analytics ---- */
  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0)
    const totalItems = orders.reduce((s, o) => s + o.items.reduce((ss, { count }) => ss + count, 0), 0)

    // Product sales map
    const productSales = {}
    orders.forEach(o => {
      o.items.forEach(({ product, count }) => {
        if (!productSales[product.id]) {
          productSales[product.id] = { product, sold: 0, revenue: 0 }
        }
        productSales[product.id].sold += count
        productSales[product.id].revenue += Number(product.price) * count
      })
    })

    // Tag frequency map (across all products in orders)
    const tagCount = {}
    orders.forEach(o => {
      o.items.forEach(({ product }) => {
        (product.tags || []).forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1
        })
      })
    })

    // Also count tags in the catalog
    const catalogTagCount = {}
    Products.forEach(p => {
      (p.tags || []).forEach(tag => {
        catalogTagCount[tag] = (catalogTagCount[tag] || 0) + 1
      })
    })

    // Status distribution
    const statusDist = { Packing: 0, Dispatch: 0, Delivered: 0 }
    orders.forEach(o => { statusDist[o.status] = (statusDist[o.status] || 0) + 1 })

    return {
      totalRevenue, totalItems,
      productSales: Object.values(productSales).sort((a, b) => b.sold - a.sold),
      tagCount, catalogTagCount, statusDist,
    }
  }, [orders])

  /* ---- Filter orders ---- */
  const filteredOrders = useMemo(() => {
    return [...orders].reverse().filter(o => {
      const matchStatus = filterStatus === 'All' || o.status === filterStatus
      const matchSearch = search === '' ||
        o.orderNumber.toString().includes(search) ||
        o.items.some(({ product }) => product.name.toLowerCase().includes(search.toLowerCase()))
      return matchStatus && matchSearch
    })
  }, [orders, filterStatus, search])

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard' },
    { id: 'orders', label: '📋 Orders' },
    { id: 'products', label: '🛒 Products' },
    { id: 'tags', label: '🏷️ Tags' },
  ]

  const s = {
    page: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a0f1e 100%)',
      color: '#e2e8f0',
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      padding: '0 0 4rem',
    },
    header: {
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      borderBottom: '1px solid rgba(99,102,241,0.3)',
      padding: '1.5rem 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      flexWrap: 'wrap', gap: '1rem',
    },
    container: { maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' },
    tabBar: {
      display: 'flex', gap: '0.4rem', flexWrap: 'wrap',
      background: 'rgba(15,23,42,0.8)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '12px', padding: '6px',
      marginBottom: '2rem',
    },
    tab: (active) => ({
      padding: '0.55rem 1.2rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '600',
      fontSize: '0.875rem',
      transition: 'all 0.2s',
      background: active ? 'linear-gradient(135deg,#6366f1,#8b5cf6)' : 'transparent',
      color: active ? 'white' : '#64748b',
      boxShadow: active ? '0 4px 15px rgba(99,102,241,0.3)' : 'none',
    }),
    card: {
      background: 'linear-gradient(135deg, #1e293b, #0f172a)',
      border: '1px solid rgba(99,102,241,0.2)',
      borderRadius: '16px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
    },
    sectionTitle: {
      fontSize: '1rem', fontWeight: '700', color: '#c7d2fe',
      marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem',
    },
  }

  /* ---- RENDER ---- */
  return (
    <div style={s.page}>

      {/* Header */}
      <div style={s.header}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#f1f5f9', margin: 0 }}>
            🛡️ Admin Dashboard
          </h1>
          <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.2rem 0 0' }}>
            ProjectCart — Control Panel
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <span style={{
            padding: '0.4rem 1rem', borderRadius: '999px',
            background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
            color: '#10b981', fontSize: '0.8rem', fontWeight: '600',
          }}>● Live</span>
          <span style={{ color: '#64748b', fontSize: '0.8rem' }}>
            {orders.length} Total Orders
          </span>
        </div>
      </div>

      <div style={s.container}>

        {/* Tabs */}
        <div style={s.tabBar}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={s.tab(activeTab === t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* =========== DASHBOARD TAB =========== */}
        {activeTab === 'dashboard' && (
          <>
            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <StatCard icon="💰" label="Total Revenue" value={`₹${analytics.totalRevenue.toLocaleString()}`} sub="All-time earnings" />
              <StatCard icon="📦" label="Total Orders" value={orders.length} sub="Orders placed" />
              <StatCard icon="🛍️" label="Items Sold" value={analytics.totalItems} sub="Units across orders" />
              <StatCard icon="🏷️" label="Unique Tags" value={Object.keys(analytics.catalogTagCount).length} sub="Product categories" />
              <StatCard icon="🎯" label="Products" value={Products.length} sub="In catalog" />
              <StatCard icon="✅" label="Delivered" value={analytics.statusDist.Delivered || 0} sub={`${analytics.statusDist.Packing || 0} packing · ${analytics.statusDist.Dispatch || 0} transit`} />
            </div>

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>

              {/* Order Status Chart */}
              <div style={s.card}>
                <div style={s.sectionTitle}>📊 Orders by Status</div>
                {orders.length === 0 ? (
                  <p style={{ color: '#475569', fontSize: '0.85rem' }}>No orders yet.</p>
                ) : (
                  <>
                    <MiniBarChart data={[
                      { label: 'Packing', value: analytics.statusDist.Packing || 0, color: 'linear-gradient(180deg,#f59e0b,#d97706)' },
                      { label: 'Dispatch', value: analytics.statusDist.Dispatch || 0, color: 'linear-gradient(180deg,#3b82f6,#2563eb)' },
                      { label: 'Delivered', value: analytics.statusDist.Delivered || 0, color: 'linear-gradient(180deg,#10b981,#059669)' },
                    ]} />
                    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {STATUS_FLOW.map(st => {
                        const cfg = STATUS_CONFIG[st]
                        const cnt = analytics.statusDist[st] || 0
                        const pct = orders.length ? Math.round((cnt / orders.length) * 100) : 0
                        return (
                          <div key={st} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <span style={{ fontSize: '0.8rem', width: '70px', color: cfg.color }}>{cfg.icon} {st}</span>
                            <div style={{ flex: 1, height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                              <div style={{ height: '100%', width: `${pct}%`, background: cfg.color, borderRadius: '3px', transition: 'width 1s' }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: '#64748b', width: '30px', textAlign: 'right' }}>{cnt}</span>
                          </div>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Top Products */}
              <div style={s.card}>
                <div style={s.sectionTitle}>🏆 Top Products Sold</div>
                {analytics.productSales.length === 0 ? (
                  <p style={{ color: '#475569', fontSize: '0.85rem' }}>No sales yet.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {analytics.productSales.slice(0, 5).map(({ product, sold, revenue }, i) => (
                      <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          width: '24px', height: '24px', borderRadius: '50%',
                          background: i === 0 ? '#f59e0b' : i === 1 ? '#94a3b8' : i === 2 ? '#cd7f32' : '#334155',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.65rem', fontWeight: '700', color: 'white', flexShrink: 0,
                        }}>{i + 1}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, fontSize: '0.8rem', color: '#cbd5e1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {product.name}
                          </p>
                          <p style={{ margin: 0, fontSize: '0.7rem', color: '#64748b' }}>{sold} sold · ₹{revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Revenue Trend (per-order) */}
              <div style={s.card}>
                <div style={s.sectionTitle}>📈 Revenue per Order</div>
                {orders.length === 0 ? (
                  <p style={{ color: '#475569', fontSize: '0.85rem' }}>No orders yet.</p>
                ) : (
                  <MiniBarChart data={orders.slice(-6).map(o => ({
                    label: `#${o.orderNumber}`,
                    value: o.total,
                    color: 'linear-gradient(180deg,#6366f1,#8b5cf6)',
                  }))} />
                )}
              </div>
            </div>
          </>
        )}

        {/* =========== ORDERS TAB =========== */}
        {activeTab === 'orders' && (
          <>
            {/* Filters */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="🔍 Search orders..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.3)',
                  borderRadius: '10px', padding: '0.55rem 1rem', color: '#e2e8f0',
                  fontSize: '0.875rem', outline: 'none', minWidth: '200px',
                }}
              />
              {['All', ...STATUS_FLOW].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    border: filterStatus === st ? 'none' : '1px solid rgba(99,102,241,0.2)',
                    background: filterStatus === st
                      ? (st === 'All' ? 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                        : STATUS_CONFIG[st]?.bg || '#334155')
                      : 'transparent',
                    color: filterStatus === st
                      ? (st === 'All' ? 'white' : STATUS_CONFIG[st]?.color || '#e2e8f0')
                      : '#64748b',
                    cursor: 'pointer', fontSize: '0.8rem', fontWeight: '600',
                    transition: 'all 0.2s',
                  }}
                >
                  {st === 'All' ? 'All Orders' : `${STATUS_CONFIG[st].icon} ${st}`}
                  &nbsp;<span style={{ opacity: 0.7 }}>
                    ({st === 'All' ? orders.length : (analytics.statusDist[st] || 0)})
                  </span>
                </button>
              ))}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#475569', fontSize: '1rem' }}>No orders found.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {filteredOrders.map(order => {
                  const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Packing']
                  return (
                    <div key={order.id} style={{
                      ...s.card,
                      borderLeft: `4px solid ${cfg.color}`,
                      marginBottom: 0,
                    }}>
                      {/* Order Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1rem' }}>
                        <div>
                          <span style={{ fontWeight: '700', fontSize: '1rem', color: '#f1f5f9' }}>
                            Order #{order.orderNumber}
                          </span>
                          <span style={{ color: '#64748b', fontSize: '0.75rem', marginLeft: '0.75rem' }}>
                            {order.placedAt}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                          {/* Status badge */}
                          <span style={{
                            padding: '0.3rem 0.9rem', borderRadius: '999px',
                            background: cfg.bg, border: `1px solid ${cfg.border}`,
                            color: cfg.color, fontSize: '0.78rem', fontWeight: '700',
                          }}>
                            {cfg.icon} {order.status}
                          </span>
                          {/* Action buttons */}
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {STATUS_FLOW.filter(s => s !== order.status).map(nextSt => {
                              const ncfg = STATUS_CONFIG[nextSt]
                              // Only allow forward progression
                              const currentIdx = STATUS_FLOW.indexOf(order.status)
                              const nextIdx = STATUS_FLOW.indexOf(nextSt)
                              if (nextIdx !== currentIdx + 1) return null
                              return (
                                <button
                                  key={nextSt}
                                  onClick={() => updateOrderStatus(order.id, nextSt)}
                                  style={{
                                    padding: '0.35rem 0.85rem',
                                    borderRadius: '8px',
                                    border: `1px solid ${ncfg.border}`,
                                    background: ncfg.bg,
                                    color: ncfg.color,
                                    cursor: 'pointer',
                                    fontSize: '0.78rem',
                                    fontWeight: '600',
                                    transition: 'all 0.2s',
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                  {ncfg.icon} Mark {nextSt}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Status progress bar */}
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '1rem' }}>
                        {STATUS_FLOW.map((st, i) => {
                          const currentIdx = STATUS_FLOW.indexOf(order.status)
                          const done = i <= currentIdx
                          const stcfg = STATUS_CONFIG[st]
                          return (
                            <React.Fragment key={st}>
                              <div style={{
                                flex: 1, height: '6px', borderRadius: '3px',
                                background: done ? stcfg.color : 'rgba(255,255,255,0.07)',
                                transition: 'background 0.5s',
                              }} />
                              {i < STATUS_FLOW.length - 1 && (
                                <div style={{ width: '4px' }} />
                              )}
                            </React.Fragment>
                          )
                        })}
                      </div>

                      {/* Items */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {order.items.map(({ product, count }) => (
                          <div key={product.id} style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            background: 'rgba(255,255,255,0.03)', borderRadius: '8px',
                            padding: '0.5rem 0.75rem',
                          }}>
                            <img src={product.Image} alt={product.name}
                              style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', background: 'white' }} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <p style={{ margin: 0, fontSize: '0.82rem', color: '#cbd5e1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {product.name}
                              </p>
                              <p style={{ margin: 0, fontSize: '0.72rem', color: '#64748b' }}>
                                Qty: {count} × ₹{product.price}
                              </p>
                            </div>
                            <span style={{ fontWeight: '700', color: '#c7d2fe', fontSize: '0.9rem' }}>
                              ₹{Number(product.price) * count}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Total */}
                      <div style={{
                        display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem',
                        paddingTop: '0.75rem', borderTop: '1px solid rgba(99,102,241,0.15)',
                      }}>
                        <span style={{ fontWeight: '700', color: '#10b981', fontSize: '1rem' }}>
                          Total: ₹{order.total}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* =========== PRODUCTS TAB =========== */}
        {activeTab === 'products' && (
          <>
            <div style={s.card}>
              <div style={s.sectionTitle}>📦 Product Catalog & Sales Performance</div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
                      {['Product', 'Brand', 'Price', 'Old Price', 'Discount', 'Units Sold', 'Revenue', 'Tags'].map(h => (
                        <th key={h} style={{ padding: '0.75rem 0.75rem', textAlign: 'left', color: '#94a3b8', fontWeight: '600', whiteSpace: 'nowrap' }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Products.map(p => {
                      const sale = analytics.productSales.find(s => s.product.id === p.id)
                      const discount = Math.round((1 - Number(p.price) / Number(p.oldPrice)) * 100)
                      return (
                        <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <td style={{ padding: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <img src={p.Image} alt={p.name} style={{ width: '36px', height: '36px', objectFit: 'contain', background: 'white', borderRadius: '6px' }} />
                            <span style={{ color: '#cbd5e1', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {p.name}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem', color: '#94a3b8' }}>{p.brand?.join(', ')}</td>
                          <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: '700' }}>₹{p.price}</td>
                          <td style={{ padding: '0.75rem', color: '#64748b', textDecoration: 'line-through' }}>₹{p.oldPrice}</td>
                          <td style={{ padding: '0.75rem' }}>
                            <span style={{
                              background: 'rgba(16,185,129,0.15)', color: '#10b981',
                              borderRadius: '999px', padding: '2px 8px', fontSize: '0.75rem', fontWeight: '700',
                            }}>{discount}% off</span>
                          </td>
                          <td style={{ padding: '0.75rem', color: '#c7d2fe', fontWeight: '700', textAlign: 'center' }}>
                            {sale ? sale.sold : 0}
                          </td>
                          <td style={{ padding: '0.75rem', color: '#f59e0b', fontWeight: '700' }}>
                            ₹{sale ? sale.revenue : 0}
                          </td>
                          <td style={{ padding: '0.75rem' }}>
                            <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                              {(p.tags || []).map(tag => (
                                <TagPill key={tag} tag={tag} count={analytics.catalogTagCount[tag] || 0} />
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* =========== TAGS TAB =========== */}
        {activeTab === 'tags' && (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>

              {/* Catalog Tags */}
              <div style={s.card}>
                <div style={s.sectionTitle}>🏷️ Catalog Tags</div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  Tags used in the product catalog
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {Object.entries(analytics.catalogTagCount).map(([tag, count]) => (
                    <TagPill key={tag} tag={tag} count={count} />
                  ))}
                  {Object.keys(analytics.catalogTagCount).length === 0 && (
                    <p style={{ color: '#475569', fontSize: '0.85rem' }}>No tags found.</p>
                  )}
                </div>
              </div>

              {/* Order Tags */}
              <div style={s.card}>
                <div style={s.sectionTitle}>📊 Tags in Orders</div>
                <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '1rem' }}>
                  Tags from products that have been ordered
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {Object.entries(analytics.tagCount).map(([tag, count]) => (
                    <TagPill key={tag} tag={tag} count={count} />
                  ))}
                  {Object.keys(analytics.tagCount).length === 0 && (
                    <p style={{ color: '#475569', fontSize: '0.85rem' }}>No orders with tags yet.</p>
                  )}
                </div>
              </div>

              {/* Tag breakdown table */}
              <div style={{ ...s.card, gridColumn: '1 / -1' }}>
                <div style={s.sectionTitle}>📋 Tag Breakdown</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {Object.entries(analytics.catalogTagCount).map(([tag, totalProds]) => {
                    const orderedCount = analytics.tagCount[tag] || 0
                    const pct = totalProds ? Math.round((orderedCount / totalProds) * 100) : 0
                    const tagColor = '#6366f1'
                    return (
                      <div key={tag} style={{
                        background: 'rgba(255,255,255,0.03)', borderRadius: '10px',
                        padding: '0.9rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem',
                      }}>
                        <TagPill tag={tag} count={totalProds} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Order frequency</span>
                            <span style={{ fontSize: '0.78rem', color: '#c7d2fe' }}>{orderedCount} times ordered</span>
                          </div>
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: tagColor, borderRadius: '3px', transition: 'width 1s' }} />
                          </div>
                        </div>
                        <span style={{ fontSize: '0.8rem', color: '#64748b', whiteSpace: 'nowrap' }}>
                          {totalProds} product{totalProds !== 1 ? 's' : ''}
                        </span>
                      </div>
                    )
                  })}
                  {Object.keys(analytics.catalogTagCount).length === 0 && (
                    <p style={{ color: '#475569', fontSize: '0.85rem' }}>No tags in catalog.</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default AdminDashboard
