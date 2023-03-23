import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
  const [bgImg, setbgImg] = useState(true);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    setTotalPrice(computeTotalPrice());
  }, [cart]);

  const loadItems = () => {
    setItems(products);
  };

  // const loadItems = async () => {
  //   setItems(await fetchItems());
  // };

  // const fetchItems = async () => {
  //   const response = await fetch("https://fakestoreapi.com/products");
  //   let data = await response.json();
  //   let products = data.filter(
  //     (el) =>
  //       el.category === "women's clothing" || el.category === "men's clothing"
  //   );
  //   console.log(products);
  //   return products.map((el) => ({ ...el, quantity: 1 }));
  // };

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

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const setBg = () => {
    setbgImg(true);
  };

  const rmBg = () => {
    setbgImg(false);
  };

  return (
    <Wrapper bgImg={bgImg}>
      <Nav
        cart={cart}
        openCart={openCart}
        setBg={setBg}
        rmBg={rmBg}
        bgImg={bgImg}
      />
      <Routes>
        <Route path="/" element={<Home rmBg={rmBg} />} />
        <Route
          path="/shop"
          element={
            <Shop loadItems={loadItems} items={items} addToCart={addToCart} />
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
        rmBg={rmBg}
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
      color: #fff;
      background: url(${bg}) no-repeat center center fixed;
      background-size: cover;
    `}
`;

export default App;
