import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Image,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const CarModal = ({ isOpen, onClose, formData, handleInputChange, handleAddData, errors, mode }) => {
  const validationSchema = Yup.object().shape({
    car_name: Yup.string().required('Car Name is required'),
    car_model: Yup.string().required('Car Model is required'),
    day_rate: Yup.number().required('Day Rate is required'),
    month_rate: Yup.number().required('Month Rate is required'),
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "edit" ? "Update Car" : "Add Car"}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={formData}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            handleAddData(values);
            setSubmitting(false);
          }}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form>
              <ModalBody>
                <FormControl isInvalid={errors.car_name} mb={3}>
                  <FormLabel>Car Name</FormLabel>
                  <Field name="car_name" as={Input} />
                  <FormErrorMessage>{errors.car_name}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.car_model} mb={3}>
                  <FormLabel>Car Model</FormLabel>
                  <Field name="car_model" as={Input} />
                  <FormErrorMessage>{errors.car_model}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.day_rate} mb={3}>
                  <FormLabel>Day Rate</FormLabel>
                  <Field name="day_rate" type="number" as={Input} />
                  <FormErrorMessage>{errors.day_rate}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.month_rate} mb={3}>
                  <FormLabel>Month Rate</FormLabel>
                  <Field name="month_rate" type="number" as={Input} />
                  <FormErrorMessage>{errors.month_rate}</FormErrorMessage>
                </FormControl>
                {/* <FormControl mb={3}>
                  <FormLabel>Car Image</FormLabel>
                  <input
                    type="file"
                    name="image"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      console.log('file upload', file);
                      setFieldValue("image", file);
                      if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setFieldValue("image_preview", objectUrl);
                      }
                    }}
                  />
                  {values.image_preview && (
                    <Box mt={2}>
                      <Image src={values.image_preview} alt="Preview" maxH="200px" />
                    </Box>
                  )}
                </FormControl> */}
              </ModalBody>
              <ModalFooter>
                <Button variant="outline" colorScheme="blue" type="submit" isLoading={isSubmitting}>
                  {mode === "edit" ? "Update" : "Add"}
                </Button>
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default CarModal;
