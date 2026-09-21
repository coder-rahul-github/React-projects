import React from 'react'
import ProductCard from './ProductCard'

// Wishlist receives the shared wishlist + cart from App
function Wishlist({ wishlist = [], toggleWishlist, cart, updateCart }) {
    return (
        <div className='min-h-screen bg-white px-4 py-6'>
            <h1 className='text-3xl font-bold mb-6'>My Wishlist ({wishlist.length})</h1>

            {wishlist.length === 0 ? (
                <p className='text-slate-500 text-xl'>
                    Your wishlist is empty. Click the ❤️ on any product to add it here!
                </p>
            ) : (
                <div className='grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4'>
                    {wishlist.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            wishlist={wishlist}
                            toggleWishlist={toggleWishlist}
                            cart={cart}
                            updateCart={updateCart}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Wishlist
