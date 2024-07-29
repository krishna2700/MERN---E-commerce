import { Box, Center, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const ProductScreen = () => {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("api/products")
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {products.length > 1 && (
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
                  <ProductCard product={product} loading={false} />
                </Center>
              </WrapItem>
            ))}
          </Wrap>
        </Box>
      )}
    </>
  );
};

export default ProductScreen;
