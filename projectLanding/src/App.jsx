import { Route, Routes } from "react-router"
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import Images from "./component/Images"
import Pricing from "./component/Pricing"
import Products from "./component/Products"

function App() {
  

  return (
    <div className="font-[poppins] bg-gray-800 h-screen">
      
      <Navbar/>
      <Routes>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Images" element={<Images/>}/>
        <Route path="/Pricing" element={<Pricing/>}/>
        <Route path="/Products" element={<Products/>}/>
      </Routes>
    </div>
  )
}

export default App
