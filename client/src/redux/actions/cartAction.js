import axios from "axios";
import {
  cartItemRemoval,
  clearCart,
  setCartItems,
  setError,
  setLoading,
  setShippingCosts,
} from "../slices/cart";

export const addCartItems = (id, qty) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    const itemToAdd = {
      id: data._id,
      name: data.name,
      subtitle: data.subtitle,
      image: data.images[0],
      price: data.price,
      stock: data.stock,
      brand: data.brand,
      qty,
      stripeId: data.stripeId,
    };
    dispatch(setCartItems(itemToAdd));
    dispatch(setCartItems({ product: data._id, qty }));
  } catch (err) {
    dispatch(
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
          ? err.message
          : "An unexpected error has occurred"
      )
    );
  }
};

export const removeCartItem = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(cartItemRemoval(id));
  dispatch(clearCart());
};

export const clearCartItems = () => async (dispatch) => {
  dispatch(clearCart());
  dispatch(setLoading(true));
};

export const setShipping = (value) => async (dispatch) => {
  dispatch(setShippingCosts(value));
};

export const restCart = () => async (dispatch) => {
  dispatch(clearCart());
};
