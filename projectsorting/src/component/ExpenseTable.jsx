import React from 'react'

function ExpenseTable({
    expenses,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
    total,
    OnDeleteExpenses,
}) {
    function handleSort(){
        if(sortOrder==="asc"){
            setSortOrder("desc");
        }
        else{
            setSortOrder("asc")
        }
    }

    return (
        <div className="rounded-lg border bg-white shadow-sm">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        <th className="px-3 py-3 text-left font-semibold">Title</th>
                        <th className="px-3 py-3 text-left font-semibold">
                            <select className="bg-transparent outline-none"
                                value={selectedCategory}
                            onChange={(e)=>setSelectedCategory(e.target.value)}>
                                {categories.map((category)=>(
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </th>
                        <th className="px-3 py-3 text-left font-semibold">
                            <button onClick={handleSort}
                                className="flex item-center gap-1">
                                Amount
                                <span>
                                    {sortOrder==="asc"?"↑":"↓"}
                                </span>
                            </button>
                        </th>
                        <th className='px-3 py-3 text-left font-semibold'>
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length===0 ?(
                        <tr>
                            <td colSpan="4"
                            className='text-center px-3 py-3 text-gray-500'
                            >
                                no expense found
                            </td>
                        </tr>
                    ):(
                        expenses.map((expense)=>(
                            <tr key={expense.id}
                                className="border-b last:border-b-0">
                                <td className='px-3 py-3'>
                                    {expense.title}
                                </td>
                                <td className='px-3 py-3'>
                                    {expense.category}
                                </td>
                                <td className='px-3 py-3'>
                                    {expense.amount}
                                </td>
                                <td className='px-3 py-3'>
                                    <button onClick={()=>OnDeleteExpenses(expense.id)}
                                        className='rounded bg-red-500 px-3 py-1 text-white hover:bg-red-800'>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
                <tfoot>
                    <tr className="font-bold">
                        
                            <td></td>
                            <td className=' px-5 py-5 '>
                                ₹{total}
                            </td>
                    
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default ExpenseTable
