import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import products from "./data/allProducts";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import bg from "./data/images/bg_main.jpg";
import styled from "styled-components";
import { Filters } from "./typings/sharedTypes";
import { useAppContext } from "./context/context";

function App() {
  const { state, dispatch } = useAppContext();
  const items = state.items;
  const cart = state.cart.items;
  const isCartOpen = state.cart.isCartOpen;
  const totalPrice = state.cart.totalPrice;
  const sorting = state.sorting;
  const filters = state.filters;
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  useEffect(() => {
    dispatch({ type: "CALCULATE_TOTAL_PRICE" });
  }, [cart]);

  useEffect(() => {
    filterItems();
  }, [filters]);

  useEffect(() => {
    sorting === "sortDefault"
      ? sortDefault()
      : sorting === "sortPriceLtoH"
      ? sortPriceLtoH()
      : sortPriceHtoL();
  }, [sorting]);

  const addToCart = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;

    dispatch({ type: "ADD_TO_CART", payload: item });
    toggleCart();
  };

  const updateQuantity = (operator: string, id: string) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { operator, id } });
  };

  const sortItems = (
    sorting: "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  ) => {
    dispatch({ type: "SET_SORTING", payload: sorting });
  };

  const sortDefault = () => {
    const sortedItems = items
      .slice()
      .sort((a, b) => products.indexOf(a) - products.indexOf(b));
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const sortPriceLtoH = () => {
    const sortedItems = items.slice().sort((a, b) => a.price - b.price);
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const sortPriceHtoL = () => {
    const sortedItems = items.slice().sort((a, b) => b.price - a.price);
    dispatch({ type: "SET_ITEMS", payload: sortedItems });
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.name as keyof Filters;
    const val = e.target.value as string;

    dispatch({
      type: "TOGGLE_FILTER",
      payload: {
        param,
        val,
      },
    });
  };

  const collectFilters = () => {
    interface AppliedFilters {
      [key: string]: string[];
    }

    const { gender, brand, price } = filters;
    const appliedFilters: AppliedFilters = {
      gender: [],
      brand: [],
      price: [],
    };

    for (const genderKey in gender) {
      if (gender[genderKey]) appliedFilters.gender.push(genderKey);
    }

    for (const brandKey in brand) {
      if (brand[brandKey]) appliedFilters.brand.push(brandKey);
    }

    for (const priceKey in price) {
      if (price[priceKey]) appliedFilters.price.push(priceKey);
    }

    return appliedFilters;
  };

  const filterItems = () => {
    const filters = collectFilters();
    const keys = Object.keys(filters);

    const filteredItems = products.filter((product) => {
      return keys.every((key) => {
        if (!filters[key].length) return true;
        if (key === "price") {
          return filters[key].every((priceKey) => {
            if (priceKey === "upTo20") return product[key] <= 20;
            else if (priceKey === "from20To25")
              return product[key] > 20 && product[key] <= 25;
            else if (priceKey === "from25To30")
              return product[key] > 25 && product[key] <= 30;
          });
        }
        return filters[key].includes(product[key as keyof typeof product]);
      });
    });

    dispatch({ type: "SET_ITEMS", payload: filteredItems });
    dispatch({ type: "SET_SORTING", payload: "sortDefault" });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const toggleCart = () => {
    dispatch({ type: "TOGGLE_CART" });
  };

  return (
    <Wrapper $bgImg={location === ""}>
      <Nav cart={cart} toggleCart={toggleCart} location={location} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/shop"
          element={
            <Shop
              sortItems={sortItems}
              items={items}
              addToCart={addToCart}
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
              sorting={sorting}
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
