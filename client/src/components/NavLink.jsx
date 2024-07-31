import React from "react";
import { IconButton } from "@chakra-ui/react";
import { link as ReactLink } from "react-router-dom";

const NavLink = ({ children, route }) => {
  return (
    <IconButton
      as={ReactLink}
      to={route}
      px="2"
      py="1"
      rounded="md"
      variant="ghost"
    >
      {children}
    </IconButton>
  );
};

export default NavLink;
