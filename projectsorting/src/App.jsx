import { useState } from "react";
import Expenceform from "./component/Expenceform"

function App() {
  const [expenses,setExpenses]=useState([]);
  const[selectedCategory,setSelectedCategory]=useState("All");
  const [sortOrder,setSortOrder]=useState("asc");
  function addExpenses(newExpenses){
    const expense={
      id:Date.now(),
      ...newExpenses
    };
    setExpenses((previousExpenses)=>[
      ...previousExpenses,expense,
    ]);
  }
  //filter expenses
  const filterExpenses= selectedCategory==="All"?expenses:expenses.filter((expense)=>expenses.category===selectedCategory);
  // sort expenses
  const sortingExpenses=[...filterExpenses].sort((a,b)=>{
    if (sortOrder==="asc"){
      return a.amount-b.amount;
    }
    return b.amount-a.amount;
  });
  //sum total
  const total=expenses.reduce((sum,expense)=>sum+expense.amount,0);
  
  return (
    <>
      <div className="max-w-6xl mx-auto p-10">
      
      <h1 className="text-2xl font-bold">
       Expence Tracker
      </h1>
      <div className="grid grid-cols-2 gap-4">
      <Expenceform />
      </div>
      <div className="flex justify-end items-center">
        expense table will come here
      </div>
      </div>
      
        
    </>
  )
}

export default App
