import React, { useEffect, useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { getData, updateRental } from '../../services/rental';
import ChakraTableComponent from '../../components/table/table';
import { deleteRental } from '../../services/rental';
import AddDataModal from '../../components/modal/rentalModal';

export default function RentalView() {
  const toast = useToast();
  const [ cars, setCars ] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    order_date: '',
    pickup_date: '',
    dropoff_date: '',
    pickup_location: '',
    dropoff_location: '',
  });
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentRentalId, setCurrentRentalId] = useState(null);

  useEffect(() => {
    rentCar();
  }, []);

  const rentCar = () => {
    const fetchData = async () => {
      try {
        const data = await getData('/rentals');
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

  const handleUpdate = (car) => {
    const order_date = new Date(car.order_date).toISOString().split('T')[0];
    const pickup_date = new Date(car.pickup_date).toISOString().split('T')[0];
    const dropoff_date = new Date(car.dropoff_date).toISOString().split('T')[0];

    setFormData({
      order_date: order_date,
      pickup_date: pickup_date,
      dropoff_date: dropoff_date,
      pickup_location: car.pickup_location,
      dropoff_location: car.dropoff_location,
    });
    setCurrentRentalId(car.rental_id);
    setIsUpdating(true);
    setIsOpen(true);
  };

  const handleAddData = async () => {
    try {
      if (isUpdating) {
        await updateRental(`/rentals/${currentRentalId}`, formData);
        toast({
          title: 'Success',
          description: "Update Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Add new rental logic here
      }
      setIsOpen(false);
      rentCar();
    } catch (error) {
      setErrors({ form: 'Failed to update rental' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onClose = () => {
    setIsOpen(false);
    setIsUpdating(false);
    setFormData({
      order_date: '',
      pickup_date: '',
      dropoff_date: '',
      pickup_location: '',
      dropoff_location: '',
    });
    setErrors({});
  };

  return(
    <Box mt="100px" pl="20px">
      <ChakraTableComponent data={cars} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      <AddDataModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddData={handleAddData}
        errors={errors}
        mode="edit"
      />
    </Box>
  )
}