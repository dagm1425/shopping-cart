import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import products from "./data/allProducts";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import bg from "./data/images/bg_main.jpg";
import styled, { css } from "styled-components";

function App() {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  useEffect(() => {
    setTotalPrice(computeTotalPrice());
  }, [cart]);

  const loadItems = () => {
    setItems(products);
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

    openCart();
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

  const sortDefault = () => {
    setItems(products);
  };

  const sortPriceLtoH = () => {
    setItems((prevItems) => {
      return prevItems.map((el) => el).sort((a, b) => a.price - b.price);
    });
  };

  const sortPriceHtoL = () => {
    setItems((prevItems) => {
      return prevItems.map((el) => el).sort((a, b) => b.price - a.price);
    });
  };

  const sortItems = (sorting) => {
    sorting === "sortDefault"
      ? sortDefault()
      : sorting === "sortPriceLtoH"
      ? sortPriceLtoH()
      : sortPriceHtoL();
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Wrapper bgImg={location === ""}>
      <Nav cart={cart} openCart={openCart} location={location} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              loadItems={loadItems}
              sortItems={sortItems}
              items={items}
              addToCart={addToCart}
            />
          }
        />
        <Route
          path="/shop/:id"
          element={<ItemDetail items={items} addToCart={addToCart} />}
        />
        <Route path="*" element={<Home />} />
      </Routes>
      <Cart
        cart={cart}
        totalPrice={totalPrice}
        updateQuantity={updateQuantity}
        isCartOpen={isCartOpen}
        closeCart={closeCart}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  background: transparent;

  ${(props) =>
    props.bgImg &&
    css`
      background: url(${bg}) no-repeat center center fixed;
      background-size: cover;
    `}
`;

export default App;
