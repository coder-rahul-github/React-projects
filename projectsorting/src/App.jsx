import { useState } from "react";
import Expenceform from "./component/Expenceform"
import ExpenseTable from "./component/ExpenseTable";

function App() {
  const [expenses,setExpenses]=useState([]);
  const[selectedCategory,setSelectedCategory]=useState("All");
  const [sortOrder,setSortOrder]=useState("asc");
  function addExpense(newExpense){
    const expense={
      id:Date.now(),
      ...newExpense
    };
    setExpenses((previousExpenses)=>[
      ...previousExpenses,expense,
    ]);
  }
  function deleteExpense(id){
    setExpenses((previousExpenses)=>previousExpenses.filter((expense)=>expense.id!==id));
  }
  //filter expenses
  const filterExpenses= selectedCategory==="All"?expenses:expenses.filter((expense)=>expense.category===selectedCategory);
  // sort expenses
  const sortingExpenses=[...filterExpenses].sort((a,b)=>{
    if (sortOrder==="asc"){
      return a.amount-b.amount;
    }
    return b.amount-a.amount;
  });
  //sum total
  const total=expenses.reduce((sum,expense)=>sum+expense.amount,0);
  //get unique categories
  const categories=["All",...new Set(expenses.map((expense)=>expense.category))];

  return (
    <>
      <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold">
       Expence Tracker
      </h1>
      <div className="grid lg:grid-cols-2 gap-8">
      <Expenceform onAddExpense={addExpense}/>
      
      <ExpenseTable
      expenses={sortingExpenses}
      categories={categories}
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      total={total}
      onDeleteExpense={deleteExpense}
      />
      </div>
      </div>
      </div>
      
        
    </>
  );
}

export default App
