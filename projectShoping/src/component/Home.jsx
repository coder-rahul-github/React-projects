import React from 'react'
import ProductCard from './ProductCard'
import Products from '../data/Products';

function Home() {
    return (
        <div className='min-h-screen bg-white px-4 py-6'>
            <div className='grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4'>
                {Products.map((product)=>(
                    <ProductCard
                    key={product.id}
                    product={product}/>
                ))}
            </div>

        </div>
    );
}

export default Home
