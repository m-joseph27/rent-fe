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

const AddDataModal = ({ isOpen, onClose, formData, handleInputChange, handleAddData, errors, mode }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode === "edit" ? "Update Rent" : "Rent Car"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={errors.order_date} mb={3}>
            <FormLabel>Order Date</FormLabel>
            <Input
              type="date"
              name="order_date"
              value={formData.order_date}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.order_date}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.pickup_date} mb={3}>
            <FormLabel>Pick Up Date</FormLabel>
            <Input
              type="date"
              name="pickup_date"
              value={formData.pickup_date}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.pickup_date}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.dropoff_date} mb={3}>
            <FormLabel>Drop Off Date</FormLabel>
            <Input
              type="date"
              name="dropoff_date"
              value={formData.dropoff_date}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.dropoff_date}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.pickup_location} mb={3}>
            <FormLabel>Pick Up Location</FormLabel>
            <Input
              name="pickup_location"
              value={formData.pickup_location}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.pickup_location}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.dropoff_location} mb={3}>
            <FormLabel>Drop Off Location</FormLabel>
            <Input
              name="dropoff_location"
              value={formData.dropoff_location}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.dropoff_location}</FormErrorMessage>
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

export default AddDataModal;