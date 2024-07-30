import axios from "axios";
import {
  setError,
  setLoading,
  setPagination,
  setProducts,
  setFavoritesToggled,
  setFavorites,
} from "../slices/product";

export const getProducts = (page, favoritesToggled) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const { data } = await axios.get(`/api/products/${page}/${10}`);
    const { products, pagination } = data;
    dispatch(setProducts(products));
    dispatch(setPagination(pagination));
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

export const addToFavorites = (id) => async (dispatch, getState) => {
  const {
    product: { favorites },
  } = getState();
  const newFavorites = [...favorites, id];
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};
export const removeFromFavorites = (id) => async (dispatch, getState) => {
  const {
    product: { favorites },
  } = getState();
  const newFavorites = favorites.filter((favoriteId) => favoriteId !== id);
  localStorage.setItem("favorites", JSON.stringify(newFavorites));
  dispatch(setFavorites(newFavorites));
};

export const toggleFavorites = (toggle) => async (dispatch, getState) => {
  const {
    product: { favorites, products },
  } = getState();

  if (!Array.isArray(products)) {
    dispatch(setError("Products data is not an array"));
    return;
  }

  if (toggle) {
    const filteredProducts = products.filter((product) =>
      favorites.includes(product._id)
    );
    dispatch(setFavoritesToggled(toggle));
    dispatch(setProducts(filteredProducts));
  } else {
    dispatch(setFavoritesToggled(false));
    dispatch(getProducts(1));
  }
};
