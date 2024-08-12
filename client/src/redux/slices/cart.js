import { createSlice } from "@reduxjs/toolkit";

const calculateSubtotal = (cartState) => {
  let result = 0;
  cartState.forEach((item) => {
    result += item.qty * item.price;
  });
  return result;
};

export const initialState = {
  loading: false,
  error: null,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  shipping: localStorage.getItem("shipping")
    ? Number(localStorage.getItem("shipping"))
    : 4.99,
  subtotal: localStorage.getItem("cartItems")
    ? calculateSubtotal(JSON.parse(localStorage.getItem("cartItems")))
    : 0,
};

const updateLocalStorage = (cart) => {
  localStorage.setItem("cartItems", JSON.stringify(cart));
  localStorage.setItem("subtotal", calculateSubtotal(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setCartItems: (state, { payload }) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === payload.id
      );

      if (existingItem) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === existingItem.id ? payload : item
        );
      } else {
        state.cartItems = [...state.cartItems, payload];
      }

      state.loading = false;
      state.error = null;
      updateLocalStorage(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);
    },
    cartItemRemoval: (state, { payload }) => {
      state.cartItems = [...state.cartItems].filter(
        (item) => item.id !== payload
      );
      updateLocalStorage(state.cartItems);
      state.subtotal = calculateSubtotal(state.cartItems);
      state.loading = false;
      state.error = null;
    },
    setShippingCosts: (state, { payload }) => {
      state.shipping = payload;
      localStorage.setItem("shipping", payload);
      state.loading = false;
      state.error = null;
    },
    clearCart: (state) => {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("subtotal");
      state.cartItems = [];
      state.shipping = Number(4.99);
      state.subtotal = 0;
      state.loading = false;
      state.error = null;
    },
    setSubtotal: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.subtotal = payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setCartItems,
  clearCart,
  cartItemRemoval,
  setShippingCosts,
  setSubtotal,
} = cartSlice.actions;

export default cartSlice.reducer;

export const cartSelector = (state) => state.cart;
