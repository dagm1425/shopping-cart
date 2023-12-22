import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import bg from "./data/images/bg_main.jpg";
import styled from "styled-components";
import { useAppContext } from "./context/context";
import SearchBar from "./components/SearchBar";
import PaymentSuccess from "./pages/PaymentSuccess";

function App() {
  const { state, dispatch } = useAppContext();
  const items = state.items;
  const cart = state.cart.items;
  const isSearchBarOpen = state.search.isSearchBarOpen;
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL_PRICE" });
  }, [cart]);

  const addToCart = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;

    dispatch({ type: "ADD_TO_CART", payload: item });
    toggleCart();
  };

  const updateQuantity = (operator: string, id: string) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { operator, id } });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  const toggleSearchBar = () => {
    dispatch({ type: "TOGGLE_SEARCH" });
  };

  return (
    <Wrapper $bgImg={location === ""}>
      <Nav
        cart={cart}
        toggleCart={toggleCart}
        location={location}
        toggleSearchBar={toggleSearchBar}
      />
      {isSearchBarOpen && (
        <SearchBar
          items={items}
          isSearchBarOpen={isSearchBarOpen}
          toggleSearchBar={toggleSearchBar}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={<Shop items={items} addToCart={addToCart} />}
        />
        <Route
          path="/shop/:id"
          element={<ItemDetail items={items} addToCart={addToCart} />}
        />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Cart
        cart={cart}
        updateQuantity={updateQuantity}
        toggleCart={toggleCart}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $bgImg?: boolean }>`
  min-height: 100vh;
  background: ${({ $bgImg }) =>
    $bgImg ? `url(${bg}) no-repeat center center fixed` : "transparent"};
  background-size: ${({ $bgImg }) => ($bgImg ? "cover" : "auto")};
`;

export default App;
