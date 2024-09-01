import { ChakraProvider, Spinner, VStack } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
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
  const [googleClient, setGoogleClient] = useState(null);
  useEffect(() => {
    const googleKey = async () => {
      const { data: googleId } = await axios.get("/api/config/google");
      setGoogleClient(googleId);
    };
    googleKey();
  }, [googleClient]);

  return !googleClient ? (
    <VStack pt="37vh">
      <Spinner
        mt="20"
        thickness="2px"
        speed="0.65s"
        emptyColor="gray.200"
        color="cyan.500"
        size="xl"
      />
    </VStack>
  ) : (
    <GoogleOAuthProvider clientId={googleClient}>
      <ChakraProvider>
        <Router>
          <Header />
          <main>
            <Routes>
              <Route path="/products" element={<ProductScreen />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/" element={<LandingScreen />} />
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
    </GoogleOAuthProvider>
  );

  // return (
  //   <ChakraProvider>
  //     <Router>
  //       <Header />
  //       <main>
  //         <Routes>
  //           <Route path="/products" element={<ProductScreen />} />
  //           <Route path="/product/:id" element={<Product />} />
  //           <Route path="/" element={<LandingScreen />} />
  //           <Route path="/cart" element={<CartScreen />} />
  //           <Route path="/login" element={<LoginScreen />} />
  //           <Route path="/registration" element={<RegistrationScreen />} />
  //           <Route
  //             path="/email-verify/:token"
  //             element={<EmailVerificationScreen />}
  //           />
  //           <Route
  //             path="/password-reset/:token"
  //             element={<PasswordResetScreen />}
  //           />
  //         </Routes>
  //       </main>
  //       <Footer />
  //     </Router>
  //   </ChakraProvider>
  // );
}

export default App;
