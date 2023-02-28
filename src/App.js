import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setTotalPrice(computeTotalPrice());
  }, [cart]);

  const loadItems = async () => {
    setItems(await fetchItems());
  };

  const fetchItems = async () => {
    const response = await fetch(
      "https://fakestoreapi.com/products/category/electronics"
    );
    let data = await response.json();

    return data.map((el) => ({ ...el, quantity: 1 }));
  };

  const computeTotalPrice = () => {
    return cart.reduce((total, el) => total + el.price * el.quantity, 0);
  };

  const addToCart = (id) => {
    const item = items.find((item) => item.id === id);

    if (cart.some((el) => el.title === item.title)) {
      const cartUpdate = cart.map((el) => {
        if (el.id === id) return { ...el, quantity: el.quantity + 1 };
        return el;
      });

      setCart(cartUpdate);
    } else setCart((prevCart) => [...prevCart, item]);
  };

  const updateQuantity = (op, id) => {
    let cartUpdate;
    const item = cart.find((item) => item.id === id);

    if (item.quantity == 1 && op === "-")
      cartUpdate = cart.filter((item) => item.id !== id);
    else
      cartUpdate = cart.map((el) => {
        if (el.id === id) {
          return op === "-"
            ? { ...el, quantity: el.quantity - 1 }
            : { ...el, quantity: el.quantity + 1 };
        }
        return el;
      });

    setCart(cartUpdate);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Nav cart={cart} openCart={openCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop loadItems={loadItems} items={items} addToCart={addToCart} />
          }
        />
        <Route path="*" element={<Home />} />
      </Routes>
      {/* {isCartOpen && ( */}
      <Cart
        cart={cart}
        totalPrice={totalPrice}
        updateQuantity={updateQuantity}
        isCartOpen={isCartOpen}
        closeCart={closeCart}
      />
      {/* )} */}
    </>
  );
}

export default App;
