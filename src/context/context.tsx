import React, { createContext, useContext, useReducer } from "react";
import { rootReducer, State, Action } from "./reducers";
import products from "src/data/allProducts";

interface AppContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<AppContextProps | null>(null);

const initialState: State = {
  items: products,
  filters: {
    gender: { man: false, woman: false },
    brand: { Hanes: false, Champion: false, Under_Armour: false },
    price: { upTo20: false, from20To25: false, from25To30: false },
  },
  cart: {
    items: [],
    totalPrice: 0,
    isCartOpen: false,
  },
  sorting: "sortDefault",
  search: {
    isSearchBarOpen: false,
    search: "",
    searchResults: [],
  },
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.warn("AppProvider not found. Using default values.");
    return {
      state: initialState,
      dispatch: () => {
        console.warn("Dispatch called with no AppProvider.");
      },
    };
  }
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, useAppContext };
