import {
  Box,
  Flex,
  HStack,
  Icon,
  IconButton,
  Stack,
  Text,
  useColorModeValue as mode,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { BsPhoneFlip } from "react-icons/bs";
import { BiUserCheck } from "react-icons/bi";
import { MdOutlineFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link as ReactLink } from "react-router-dom";
import { toggleFavorites } from "../redux/actions/productAction";
import ColorModeToggle from "./ColorModeToggle";
import NavLink from "./NavLink";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  { name: "Products", route: "/products" },
  { name: "Hot Deals", route: "/hotdeals" },
  { name: "Contact", route: "/contact" },
  { name: "Services", route: "/services" },
];

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const { favoritesToggled } = useSelector((state) => state.product);

  useEffect(() => {}, [favoritesToggled, dispatch]);

  return (
    <Box bg={mode(`cyan.300`, `gray.900`)} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Flex display={{ base: "flex", md: "none" }} alignItems={"center"}>
          <IconButton
            bg="parent"
            size="md"
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          />
        </Flex>
        <HStack spacing={8} alignItems={"center"}>
          <Box alignItems={"center"} display={"flex"} as={ReactLink} to="/">
            <Icon
              as={BsPhoneFlip}
              h="6"
              w="6"
              color={mode("Black", "yellow.200")}
            />
            <Text as="b">Krishna</Text>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.route} route={link.route}>
                <Text fontWeight={"medium"}>{link.name}</Text>
              </NavLink>
            ))}
            <ColorModeToggle />
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
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          <BiUserCheck />
        </Flex>
      </Flex>
      <Box display="flex">
        {isOpen && (
          <Box display={{ md: "none" }} pb="4">
            <Stack as="nav" spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.route} route={link.route}>
                  <Text fontWeight={"medium"}>{link.name}</Text>
                </NavLink>
              ))}
            </Stack>
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
            <ColorModeToggle />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Header;
