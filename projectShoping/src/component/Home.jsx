import React, { useState } from 'react'
import ProductCard from './ProductCard'
import Products from '../data/Products';

// Home receives wishlist + cart state from App
function Home({ wishlist, toggleWishlist, cart, updateCart }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = Products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='min-h-screen bg-white px-4 py-6'>
            <div className='mb-6 flex justify-center'>
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
                />
            </div>
            <div className='grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:grid-cols-6'>
                {filteredProducts.map((product)=>(
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
