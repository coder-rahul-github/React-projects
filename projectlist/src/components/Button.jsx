import React from 'react'

function Button({ text, type, size, onClick }) {
    const baseStyle = "px-4 py-2 rounded text-black font-bold border-2";
    const Style = {
        primary: "bg-blue-500 hover:bg-blue-600",
        secondary: "bg-green-500 hover:bg-green-600",
        danger: "bg-red-500 hover:bg-red-600",
    };
    const Size = {
        small: "px-2 py-1 text-sm",
        medium: "px-3 py-2 text-base",
        large: "px-4 py-3 text-lg "
    }
    return (
        <button onClick={onClick}
            className={`${baseStyle} ${Style[type]} ${Size[size]}`}>{text}</button>
    )
}

export default Button
