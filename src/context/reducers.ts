import { Filters, Item, Sorting } from "src/typings/sharedTypes";

interface State {
  items: Item[];
  cart: {
    items: Item[];
    totalPrice: number;
    isCartOpen: boolean;
  };
  filters: Filters;
  sorting: Sorting;
}

type ItemsAction = { type: "SET_ITEMS"; payload: Item[] };

type CartAction =
  | { type: "TOGGLE_CART" }
  | { type: "ADD_TO_CART"; payload: Item }
  | { type: "RM_FROM_CART"; payload: Item }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; operator: string } }
  | { type: "CALCULATE_TOTAL_PRICE" };

type FilterAction =
  | {
      type: "TOGGLE_FILTER";
      payload: {
        param: keyof Filters;
        val: string;
      };
    }
  | { type: "RESET_FILTERS" };

type SortingAction = { type: "SET_SORTING"; payload: Sorting };

type Action = ItemsAction | CartAction | FilterAction | SortingAction;

const itemsReducer = (
  state: State["items"],
  action: ItemsAction
): State["items"] => {
  switch (action.type) {
    case "SET_ITEMS": {
      return action.payload;
    }
    default:
      return state;
  }
};

const cartReducer = (
  state: State["cart"],
  action: CartAction
): State["cart"] => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const addedItem = action.payload;
      if (state.items.some((el) => el.id === addedItem.id)) {
        return {
          ...state,
          items: state.items.map((el) =>
            el.id === addedItem.id ? { ...el, quantity: el.quantity + 1 } : el
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...addedItem, quantity: 1 }],
        };
      }
    }
    case "RM_FROM_CART": {
      const removedItem = action.payload;
      const cartUpdate = state.items.filter((el) => el.id !== removedItem.id);
      return { ...state, items: cartUpdate };
    }
    case "UPDATE_QUANTITY": {
      let cartUpdate;
      const item = state.items.find((item) => item.id === action.payload.id);

      if (item && item.quantity === 1 && action.payload.operator === "-")
        cartUpdate = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      else
        cartUpdate = state.items.map((el) => {
          if (el.id === action.payload.id) {
            return action.payload.operator === "-"
              ? { ...el, quantity: el.quantity - 1 }
              : { ...el, quantity: el.quantity + 1 };
          }
          return el;
        });
      return { ...state, items: cartUpdate };
    }
    case "CALCULATE_TOTAL_PRICE": {
      const totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      return { ...state, totalPrice };
    }
    case "TOGGLE_CART":
      return { ...state, isCartOpen: !state.isCartOpen };
    default:
      return state;
  }
};

const filterReducer = (state: Filters, action: FilterAction): Filters => {
  switch (action.type) {
    case "TOGGLE_FILTER":
      return {
        ...state,
        [action.payload.param]: {
          ...state[action.payload.param],
          [action.payload.val]:
            !state[action.payload.param][action.payload.val],
        },
      };
    case "RESET_FILTERS": {
      const { gender, brand, price } = state;

      Object.keys(gender).forEach((key) => {
        gender[key] = false;
      });

      Object.keys(brand).forEach((key) => {
        brand[key] = false;
      });

      Object.keys(price).forEach((key) => {
        price[key] = false;
      });
      return { gender, brand, price };
    }
    default:
      return state;
  }
};

const sortingReducer = (state: Sorting, action: SortingAction): Sorting => {
  switch (action.type) {
    case "SET_SORTING":
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = (state: State, action: Action): State => ({
  items: itemsReducer(state.items, action as ItemsAction),
  filters: filterReducer(state.filters, action as FilterAction),
  cart: cartReducer(state.cart, action as CartAction),
  sorting: sortingReducer(state.sorting, action as SortingAction),
});

export { rootReducer, State, Action };
