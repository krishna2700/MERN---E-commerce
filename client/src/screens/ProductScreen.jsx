import { Box, Button, Center, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../redux/actions/productAction";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, products, pagination, favorites, favoritesToggled } =
    useSelector((state) => state.product);

  React.useEffect(() => {
    dispatch(getProducts(1));
  }, [dispatch]);

  const paginationButtonClick = (page) => {
    dispatch(getProducts(page));
  };

  return (
    <>
      {products.length >= 1 && (
        <Box>
          <Wrap
            spacing="30px"
            justify="center"
            minHeight="80vh"
            mx={{ base: "12", md: "20", lg: "32" }}
          >
            {products.map((product) => (
              <WrapItem key={product._id}>
                <Center w="250px" h="450px">
                  <ProductCard product={product} loading={loading} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
          {!favoritesToggled && (
            <Wrap spacing="10px" justify="center" p="5">
              <Button
                onClick={() => paginationButtonClick(1)}
                colorScheme="cyan"
              >
                <MdArrowLeft />
              </Button>
              {Array.from({ length: pagination.totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => paginationButtonClick(i + 1)}
                  colorScheme={
                    pagination.currentPage === i + 1 ? "cyan" : "gray"
                  }
                >
                  {i + 1}
                </Button>
              ))}

              <Button
                onClick={() => paginationButtonClick(pagination.totalPages)}
                colorScheme="cyan"
              >
                <MdArrowRight />
              </Button>
            </Wrap>
          )}
        </Box>
      )}
    </>
  );
};

export default ProductScreen;
