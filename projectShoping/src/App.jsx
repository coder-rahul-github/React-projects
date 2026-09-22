import { useState } from "react"
import { Route, Routes } from "react-router"
import Navbar from "./component/Navbar"
import Home from "./component/Home"
import Wishlist from "./component/Wishlist"
import About from "./component/About"
import Order from "./component/Order"
import OrderPopup from "./component/OrderPopup"
import Footer from "./component/Footer"
import AdminDashboard from "./component/AdminDashboard"
import AdminLogin from "./component/AdminLogin"

function App() {
  // Admin auth state (session-only, resets on page refresh)
  const [isAdminAuth, setIsAdminAuth] = useState(false)

  // Wishlist state
  const [wishlist, setWishlist] = useState([])

  // Cart state: { productId: { product, count } }
  const [cart, setCart] = useState({})

  // Orders history: array of placed order snapshots
  const [orders, setOrders] = useState([])

  // Toggle wishlist add/remove
  function toggleWishlist(product) {
    setWishlist((prev) => {
      const alreadyAdded = prev.find((item) => item.id === product.id)
      if (alreadyAdded) {
        return prev.filter((item) => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }

  // Update cart: newCount <= 0 removes the product
  function updateCart(product, newCount) {
    setCart((prev) => {
      if (newCount <= 0) {
        const updated = { ...prev }
        delete updated[product.id]
        return updated
      }
      return { ...prev, [product.id]: { product, count: newCount } }
    })
  }

  // Place order: snapshot cart → save to orders → clear cart (popup disappears)
  function placeOrder() {
    const cartItems = Object.values(cart)
    if (cartItems.length === 0) return

    const newOrder = {
      id: Date.now(),
      orderNumber: orders.length + 1,
      items: cartItems,
      total: cartItems.reduce(
        (sum, { product, count }) => sum + Number(product.price) * count,
        0
      ),
      placedAt: new Date().toLocaleString(),
      status: "Packing", // default status for new orders
    }

    setOrders((prev) => [...prev, newOrder])
    setCart({}) // clears cart → popup auto-hides (returns null when cart empty)
  }

  // Admin: update order status
  function updateOrderStatus(orderId, newStatus) {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="menu"
            element={
              <Home
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                cart={cart}
                updateCart={updateCart}
              />
            }
          />
          <Route
            path="order"
            element={<Order orders={orders} />}
          />
          <Route
            path="wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                cart={cart}
                updateCart={updateCart}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route
            path="admin"
            element={
              isAdminAuth
                ? <AdminDashboard orders={orders} updateOrderStatus={updateOrderStatus} onLogout={() => setIsAdminAuth(false)} />
                : <AdminLogin onSuccess={() => setIsAdminAuth(true)} />
            }
          />
        </Routes>
      </div>

      {/* Floating popup — placeOrder clears cart so popup disappears after order */}
      <OrderPopup cart={cart} placeOrder={placeOrder} />

      {/* Footer with admin link */}
      <Footer />
    </div>
  )
}

export default App
