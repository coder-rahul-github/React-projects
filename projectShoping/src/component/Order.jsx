import React from 'react'

const STATUS_CONFIG = {
  Packing: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)', border: 'rgba(245,158,11,0.4)', icon: '📦' },
  Dispatch: { color: '#3b82f6', bg: 'rgba(59,130,246,0.15)', border: 'rgba(59,130,246,0.4)', icon: '🚚' },
  Delivered: { color: '#10b981', bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.4)', icon: '✅' },
}

const STATUS_FLOW = ['Packing', 'Dispatch', 'Delivered']

// Order page receives the orders history array from App
function Order({ orders = [] }) {
  return (
    <div className='min-h-screen bg-white px-4 py-6'>
      <h1 className='text-3xl font-bold mb-6'>My Orders ({orders.length})</h1>

      {/* Empty state */}
      {orders.length === 0 ? (
        <p className='text-slate-500 text-xl'>
          No orders yet. Add products and click "Place Order" to see them here!
        </p>
      ) : (
        <div className='space-y-6'>
          {/* Show newest order first */}
          {[...orders].reverse().map((order) => {
            const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG['Packing']
            return (
              <div
                key={order.id}
                className='border border-slate-200 rounded-2xl overflow-hidden shadow-sm'
                style={{ borderLeft: `4px solid ${cfg.color}` }}
              >
                {/* Order header */}
                <div className='bg-slate-500 px-5 py-3 flex justify-between items-center text-black font-semibold flex-wrap gap-2'>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span className='text-base'>Order #{order.orderNumber}</span>
                    {/* Status badge */}
                    <span style={{
                      padding: '2px 10px', borderRadius: '999px',
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      color: cfg.color, fontSize: '0.75rem', fontWeight: '700',
                    }}>
                      {cfg.icon} {order.status}
                    </span>
                  </div>
                  <span className='text-sm text-slate-800'>{order.placedAt}</span>
                </div>

                {/* Status progress steps */}
                <div style={{
                  padding: '0.75rem 1.25rem',
                  background: '#f8fafc',
                  display: 'flex', alignItems: 'center', gap: '0',
                  borderBottom: '1px solid #e2e8f0',
                }}>
                  {STATUS_FLOW.map((st, i) => {
                    const currentIdx = STATUS_FLOW.indexOf(order.status)
                    const stcfg = STATUS_CONFIG[st]
                    const done = i <= currentIdx
                    const active = i === currentIdx
                    return (
                      <React.Fragment key={st}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div style={{
                            width: '30px', height: '30px', borderRadius: '50%',
                            background: done ? stcfg.color : '#e2e8f0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.9rem',
                            boxShadow: active ? `0 0 0 3px ${stcfg.color}33` : 'none',
                            transition: 'all 0.3s',
                          }}>
                            {done ? stcfg.icon : '○'}
                          </div>
                          <span style={{ fontSize: '0.65rem', color: done ? stcfg.color : '#94a3b8', fontWeight: done ? '700' : '400', whiteSpace: 'nowrap' }}>
                            {st}
                          </span>
                        </div>
                        {i < STATUS_FLOW.length - 1 && (
                          <div style={{
                            flex: 1, height: '3px', margin: '0 4px',
                            background: i < currentIdx ? cfg.color : '#e2e8f0',
                            marginBottom: '16px',
                            transition: 'background 0.5s',
                          }} />
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>

                {/* Order items */}
                <div className='divide-y divide-slate-100'>
                  {order.items.map(({ product, count }) => (
                    <div
                      key={product.id}
                      className='flex items-center gap-4 px-5 py-3'
                    >
                      {/* Product image */}
                      <img
                        src={product.Image}
                        alt={product.name}
                        className='h-16 w-16 object-contain rounded-lg bg-slate-50 border border-slate-100 flex-shrink-0'
                      />
                      {/* Name + qty */}
                      <div className='flex-1'>
                        <p className='font-semibold text-sm leading-snug'>{product.name}</p>
                        <p className='text-slate-500 text-xs mt-1'>
                          Qty: {count} &nbsp;×&nbsp; ₹{product.price}
                        </p>
                      </div>
                      {/* Subtotal */}
                      <span className='font-bold text-base whitespace-nowrap'>
                        ₹{Number(product.price) * count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Order total footer */}
                <div className='bg-slate-50 px-5 py-3 flex justify-between items-center border-t border-slate-200'>
                  <span className='font-semibold text-slate-600'>
                    {order.items.reduce((s, { count }) => s + count, 0)} item(s)
                  </span>
                  <span className='font-bold text-xl'>Total: ₹{order.total}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Order
