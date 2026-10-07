import React from 'react'

function Home() {
    return (
        <div>
            <div >
                
                
                
                <div className="bg-cyan-400 h-64 w-64 relative">
                    <h1 className='bg-red-400 w-64 p-5 absolute top-80 right-80'>Hello</h1>
                    <div className="bg-blue-800 h-24 w-24 absolute top-0 right-0"></div>
                <div className="bg-purple-400 h-24 w-24 absolute bottom-0 right-0"></div>
                <div className="bg-green-400 h-24 w-24 absolute bottom-0"></div>
                </div>
                
            </div>
            <div className='bg-yellow-600 size-fit'>tailwindcss</div>
            <div className='gradient bg-gradient-to-tr from-red-500 to-blue-500 size-84' >tailwindcss</div>
        </div>
    )
}

export default Home
