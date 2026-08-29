import {useState} from 'react'


function Expenceform({onAddExpenses}) {
    const [title,setTitle]=useState("");
    const [category,setCategory] =useState("");
    const [amount,setAmount] =useState("");
    function handleSubmit(e){
        e.preventDefault();
        if(!title||!category||!amount){
            alert("fill all the requirements");
            return;
        }
        if(amount<=0){
            alert("enter amount greater than 0");
            return;
        }
        onAddExpenses({
            title:title,
            category:category,
            amount:Number(amount),
        });
        //clear form
        setTitle("");
        setCategory("");
        setAmount("");
    }

    return (
        <>
        <form onSubmit={handleSubmit}
        className='rounded-lg border bg-white p-6 shadow-sm'>    
        <div className="py-10">
            <label className='mb-2 block font-medium'>
                Title
            </label>
            <input className="border-2 w-full  border-gray-400 rounded-md px-3 py-2 outline-none focus:border-black"
            type="text"
            value={title} placeholder="Enter Title"
            onChange={(e)=>setTitle(e.target.value)}
            />
        <div className='mp-5'>
            <label className='mb-2 block font-medium'>
                Category
            </label>
            <select className='w-full rounded border border-gray-400 px-3 py-2 outline-none focus:border-black'
            value={category}
            onChange={(e)=>setCategory(e.target.value)} >
                <option value="">Select Category</option>
                <option value="Grocery">Grocery</option>
                <option value="Stationary">Stationary</option>
                <option value="electronics">Electronics</option>
                <option value="clothes">Clothes</option>
                <option value="bills">Bills</option>
                <option value="Travel">Travel</option>
            </select>
        </div>
            
        </div>
        </form>
        </>
        
        
    )
}

export default Expenceform
