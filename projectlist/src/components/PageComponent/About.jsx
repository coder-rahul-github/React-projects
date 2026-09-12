import React from 'react'
import todo_icon from '../../assets/todo_icon.png'


function About() {
    return (
    <div className='bg-white place-self-center w-11/12 max-w-md p-7 mt-5 flex flex-col min-h-550px rounded'>
        <div className='flex items-center gap-2'>
            <img className='w-8' src={todo_icon} alt="" />
            <p className='text-3xl font-semibold'>To-do List</p>
        </div>
        <div className='flex items-center my-7 rounded-full bg-gray-200'>
            <input className='bg-transparent border-0 outline-none h-14 flex-1 pl-6 pr-2 rounded-full placeholder:text-slate-600' 
            placeholder='enter your list'/>
            <button className="border-none rounded-full bg-red-400 p-2 text-white h-14 w-32 text-lg font-medium cursor-pointer">ADD +</button>
        </div>
    </div>
)}

export default About
