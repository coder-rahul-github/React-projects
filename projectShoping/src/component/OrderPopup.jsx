import React, { useState } from 'react'

// Floating order summary popup - fixed at bottom-right
function OrderPopup({ cart, placeOrder }) {
    const [isOpen, setIsOpen] = useState(true)

    // Convert cart object to array for rendering
    const cartItems = Object.values(cart)

    // Calculate grand total
    const totalAmount = cartItems.reduce(
        (sum, { product, count }) => sum + Number(product.price) * count,
        0
    )

    // Total items count
    const totalQty = cartItems.reduce((sum, { count }) => sum + count, 0)

    // Don't render popup if cart is empty
    if (cartItems.length === 0) return null

    return (
        <div className='fixed bottom-4 right-4 z-50 w-80 shadow-2xl rounded-2xl overflow-hidden'>

            {/* Header / Toggle bar */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='w-full bg-slate-500 text-black font-semibold px-4 py-3 flex justify-between items-center hover:bg-slate-400 transition-colors'
            >
                <span className='text-base'>🛒 My Order &nbsp;
                    <span className='bg-green-600 text-white text-xs rounded-full px-2 py-0.5'>
                        {totalQty}
                    </span>
                </span>
                <span className='text-lg'>{isOpen ? '▲' : '▼'}</span>
            </button>

            {/* Expandable body */}
            {isOpen && (
                <div className='bg-slate-500 px-4 pb-4 text-black font-semibold'>

                    {/* Product list - scrollable if many items */}
                    <div className='max-h-56 overflow-y-auto space-y-2 pt-3 pr-1'>
                        {cartItems.map(({ product, count }) => (
                            <div
                                key={product.id}
                                className='flex justify-between items-start border-b border-slate-400 pb-2'
                            >
                                <div className='flex-1 pr-3'>
                                    {/* Product name - truncated to 1 line */}
                                    <p className='text-sm leading-snug line-clamp-1'>{product.name}</p>
                                    {/* Qty × unit price */}
                                    <p className='text-xs text-slate-800 mt-0.5'>
                                        {count} × ₹{product.price}
                                    </p>
                                </div>
                                {/* Subtotal */}
                                <span className='text-sm whitespace-nowrap'>
                                    ₹{Number(product.price) * count}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Grand Total row */}
                    <div className='flex justify-between items-center pt-3 mt-1 border-t-2 border-slate-400'>
                        <span className='text-base'>Grand Total</span>
                        <span className='text-lg'>₹{totalAmount}</span>
                    </div>

                    {/* Place Order button */}
                    <button
                        onClick={placeOrder}
                        className='w-full mt-3 bg-green-600 text-white rounded-xl py-2 text-base font-bold hover:bg-green-700 active:scale-95 transition-all'>
                        Place Order
                    </button>

                </div>
            )}
        </div>
    )
}

export default OrderPopup
