import React from 'react'

function ExpenseTable({
    expenses,
    categories,
    selectedCategory,
    setSelectedCategory,
    sortOrder,
    setSortOrder,
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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>
                            <select value={selectedCategory}
                            onChange={(e)=>setSelectedCategory(e.target.value)}>
                                {categories.map((category)=>(
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </th>
                        <th>
                            <button onClick={handleSort}>
                                Amount
                                <span>
                                    {sortOrder==="asc"?"↑":"↓"}
                                </span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.length===0 ?(
                        <tr>
                            <td colspan="3"
                            className='text-center'
                            >
                                no expense found
                            </td>
                        </tr>
                    ):(
                        expenses.map((expense)=>(
                            <tr key={expense.id}>
                                <td className='px-3 py-3'>
                                    {expense.title}
                                </td>
                                <td className='px-3 py-3'>
                                    {expense.category}
                                </td>
                                <td className='px-3 py-3'>
                                    {expense.amount}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable
