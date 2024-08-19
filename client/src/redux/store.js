import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";
import cart from "./slices/cart";
import user from "./slices/user";

const reducer = combineReducers({
  product: productReducer,
  cart,
  user,
});

const store = configureStore({
  reducer,
});

export default store;
