import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdListAlt,
  MdCarRental,
  MdDirectionsCar
} from "react-icons/md";
import CarView from "./views/car";
import RentalView from "./views/rental";
import AddCarView from "./views/addCar";

const routes = [
  {
    name: "Car List",
    path: "/list-car-to-rent",
    layout: "/list",
    icon: <Icon as={MdListAlt} width='20px' height='20px' color='inherit' />,
    component: CarView
  },
  {
    name: "Rental List",
    path: "/rental-list",
    layout: "/list",
    icon: <Icon as={MdCarRental} width='20px' height='20px' color='inherit' />,
    component: RentalView
  },
  {
    name: "Cars",
    path: "/list-of-car",
    layout: "/list",
    icon: <Icon as={MdDirectionsCar} width='20px' height='20px' color='inherit' />,
    component: AddCarView
  }
];

export default routes;