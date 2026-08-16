import { useState } from 'react'
import Button from './components/Button';
//import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState("")
  const [darkMode,setDarkMode] = useState(false);

  function handleadditem() {
    if (input.trim() === "") {
      return;
    }

    setItems([...items,{
      text:input,
      completed:false
    }
    ]);
    setInput("");

  }
  function handleDeleteItem(index){
    setItems(items.filter((item,i)=> i !== index))
  }
  function handleToggleItem(index){
    setItems(items.map((item,i)=>i===index
    ?{...item,completed:!item.completed}:item
    )) ;
  }

  return (
    <>
      <div className={`min-h-screen bg-grey-100 flex justify-center pt-10 ${darkMode?"bg-gray-900":"bg-gray-100"}`}>
        <div className={`w-full max-w-xl rounded-lg shadow-md p-6 ${darkMode ?"bg-gray-800 text-white":"bg-white text-gray-900"}`}>
          <div className='flex justify-end mb-4'>

            <Button onClick={()=>{
              setDarkMode(!darkMode)
            }}
            text={darkMode ? "🔆":"🌙"}
            />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Item-List</h1>
          <div className='flex items-center gap-2 mb-6'>
            <input type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='enter your item'
              className="flex-1 h-10 border border-grey-300 rounded px-3 py-2 outline-none focus:border-sky-500 "/>
              <Button type="primary" size="medium"
              onClick={handleadditem} text="Add item" />
          </div>
          <div>

            <ul className="space-y-3">
              {items.map((item, index) => (
              <li key={index}
                className="flex item-center justify-between rounded border border-grey-200 p-3">
                    
                <span className={item.completed?"line-through":""}> {item.text} 

                </span>
                  <div className='flex gap-3'>
                    <Button size="small" onClick={()=>handleToggleItem(index)} text={item.completed?"undo":"completed"}/>
                    <Button size='medium' type="danger"
                    onClick={()=>handleDeleteItem(index)} text="Delete" />
                  </div>
              </li>
              ))}
              
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
