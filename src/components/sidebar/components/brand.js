import React from "react";
import { Flex } from "@chakra-ui/react";
import { HSeparator } from "../../separator/index";

export function SidebarBrand() {

  return (
    <Flex align='center' direction='column'>
      <p className="text-logo">Rent Car</p>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
