import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage from "./LoginPage";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); 
  const [orders, setOrders] = useState([]);

  // Add product to orders
  const addToOrders = (product) => {
    setOrders((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setOrders((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const removeItem = (id) => {
    setOrders((prev) => prev.filter((item) => item.id !== id));
  };

  // ✅ Logout function with toast
  const handleLogout = () => {
    setLoggedIn(false);
    setOrders([]);
    setUsername("");
    toast.info("🚪 Signed out successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  // ✅ Login function with toast
  const handleLogin = (user) => {
    setUsername(user);
    setLoggedIn(true);
    toast.success(`👋 Welcome ${user}!`, {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
  };

  return (
    <div id="root">
      <main>
        <Routes>
          {!loggedIn ? (
            <Route path="*" element={<LoginPage onLogin={handleLogin} />} />
          ) : (
            <>
              <Route
                path="/"
                element={<Dashboard onLogout={handleLogout} />}
              >
                <Route index element={<Home username={username} />} />

                <Route
                  path="products"
                  element={<Products onAddToCart={addToOrders} />}
                />

                <Route
                  path="orders"
                  element={
                    <Orders
                      orders={orders}
                      addToOrders={addToOrders}
                      decreaseQuantity={decreaseQuantity}
                      removeItem={removeItem}
                    />
                  }
                />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </main>

      {/* ✅ Toast container must be here */}
      <ToastContainer />
    </div>
  );
}

export default App;
