import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";
import cart from "./slices/cart";

const reducer = combineReducers({
  product: productReducer,
  cart,
});

const store = configureStore({
  reducer,
});

export default store;
