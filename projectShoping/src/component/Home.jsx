import React from 'react'
import ProductCard from './ProductCard'
import Products from '../data/Products';

// Home receives wishlist + cart state from App
function Home({ wishlist, toggleWishlist, cart, updateCart }) {
    return (
        <div className='min-h-screen bg-white px-4 py-6'>
            <div className='grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4'>
                {Products.map((product)=>(
                    <ProductCard
                    key={product.id}
                    product={product}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    cart={cart}
                    updateCart={updateCart}/>
                ))}
            </div>
        </div>
    );
}

export default Home
