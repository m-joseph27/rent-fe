import React from "react";

import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
} from "@chakra-ui/react";
import SidebarContent from "./components/content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "../scrollbar/index";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

import { IoMdMenu } from "react-icons/io";

function Sidebar(props) {
  const { routes } = props;

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";

  return (
    <Box display={{ sm: "none", xl: "block" }} w="100%" position='fixed' minH='100%'>
      <Box
        bg={sidebarBg}
        transition={variantChange}
        w='300px'
        h='100vh'
        m={sidebarMargins}
        minH='100%'
        overflowX='hidden'
        boxShadow={shadow}>
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}>
          <SidebarContent routes={routes} />
        </Scrollbars>
      </Box>
    </Box>
  );
}

export function SidebarResponsive(props) {
  const { colorMode } = useColorMode();
  let menuColor = useColorModeValue("gray.400", "white");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const { routes } = props;
  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems='center'>
      <Flex ref={btnRef} w='max-content' h='max-content' onClick={onOpen}>
        <Icon
          as={IoMdMenu}
          color={menuColor}
          my='auto'
          w='20px'
          h='20px'
          me='10px'
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={'right'}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent w='285px' maxW='285px' bg={colorMode === 'dark' ? '#0F0F0F' : '#FFFF'}>
          <DrawerCloseButton
            zIndex='3'
            onClose={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW='285px' px='0rem' pb='0'>
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}>
              <SidebarContent routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;