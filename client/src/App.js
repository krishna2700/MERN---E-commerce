import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import EmailVerificationScreen from "./screens/EmailVerificationScreen";
import LandingScreen from "./screens/LandingScreen";
import LoginScreen from "./screens/LoginScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import Product from "./screens/Product";
import ProductScreen from "./screens/ProductScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

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
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/registration" element={<RegistrationScreen />} />
            <Route
              path="/email-verify/:token"
              element={<EmailVerificationScreen />}
            />
            <Route
              path="/password-reset/:token"
              element={<PasswordResetScreen />}
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
