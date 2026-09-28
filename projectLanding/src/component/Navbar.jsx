import React from 'react'
import {Link} from 'react-router';

function Navbar() {
    const NavLinks=[
        {label:"Home",href:"/Home"},
        {label:"Products",href:"/Products"},
        {label:"Pricing",href:"/Pricing"},
        {label:"Images",href:"/Images"}
    ]
    
    return (
        <header className='bg-white'>

        <nav className='flex justify-between items-center  w-[60%]'>
            <div className='m-2'>
                <img className='w-16' src="./LSlogo.png" alt='logo' />
            </div>
            <div >
            <ul className='flex items-center gap-4'>
                {NavLinks.map((link)=>(
                    <li key={link.label}>
                    <Link className='hover:text-gray-500' to={link.href}>{link.label}</Link>
                </li>
            ))}
            </ul>
            </div>

        </nav>
        </header>
    )
}

export default Navbar
