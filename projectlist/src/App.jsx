import { useState } from 'react'

//import './App.css'

function App() {
  const [items, setItems] = useState([])
  const [input, setInput] = useState(" ")

  function handleadditem(){
    setItems([...items,input]);
    setInput("");

  }

  return (
    <>
      <div>
        <h1>Item-List</h1>
        <div className='justify-between place-items-center'>
          <input type='text'
          value={input}
          onChange={(e)=> setInput(e.target.value)}
          placeholder='enter your item'/>
          <button className='bg-purple-300 rounded px-3 py-2 hover:bg-purple-600 border-2 text-black shadow-2xs'
          onClick={handleadditem}>Add item</button>
          <ul>
            {items.map((item,index) => (
              <li key={index}>{item}</li>
            ))};
          </ul>
        </div>
      </div>
    </>
  );
}

export default App
