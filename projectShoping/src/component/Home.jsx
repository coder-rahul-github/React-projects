import React, { useState, useMemo } from 'react'
import ProductCard from './ProductCard'
import Products from '../data/Products';

// Home receives wishlist + cart state from App
function Home({ wishlist, toggleWishlist, cart, updateCart }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Extract unique categories and brands
    const allCategories = useMemo(() => {
        return [...new Set(Products.flatMap(p => p.tags || []))].sort();
    }, []);

    const allBrands = useMemo(() => {
        return [...new Set(Products.flatMap(p => p.brand || []))].sort();
    }, []);

    const toggleCategory = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const toggleBrand = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const filteredProducts = Products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(c => product.tags?.includes(c));
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.some(b => product.brand?.includes(b));
        return matchesSearch && matchesCategory && matchesBrand;
    });

    return (
        <div className='min-h-screen bg-gray-50 dark:bg-slate-900 flex flex-col md:flex-row px-4 py-6 gap-6'>
            {/* Sidebar */}
            <aside className='w-full md:w-64 flex-shrink-0 bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700 h-fit'>
                <h2 className='text-xl font-bold mb-4 text-gray-800'>Filters</h2>
                
                {/* Search */}
                <div className='mb-6'>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                    />
                </div>

                {/* Categories */}
                <div className='mb-6'>
                    <h3 className='font-semibold text-gray-700 dark:text-slate-200 mb-3 border-b dark:border-slate-600 pb-2'>Categories</h3>
                    <div className='flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar'>
                        {allCategories.map(category => (
                            <label key={category} className='flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                                <input 
                                    type="checkbox" 
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => toggleCategory(category)}
                                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                                />
                                <span className='capitalize'>{category}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Brands */}
                <div>
                    <h3 className='font-semibold text-gray-700 dark:text-slate-200 mb-3 border-b dark:border-slate-600 pb-2'>Brands</h3>
                    <div className='flex flex-col gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar'>
                        {allBrands.map(brand => (
                            <label key={brand} className='flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors'>
                                <input 
                                    type="checkbox" 
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleBrand(brand)}
                                    className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                                />
                                <span>{brand}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Product Grid */}
            <div className='flex-1'>
                <div className='mb-4 text-gray-600 dark:text-slate-400 text-sm font-medium'>
                    Showing {filteredProducts.length} product(s)
                </div>
                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <p className="text-lg">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                        {filteredProducts.map((product) => (
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
        </div>
    );
}

export default Home;
