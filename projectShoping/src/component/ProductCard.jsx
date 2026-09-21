import React from 'react'

// ProductCard receives wishlist, toggleWishlist, cart, updateCart from parent
function ProductCard({ product, wishlist = [], toggleWishlist, cart = {}, updateCart }) {

    // Derived: is this product wishlisted?
    const isWishlisted = wishlist.some((item) => item.id === product.id)

    // Derived: current qty from shared cart state (0 if not in cart)
    const count = cart[product.id]?.count || 0

    return (
        <div className='w-full'>
            <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'>
            <img className='h-64 w-full object-contain'
                src={product.Image}
                alt={product.name}/>

                {/* Heart button */}
                <button
                    className='absolute right-4 top-4 text-3xl cursor-pointer'
                    onClick={() => toggleWishlist(product)}>
                    {isWishlisted ? "❤️" : "🤍"}
                </button>

                {/* ADD / qty counter */}
                {count === 0 ? (
                    <button
                        className='rounded-2xl border-2 border-green-600 px-7 py-4 text-xl font-bold text-green-600 hover:bg-green-600 hover:text-white'
                        onClick={() => updateCart(product, 1)}>
                        ADD
                    </button>
                ) : (
                    <div className='flex items-center gap-5 rounded-xl bg-green-600 px-4 py-2 text-white font-bold text-3xl'>
                        {/* Minus: removes from cart when hitting 0 */}
                        <button onClick={() => updateCart(product, count - 1)}>-</button>
                        <span>{count}</span>
                        <button onClick={() => updateCart(product, count + 1)}>+</button>
                    </div>
                )}
            </div>

            <div className='mt-4 flex-item-center gap-3'>
                <span className='text-4xl font-bold'>₹{product.price}</span>
                <span className='text-xl text-slate-500 line-through'>₹{product.oldPrice}</span>
            </div>

            <h2 className='mt-2 text-2xl font-semibold leading-tight'>{product.name}</h2>

            <div className='mt-4 flex flex-wrap gap-2'>
                {product.tags.map((tag) => (
                    <span
                        key={tag}
                        className='rounded-lg border bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-900'>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default ProductCard
