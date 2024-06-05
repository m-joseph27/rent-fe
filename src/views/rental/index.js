import React, { useEffect, useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { getData } from '../../services/rental';
import ChakraTableComponent from '../../components/table/table';
import { deleteRental } from '../../services/rental';

export default function RentalView() {
  const toast = useToast();
  const [ cars, setCars ] = useState([]);

  useEffect(() => {
    rentCar();
  }, []);

  const rentCar = () => {
    const fetchData = async () => {
      try {
        const data = await getData('/rentals');
        console.log('data', data);
        setCars(data);
      } catch (error) {
        throw new Error();
      }
    }

    fetchData();
  }

  const handleDelete = (cars) => {
    const deleteCar = async () => {
      try {
        await deleteRental(`/rentals/${cars.rental_id}`);
        setCars(prevCars => prevCars.filter(car => car.rental_id !== cars.rental_id));
        rentCar();
        toast({
          title: 'Success',
          description: "Delete Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } catch (error) {
        throw new Error();
      }
    }

    deleteCar();
  }

  const handleUpdate = () => {}

  return(
    <Box mt="100px" pl="20px">
      <ChakraTableComponent data={cars} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </Box>
  )
}