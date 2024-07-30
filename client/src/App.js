import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingScreen from "./screens/LandingScreen";
import Product from "./screens/Product";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingScreen />} />
            <Route path="/products" element={<ProductScreen />} />
            <Route path="/product/:id" element={<Product />} />
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
