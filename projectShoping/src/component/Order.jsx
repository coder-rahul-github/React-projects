import React from 'react'

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
                    {[...orders].reverse().map((order) => (
                        <div
                            key={order.id}
                            className='border border-slate-200 rounded-2xl overflow-hidden shadow-sm'
                        >
                            {/* Order header */}
                            <div className='bg-slate-500 px-5 py-3 flex justify-between items-center text-black font-semibold'>
                                <span className='text-base'>Order #{order.orderNumber}</span>
                                <span className='text-sm text-slate-800'>{order.placedAt}</span>
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
                    ))}
                </div>
            )}
        </div>
    )
}

export default Order
