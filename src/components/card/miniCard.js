import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorMode,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import Card from "./index";
import React from "react";

export default function MiniCard(props) {
  const { content, name, growth, value } = props;
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("gray.500", "white");

  return (
    <Card p='15px'
      bg={colorMode === 'dark' ? '#0F0F0F' : '#FFFF'}
      borderRadius='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {content}
        <Stat my='auto' ms={content ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
      </Flex>
    </Card>
  );
}
