import { Route, Routes } from "react-router"
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import Wishlist from "./component/Wishlist"
import About from "./component/About"
import Order from "./component/Order"



function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="menu" 
        element={<Home/>}/>
        <Route path="order" 
        element={<Order/>}/>
        <Route path="wishlist" 
        element={<Wishlist/>}/>
        <Route path="about" 
        element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
