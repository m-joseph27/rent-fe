import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  PopoverContent,
  Box,
  Grid,
} from '@chakra-ui/react';
import { formatDate } from '../../utils/formatDate';
import {
  MdCarRental,
  MdOutlineDelete,
} from "react-icons/md";

const ChakraTableComponent = ({ data, handleDelete, handleUpdate }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDeleteClick = (item) => {
    // Menetapkan state isPopoverOpen menjadi true untuk menampilkan Popover
    setIsPopoverOpen(true);
    // Memanggil fungsi handleDelete untuk menghapus item
    handleDelete(item);
  }

  return (
    <TableContainer>
      <Table
        variant="striped"
        border="1px"
        borderColor="gray.300">
        <Thead>
          <Tr>
            <Th border="1px" borderColor="gray.300">Car Name</Th>
            <Th border="1px" borderColor="gray.300">Car Model</Th>
            <Th border="1px" borderColor="gray.300">Order Date</Th>
            <Th border="1px" borderColor="gray.300">Pick Up Date</Th>
            <Th border="1px" borderColor="gray.300">Drop Off Date</Th>
            <Th border="1px" borderColor="gray.300">Pick Up Location</Th>
            <Th border="1px" borderColor="gray.300">Drop Off Location</Th>
          </Tr>
        </Thead>
        <Tbody border="1px" borderColor="gray.200">
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>{item.car.car_name}</Td>
              <Td>{item.car.car_model}</Td>
              <Td>{formatDate(item.order_date)}</Td>
              <Td>{formatDate(item.pickup_date)}</Td>
              <Td>{formatDate(item.dropoff_date)}</Td>
              <Td>{item.pickup_location}</Td>
              <Td>{item.dropoff_location}</Td>
              <Td>
                <Flex gap={1}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleUpdate(index)}
                    leftIcon={<MdCarRental />}
                  >
                    Update
                  </Button>
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        colorScheme="red"
                        variant="outline"
                        leftIcon={<MdOutlineDelete />}
                      >
                        Delete
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        <Box>
                          <Grid gap={5}>
                            <span>Are you sure you want to delete?</span>
                            <Button
                              colorScheme="red"
                              variant="outline"
                              onClick={() => handleDeleteClick(item)}
                            >
                              Delete it
                            </Button>
                          </Grid>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ChakraTableComponent;