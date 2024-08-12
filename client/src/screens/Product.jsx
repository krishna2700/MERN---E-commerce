import React from "react";
import { MinusIcon, PlusIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Spinner,
  Text,
  Wrap,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import { BiCheckShield, BiPackage, BiSupport } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from "../redux/actions/productAction";
import { useEffect, useState } from "react";
import Star from "../components/Star";
const Product = () => {
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const { loading, error, product } = useSelector((state) => state.product);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const changeAmount = (input) => {
    if (input === "plus") {
      setAmount(amount + 1);
    } else if (input === "minus") {
      if (amount > 1) {
        setAmount(amount - 1);
      }
    }
  };
  return (
    <Wrap spacing={"30px"} justify="center" minHeight="100vh">
      {loading ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            mt="20"
            thickness="2px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        </Stack>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are Sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: "3xl", md: "5xl", lg: "7xl" }}
            mx="auto"
            px={{ base: "4", md: "8", lg: "12" }}
            py={{ base: "4", md: "6", lg: "12" }}
          >
            <Stack
              direction={{ base: "column", lg: "row" }}
              align={"flex-start"}
            >
              <Stack
                pr={{ base: "0", md: "row" }}
                flex="1.5"
                mb={{ base: "12", md: "none" }}
              >
                {product.productIsNew && (
                  <Badge
                    p="2"
                    colorScheme="green"
                    rounded={"md"}
                    w="50px"
                    fontSize={"0.8em"}
                  >
                    New
                  </Badge>
                )}
                {product.stock === 0 && (
                  <Badge
                    p="2"
                    w="70px"
                    fontSize={"0.8em"}
                    rounded={"full"}
                    colorScheme="red"
                  >
                    Out of stock
                  </Badge>
                )}
                <Heading fontSize={"2xl"} fontWeight={"extrabold"}>
                  {product.brand} {product.name}
                </Heading>
                <Stack spacing={"5"}>
                  <Box>
                    <Text fontSize="xl" fontWeight="semibold">
                      ${product.price}
                    </Text>
                    <Flex>
                      <HStack spacing={"2px"}>
                        <Star color="cyan.500" />
                        <Star rating={product.rating} star={2} />
                        <Star rating={product.rating} star={3} />
                        <Star rating={product.rating} star={4} />
                        <Star rating={product.rating} star={5} />
                      </HStack>
                      <Text fontSize={"md"} fontWeight={"bold"} ml="4">
                        {product.numberOfReviews} reviews
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.subtitle}</Text>
                  <Text>{product.description}</Text>
                  <Text fontWeight={"bold"}>Quantity</Text>
                  <Flex
                    w="170px"
                    p="5px"
                    border="1px solid gray.200"
                    alignItems={"center"}
                  >
                    <Button
                      isDisabled={amount <= 1}
                      onClick={() => changeAmount("minus")}
                    >
                      <MinusIcon />
                    </Button>
                    <Text mx="30px">{amount}</Text>
                    <Button
                      isDisabled={amount >= product.stock}
                      onClick={() => changeAmount("plus")}
                    >
                      <SmallAddIcon />
                    </Button>
                  </Flex>
                  <Badge
                    fontSize={"lg"}
                    width={"170px"}
                    textAlign={"center"}
                    colorScheme="gray"
                  >
                    In stock: {product.stock}
                  </Badge>
                  <Button
                    variant={"outline"}
                    isDisabled={product.stock === 0}
                    colorScheme="cyan"
                    onClick={() => {}}
                  >
                    Add to cart
                  </Button>
                  <Stack width={"270px"}>
                    <Flex alignItems={"center"}>
                      <BiPackage size={"20px"} />
                      <Text fontWeight={"md"} fontSize={"sm"} ml={"2"}>
                        Free shipping
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <BiCheckShield size={"20px"} />
                      <Text fontWeight={"md"} fontSize={"sm"} ml={"2"}>
                        2 years extended warranty
                      </Text>
                    </Flex>
                    <Flex alignItems={"center"}>
                      <BiSupport size={"20px"} />
                      <Text fontWeight={"md"} fontSize={"sm"} ml={"2"}>
                        We're here for you 24/7
                      </Text>
                    </Flex>
                  </Stack>
                </Stack>
              </Stack>
              <Flex
                direction={"column"}
                flex="1"
                alignItems={"center"}
                _dark={{ bg: "gray.900" }}
              >
                <Image
                  mb={"30"}
                  src={product.images[0]}
                  fallback="https://via.placeholder.com/250"
                  alt={product.name}
                />
                <Image
                  mb={"30"}
                  src={product.images[1]}
                  fallback="https://via.placeholder.com/250"
                  alt={product.name}
                />
              </Flex>
            </Stack>
            <Stack>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Reviews
              </Text>
              <SimpleGrid
                minChildWidth={"300px"}
                spacingX={"40px"}
                spacingY={"20px"}
              >
                {product.reviews.map((review) => (
                  <Box key={review._id}>
                    <Flex spacing={"2px"} alignItems={"center"}>
                      <Star color="cyan.500" />
                      <Star rating={product.rating} star={2} />
                      <Star rating={product.rating} star={3} />
                      <Star rating={product.rating} star={4} />
                      <Star rating={product.rating} star={5} />
                      <Text fontWeight={"semibold"} ml={"4px"}>
                        {review.title && review.title}
                      </Text>
                    </Flex>
                    <Box py={"12px"}>{review.comment && review.comment}</Box>
                    <Text fontSize={"sm"} color={"gray.400"}>
                      by {review.name && review.name},{" "}
                      {new Date(review.createdAt).toDateString()}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        )
      )}
    </Wrap>
  );
};

export default Product;
