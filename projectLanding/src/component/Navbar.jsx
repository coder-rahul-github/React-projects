import React from 'react'
import {Link} from 'react-router';

function Navbar() {
    const NavLinks=[
        {label:"Home",href:"/Home"},
        {label:"Products",href:"/Products"},
        {label:"Pricing",href:"/Pricing"},
        {label:"Images",href:"/Images"},
        
    ]
    
    return (
        <div className='bg-white flex justify-between'>

        <nav className='flex items-center w-full px-6'>
            <div className='m-2'>
                <img className='w-16' src="./LSlogo.png" alt='logo' />
            </div>
            
            <ul className='absolute left-120  flex items-center gap-8'>
                {NavLinks.map((link)=>(
                    <li key={link.label}>
                    <Link className='hover:text-gray-500' to={link.href}>{link.label}</Link>
                    
                </li>
            ))}
            
            </ul>
            <div className='absolute right-10'>
            <Link to="/login">
            
            <button className=' p-2 rounded-xl hover:bg-pink-200 focus:bg-yellow-200 active:bg-emerald-200 cursor-pointer'>
                Login</button>
                </Link>
                </div>

        </nav>
        </div>
    )
}

export default Navbar
