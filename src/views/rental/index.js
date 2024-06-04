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
  Text
} from '@chakra-ui/react';
import { getData } from '../../services/rental';

export default function RentalView() {
  const [ cars, setCars ] = useState([]);

  useEffect(() => {
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
  }, []);

  return(
    <Box mt="100px" pl="20px">
      <SimpleGrid
        columns={{ sm: 2, md: 3 }}
        gap='10px'
      >
        {
          cars.map((data) => {
            return (
              <div key={data.rental_id}>
                <Card maxW='sm' mb='40px'>
                  <CardBody>
                    <Image
                      src={data.car.image}
                      alt='Green double couch with wooden legs'
                      borderRadius='lg'
                    />
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>
                        <span>{`${data.car.car_name} - ${data.car.car_model}`}</span>
                      </Heading>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tincidunt nec ligula sed tristique. Vivamus sit amet nulla sit amet libero euismod malesuada quis luctus orci.
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing='2'>
                      <Button variant='solid' colorScheme='blue'>
                        Rent Now
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              </div>
            )
          })
        }
      </SimpleGrid>
    </Box>
  )
}