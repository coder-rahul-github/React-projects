import {useState} from 'react'


function Expenceform() {
    const [title,setTitle]=useState("");
    return (
        <>
        <div className="py-10">
            <input className="border-2 w-full rounded-md"
            value={title} placeholder="Enter Title"
            onChange={(e)=>setTitle(e.target.value)}
            />
            
        </div>
        </>
        
        
    )
}

export default Expenceform
