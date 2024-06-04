import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

export default function Features(props) {
  let location = useLocation();
  let activeColor = useColorModeValue("gray.700", "white");
  let inactiveColor = useColorModeValue(
    "gray.600",
    "gray.600"
  );

  let activeIcon = useColorModeValue("orange.500", "white");
  let textColor = useColorModeValue("gray.500", "white");
  let brandColor = useColorModeValue("orange.500", "brand.400");

  const { routes } = props;

  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName);
  };

  const createLinks = (routes) => {
    return routes.map((route, index) => {
      return (
        <NavLink key={index} to={route.layout + route.path}>
          {route.icon ? (
            <Box>
              <HStack
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "24px" : "26px"
                }
                py='5px'
                ps='10px'>
                <Flex w='100%' alignItems='center' justifyContent='center'>
                  <Box
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeIcon
                        : textColor
                    }
                    me='18px'>
                    {route.icon}
                  </Box>
                  <Text
                    me='auto'
                    color={
                      activeRoute(route.path.toLowerCase())
                        ? activeColor
                        : textColor
                    }
                    fontWeight={
                      activeRoute(route.path.toLowerCase())
                        ? "bold"
                        : "normal"
                    }
                    fontSize={
                      activeRoute(route.path.toLowerCase())
                        ? "15px"
                        : "14px"
                    }
                  >
                    {route.name}
                  </Text>
                </Flex>
                <Box
                  h='36px'
                  w='4px'
                  bg={
                    activeRoute(route.path.toLowerCase())
                      ? brandColor
                      : "transparent"
                  }
                  borderRadius='5px'
                />
              </HStack>
            </Box>
          ) : (
            <Box>
              <HStack
                spacing={
                  activeRoute(route.path.toLowerCase()) ? "20px" : "24px"
                }
                py='5px'
                ps='10px'>
                <Text
                  me='auto'
                  color={
                    activeRoute(route.path.toLowerCase())
                      ? activeColor
                      : inactiveColor
                  }
                  fontWeight={
                    activeRoute(route.path.toLowerCase()) ? "bold" : "normal"
                  }>
                  {route.name}
                </Text>
              </HStack>
            </Box>
          )}
        </NavLink>
      );
    });
  };

  return createLinks(routes);
}