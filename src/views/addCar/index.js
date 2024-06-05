import React, { useEffect, useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { getCars, updateCar, deleteCar, createCar } from '../../services/car';
import CarTableComponent from '../../components/table/carTable';
import CarModal from '../../components/modal/carModal';

export default function AddCarView() {
  const toast = useToast();
  const [cars, setCars] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCarId, setCurrentCarId] = useState(null);
  const [formData, setFormData] = useState({
    car_name: '',
    car_model: '',
    day_rate: '',
    month_rate: '',
  });

  useEffect(() => {
    getAllCar();
  }, []);

  const getAllCar = () => {
    const fetchData = async () => {
      try {
        const data = await getCars('/cars');
        setCars(data);
      } catch (error) {
        throw new Error();
      }
    }

    fetchData();
  }

  const onClose = () => {
    setIsOpen(false);
    setIsUpdating(false);
    setFormData({
      car_name: '',
      car_model: '',
      day_rate: '',
      month_rate: '',
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddData = async () => {
    try {
      if (isUpdating) {
        await updateCar(`/cars/${currentCarId}`, formData);
        toast({
          title: 'Success',
          description: "Update Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createCar('/cars', formData);
        toast({
          title: 'Success',
          description: "Car Added Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
      setIsOpen(false);
      getAllCar();
    } catch (error) {
      setErrors({ form: 'Failed to add or update car' });
    }
  };

  const handleDelete = (car) => {
    const deleteCarById = async () => {
      try {
        await deleteCar(`/cars/${car.car_id}`);
        toast({
          title: 'Success',
          description: "Delete Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        getAllCar();
      } catch (error) {
        throw new Error();
      }
    }

    deleteCarById();
  }

  const handleUpdate = (car) => {
    setFormData({
      car_name: car.car_name,
      car_model: car.car_model,
      day_rate: car.day_rate,
      month_rate: car.month_rate,
    });
    setCurrentCarId(car.car_id);
    setIsUpdating(true);
    setIsOpen(true);
  }

  return (
    <Box mt="100px" pl="20px">
      <Button mb="30px" variant="solid" colorScheme="blue" onClick={() => setIsOpen(true)}>Add Car</Button>
      <CarTableComponent data={cars} handleDelete={handleDelete} handleUpdate={handleUpdate} />
      <CarModal
        isOpen={isOpen}
        onClose={onClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddData={handleAddData}
        errors={errors}
        mode={isUpdating ? 'edit' : 'add'}
      />
    </Box>
  );
}