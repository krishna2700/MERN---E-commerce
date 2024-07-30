import React from "react";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorites } from "../redux/actions/productAction";

const Header = () => {
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);

  return (
    <div>
      {favoritesToggled ? (
        <IconButton
          icon={<MdOutlineFavorite size="20px" />}
          onClick={() => dispatch(toggleFavorites(false))}
          variant="ghost"
        />
      ) : (
        <IconButton
          icon={<MdOutlineFavoriteBorder size="20px" />}
          onClick={() => dispatch(toggleFavorites(true))}
          variant="ghost"
        />
      )}
    </div>
  );
};

export default Header;
