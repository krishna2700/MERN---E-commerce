import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: true,
  favorites: JSON.parse(localStorage.getItem("favorites")) ?? [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    setProducts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.products = payload;
    },
    setPagination: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.pagination = payload;
    },
    setFavorites: (state, { payload }) => {
      state.favorites = payload;
    },
    setFavoritesToggled: (state, { payload }) => {
      state.favoritesToggled = payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  setProducts,
  setPagination,
  setProduct,
  setFavoritesToggled,
  setFavorites,
} = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state) => state.product;
