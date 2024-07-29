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
