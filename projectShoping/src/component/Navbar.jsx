import React from 'react'
import { useState, useEffect } from "react";

function Navbar() {

    const NAV_LINKS = [
    { label: "Home", href: "#home" },
    { label: "Order", href: "#order" },
    { label: "Wishlist", href: "#wishlist" },
    { label: "About", href: "#about" },
    ];

    export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);

    // Apply dark mode to the whole page
    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDark);
    }, [isDark]);

    return (
        <header className="sticky top-0 z-50 bg-white shadow dark:bg-slate-900">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

            {/* Logo */}
            <a href="#home" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                P
            </span>

            <span className="text-lg font-semibold text-slate-800 dark:text-white">
                ProjectCart
            </span>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden md:flex gap-6">
            {NAV_LINKS.map((link) => (
                <li key={link.label}>
                <a
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 dark:text-slate-200"
                >
                    {link.label}
                </a>
                </li>
            ))}
            </ul>

            {/* Buttons */}
            <div className="flex items-center gap-2">

            {/* Dark Mode */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="rounded px-3 py-2 text-slate-700 dark:text-white"
            >
                {isDark ? "☀️" : "🌙"}
            </button>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden rounded px-3 py-2 text-xl dark:text-white"
            >
                {isOpen ? "✕" : "☰"}
            </button>

            </div>
        </nav>

        {/* Mobile Menu */}
        {isOpen && (
            <ul className="md:hidden bg-white px-4 py-3 dark:bg-slate-900">
            {NAV_LINKS.map((link) => (
                <li key={link.label}>
                <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-slate-700 hover:text-blue-600 dark:text-white"
                >
                    {link.label}
                </a>
                </li>
            ))}
            </ul>
        )}
        </header>
    );
    }


}
    

export default Navbar
