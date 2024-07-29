import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/product";

const reducer = combineReducers({
  product: productReducer,
});

const store = configureStore({
  reducer,
});

export default store;
