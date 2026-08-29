import Expenceform from "./component/Expenceform"

function App() {
  

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
