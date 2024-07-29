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

const ProductCard = ({ product, loading }) => {
  console.log(product);
  return (
    <Skeleton isLoaded={!loading} _hover={{ size: 1.5 }}>
      <Box
        _hover={{ transform: "scale(1.1)", transitionDuration: "0.5s" }}
        borderWidth="1px"
        overflow="hidden"
        p="4"
        shadow="md"
      >
        <Image />
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
        <IconButton icon={<BiExpand size={20} colorScheme="cyan" />} />
      </Box>
    </Skeleton>
  );
};

export default ProductCard;
