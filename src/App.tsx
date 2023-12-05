import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import products from "./data/allProducts";
import Nav from "./components/Nav";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ItemDetail from "./pages/ItemDetail";
import bg from "./data/images/bg_main.jpg";
import styled, { css } from "styled-components";
import { Item } from "./typings/sharedTypes";
import { Filters } from "./typings/sharedTypes";

function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [cart, setCart] = useState<Item[]>([]);
  const [filters, setFilters] = useState<Filters>({
    gender: { man: false, woman: false },
    brand: { Hanes: false, Champion: false, Under_Armour: false },
    price: { upTo20: false, from20To25: false, from25To30: false },
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectValue, setSelectValue] = useState<
    "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  >("sortDefault");
  const path = useLocation().pathname;
  const location = path.split("/")[1];

  useEffect(() => {
    setTotalPrice(computeTotalPrice());
  }, [cart]);

  useEffect(() => {
    filterItems();
  }, [filters]);

  const loadItems = () => {
    setItems(products);
  };

  const computeTotalPrice = () => {
    return cart.reduce((total, el) => total + el.price * el.quantity, 0);
  };

  const addToCart = (id: string) => {
    const item = items.find((item) => item.id === id);

    if (!item) return;

    if (cart.some((el) => el.id === id)) {
      const cartUpdate = cart.map((el) => {
        if (el.id === id) return { ...el, quantity: el.quantity + 1 };
        return el;
      });

      setCart(cartUpdate);
    } else setCart([...cart, item]);

    openCart();
  };

  const updateQuantity = (op: string, id: string) => {
    let cartUpdate;
    const item = cart.find((item) => item.id === id);

    if (item && item.quantity == 1 && op === "-")
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

  const sortItems = (
    sorting: "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL"
  ) => {
    setSelectValue(sorting);

    sorting === "sortDefault"
      ? sortDefault()
      : sorting === "sortPriceLtoH"
      ? sortPriceLtoH()
      : sortPriceHtoL();
  };

  const sortDefault = () => {
    setItems((prevItems) =>
      prevItems.slice().sort((a, b) => {
        return products.indexOf(a) - products.indexOf(b);
      })
    );
  };

  const sortPriceLtoH = () => {
    setItems((prevItems) => {
      return prevItems.slice().sort((a, b) => a.price - b.price);
    });
  };

  const sortPriceHtoL = () => {
    setItems((prevItems) => {
      return prevItems.slice().sort((a, b) => b.price - a.price);
    });
  };

  const updateFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const param = e.target.name as keyof Filters;
    const val = e.target.value as keyof Filters[typeof param];

    const filtersUpdate = {
      ...filters,
      [param]: {
        ...filters[param],
        [val]: !filters[param][val],
      },
    };

    setFilters(filtersUpdate);
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

    setItems(filteredItems);
    setSelectValue("sortDefault");
  };

  const resetFilters = () => {
    const { gender, brand, price } = filters;

    Object.keys(gender).forEach((key) => {
      gender[key] = false;
    });

    Object.keys(brand).forEach((key) => {
      brand[key] = false;
    });

    Object.keys(price).forEach((key) => {
      price[key] = false;
    });

    setFilters({ gender, brand, price });
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <Wrapper $bgImg={location === ""}>
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
              filters={filters}
              updateFilters={updateFilters}
              resetFilters={resetFilters}
              selectValue={selectValue}
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

const Wrapper = styled.div<{ $bgImg?: boolean }>`
  min-height: 100vh;
  background: transparent;

  ${(props) =>
    props.$bgImg &&
    css`
      background: url(${bg}) no-repeat center center fixed;
      background-size: cover;
    `}
`;

export default App;
