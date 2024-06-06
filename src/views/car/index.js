import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Spinner,
  Center
} from '@chakra-ui/react';
import { MdCarRental } from 'react-icons/md';
import { getCars } from '../../services/car';
import AddDataModal from '../../components/modal/rentalModal';
import { createRental } from '../../services/rental';
import { formatCurrency } from '../../utils/formatCurrency'; 

export default function CarView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [ cars, setCars ] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    order_date: '',
    pickup_date: '',
    dropoff_date: '',
    pickup_location: '',
    dropoff_location: ''
  });

  useEffect(() => {
    getAllCars();
  }, []);

  const getAllCars = () => {
    const fetchData = async () => {
      try {
        const data = await getCars('/cars');
        setCars(data);
        setLoading(false);
      } catch (error) {
        setLoading(true);
        toast({
          title: 'Error.',
          description: "Seems like the server doesn't working",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }

    fetchData();
  }

  const rentCar = () => {
    const sendData = async () => {
      try {
        await createRental('/rentals', {...formData, car_id: selectedCarId});
        getAllCars();
      } catch (error) {
        toast({
          title: 'Failed.',
          description: "Sorry for the issue.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }

    sendData();
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleAddData = () => {
    if (validate()) {
      rentCar();
      toast({
        title: 'Success',
        description: "You rent the car",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    }
    handleCloseModal();
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.order_date) tempErrors.order_date = "Order date is required";
    if (!formData.pickup_date) tempErrors.pickup_date = "Pick up date is required";
    if (!formData.dropoff_date) tempErrors.dropoff_date = "Drop off is required";
    if (!formData.pickup_location) tempErrors.pickup_location = "Pick up location is required";
    if (!formData.dropoff_location) tempErrors.dropoff_location = "Drop off location is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      order_date: '',
      pickup_date: '',
      dropoff_date: '',
      pickup_location: '',
      dropoff_location: ''
    });
    setErrors({});
  };

  const handleOpenModal = (carId) => {
    setSelectedCarId(carId);
    onOpen();
  };

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  return(
    <Box mt="100px" pl="20px">
      {
        loading ? (
          <Center h="50vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            <SimpleGrid
              columns={{ sm: 2, md: 3 }}
              gap='10px'
            >
              {
                cars.map((data) => {
                  return (
                    <div key={data.car_id}>
                      <Card maxW='sm' mb='40px'>
                        <CardBody>
                          <Image
                            src={data.image}
                            alt='car-image'
                            borderRadius='lg'
                          />
                          <Stack mt='6' spacing='3'>
                            <Heading size='md'>
                              <span>{`${data.car_name} - ${data.car_model}`}</span>
                            </Heading>
                            <Text>
                              <SimpleGrid column={2} spacing={1}>
                                <span>{`Daily ${formatCurrency(data.day_rate)}`}</span>
                                <span>{`Monthly ${formatCurrency(data.month_rate)}`}</span>
                              </SimpleGrid>
                            </Text>
                          </Stack>
                        </CardBody>
                        <Divider />
                        <CardFooter>
                          <ButtonGroup spacing='2'>
                            <Button
                              variant='outline'
                              colorScheme='blue'
                              onClick={() => handleOpenModal(data.car_id)}
                              leftIcon={<MdCarRental />}
                              size="sm">
                              Rent
                            </Button>
                          </ButtonGroup>
                        </CardFooter>
                      </Card>
                    </div>
                  )
                })
              }
            </SimpleGrid>
            <Box>
              <AddDataModal
                isOpen={isOpen}
                onClose={handleCloseModal}
                formData={formData}
                handleInputChange={handleInputChange}
                handleAddData={handleAddData}
                errors={errors}
                mode="create"
              />
            </Box>
          </>
        )
      }
    </Box>
  )
}