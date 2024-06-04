import { Box, Flex, Stack } from "@chakra-ui/react";
import Brand from "./brand";
import Features from "./features";
import React from "react";

function SidebarContent(props) {
  const { routes } = props;
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Features routes={routes} />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
