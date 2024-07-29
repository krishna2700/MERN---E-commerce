import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  products: [],
  product: null,
  pagination: {},
  favoritesToggled: true,
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
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setFavoritesToggled: (state, action) => {
      state.favoritesToggled = action.payload;
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
} = productSlice.actions;

export default productSlice.reducer;

export const productSelector = (state) => state.product;
