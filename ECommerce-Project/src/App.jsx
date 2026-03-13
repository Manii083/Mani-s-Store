import { Routes, Route } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { HomePage } from "./Pages/home/HomePage";
import { CheckoutPage } from "../src/Pages/checkout/CheckoutPage";
import { OrdersPage } from "./Pages/orders/OrdersPage";
import { TrackingPage } from "./Pages/tracking/TrackingPage";

import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} /> 
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage cart={cart} />} />
    </Routes>
  );
}

export default App;
