import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdHome,
  MdInsertChart,
} from "react-icons/md";
import CarView from "./views/car";

const routes = [
  {
    name: "Car List",
    path: "/car-list",
    layout: "/list",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: CarView
  },
  {
    name: "Rental List",
    path: "/rental-list",
    layout: "/list",
    icon: <Icon as={MdInsertChart} width='20px' height='20px' color='inherit' />,
  }
];

export default routes;