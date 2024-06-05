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
} from '@chakra-ui/react';

const CarModal = ({ isOpen, onClose, formData, handleInputChange, handleAddData, errors, mode }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "edit" ? "Update Rent" : "Rent Car"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={errors.car_name} mb={3}>
            <FormLabel>Car Name</FormLabel>
            <Input
              name="car_name"
              value={formData.car_name}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.car_name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.car_model} mb={3}>
            <FormLabel>Car Model</FormLabel>
            <Input
              name="car_model"
              value={formData.car_model}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.car_model}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.day_rate} mb={3}>
            <FormLabel>Day Rate</FormLabel>
            <Input
              type="number"
              name="day_rate"
              value={formData.day_rate}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.day_rate}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.month_rate} mb={3}>
            <FormLabel>Month Rate</FormLabel>
            <Input
            type="number"
              name="month_rate"
              value={formData.month_rate}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.month_rate}</FormErrorMessage>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" colorScheme="blue" onClick={handleAddData}>
            {mode === "edit" ? "Update" : "Rent Now"}
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CarModal;