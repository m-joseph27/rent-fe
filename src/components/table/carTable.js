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
  Image,
} from '@chakra-ui/react';
import {
  MdCarRental,
  MdOutlineDelete,
} from "react-icons/md";
import { formatCurrency } from '../../utils/formatCurrency';

const CarTableComponent = ({ data, handleDelete, handleUpdate }) => {
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
            <Th border="1px" borderColor="gray.300">Car Image</Th>
            <Th border="1px" borderColor="gray.300">Car Name</Th>
            <Th border="1px" borderColor="gray.300">Car Model</Th>
            <Th border="1px" borderColor="gray.300">Day Rate</Th>
            <Th border="1px" borderColor="gray.300">Month Rate</Th>
          </Tr>
        </Thead>
        <Tbody border="1px" borderColor="gray.200">
          {data.map((item, index) => (
            <Tr key={index}>
              <Td>
                <Image
                  boxSize='100px'
                  objectFit='cover'
                  src={item.image}
                  alt='car image'
                />
              </Td>
              <Td>{item.car_name}</Td>
              <Td>{item.car_model}</Td>
              <Td>{formatCurrency(item.day_rate)}</Td>
              <Td>{formatCurrency(item.month_rate)}</Td>
              <Td>
                <Flex gap={1}>
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleUpdate(item)}
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

export default CarTableComponent;