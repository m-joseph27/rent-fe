import React, { useEffect, useState } from 'react';
import { Box, Button, useToast } from '@chakra-ui/react';
import { getCars, updateCar, deleteCar, uploadImage, createCar } from '../../services/car';
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
    image: null, // Tambahkan field untuk gambar
  });

  useEffect(() => {
    getAllCar();
  }, []);

  const getAllCar = async () => {
    try {
      const data = await getCars('/cars');
      setCars(data);
    } catch (error) {
      console.error('Failed to fetch cars', error);
    }
  }

  const onClose = () => {
    setIsOpen(false);
    setIsUpdating(false);
    setFormData({
      car_name: '',
      car_model: '',
      day_rate: '',
      month_rate: '',
      image: null,
    });
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddData = async (values) => {
    try {
      let imageUrl = '';

      if (values.image) {
        const imageData = new FormData();
        imageData.append('file', values.image);

        console.log('image data', imageData);
        const uploadResponse = await uploadImage('/cars/upload', imageData);
        console.log('upload res', uploadResponse);
        imageUrl = uploadResponse.url; // Ambil URL dari response
      }

      const data = {
        ...values,
        image: imageUrl,
      };

      if (isUpdating) {
        await updateCar(`/cars/${currentCarId}`, data);
        toast({
          title: 'Success',
          description: "Update Successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        await createCar('/cars', data);
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
      console.error('Failed to add or update car', error);
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
        console.error('Failed to delete car', error);
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
      image: null, // Reset gambar saat update
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