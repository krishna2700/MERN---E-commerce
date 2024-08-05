import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiExpand } from "react-icons/bi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/actions/productAction";
import { Link as ReactLink } from "react-router-dom";

const ProductCard = ({ product, loading }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.product);
  const [isShown, setIsShown] = React.useState(false);

  console.log(product);
  return (
    <Skeleton isLoaded={true}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth="1px"
        overflow="hidden"
        p="4"
        shadow="md"
      >
        <Image
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          src={product.images[isShown && product.images.length === 2 ? 1 : 0]}
          fallback="https://via.placeholder.com/150"
          alt={product.name}
        />
        {product.stock < 5 ? (
          <Badge colorScheme="yellow">Only {product.stock} left in stock</Badge>
        ) : product.stick < 1 ? (
          <Badge colorScheme="red">Out of stock</Badge>
        ) : (
          <Badge colorScheme="green">In Stock</Badge>
        )}

        {product.productIsNew && (
          <Badge colorScheme="blue" ml="2">
            New
          </Badge>
        )}
        <Text noOfLines={1} fontSize="xl" fontWeight="semibold" mt="2">
          {product.brand} {` `} {product.name}
        </Text>
        <Text noOfLines={1} fontSize="md" color="gray.600">
          {product.subtitle}
        </Text>
        <Flex justify="space-between" alignItems="center" mt="2">
          <Badge colorScheme="cyan">{product.category}</Badge>
          <Text fontSize="xl" fontWeight="semibold" color="cyan.600">
            ${product.price}
          </Text>
        </Flex>
        <Flex justify="space-between" mt="2" alignItems="center">
          {favorites.includes(product._id) ? (
            <IconButton
              onClick={() => dispatch(removeFromFavorites(product._id))}
              icon={<MdOutlineFavorite size="20px" />}
              colorScheme="cyan"
              size="sm"
            />
          ) : (
            <IconButton
              icon={<MdOutlineFavoriteBorder size="20px" />}
              onClick={() => dispatch(addToFavorites(product._id))}
              colorScheme="cyan"
              size="sm"
            />
          )}
          <IconButton
            icon={<BiExpand size={20} />}
            as={ReactLink}
            to={`/product/${product._id}`}
            colorScheme="cyan"
            size="sm"
          />
        </Flex>
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
