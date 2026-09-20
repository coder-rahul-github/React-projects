import React, { useState } from 'react'

function ProductCard({product}) {
    console.log(product);
    const[color,setColor]=useState("🤍")
    
    return (
        <div className='w-full'>
            <div className='relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50'>
            <img className='h-64 w-full object-contain'
                src={product.Image}
                alt={product.name}/>

            <button className='absolute right-4 top-4 text-3xl cursor-pointer' onClick={()=>setColor(color==="🤍"?"❤️":"🤍")}>
                {color}
            </button>
            <button className=' rounded-2xl border-2 border-green-600 px-7 py-4 text-xl font-bold text-green-600 hover:bg-green-600 hover:text-white'>
                ADD
            </button>
            </div>
            <div className='mt-4 flex-item-center gap-3'>
                <span className='text-4xl font-bold'>
                    ₹{product.price}
                </span>
                <span className='text-xl text-slate-500 line-through'>
                    ₹{product.oldPrice}
                </span>
            </div>
            
            <h2 className='mt-2 text-2xl font-semibold leading-tight'>
                {product.name}
            </h2>
            <div className='mt-4 flex flex-wrap gap-2'>
                {product.tags.map((tag)=>(
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
