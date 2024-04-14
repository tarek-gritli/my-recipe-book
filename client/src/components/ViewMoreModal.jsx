import React from "react";
import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ViewMoreModal = ({ recipe, onClose, showModal }) => {
  const { description, ingredients, instructions, name, cookingTime } = recipe;
  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold">Description:</Text>
          <Text>{description}</Text>
          <Text fontWeight="bold">Cooking Time:</Text>
          <Text>{cookingTime} minutes</Text>
          <Text fontWeight="bold">Ingredients:</Text>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <Text fontWeight="bold">Instructions:</Text>
          <Text>{instructions}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ViewMoreModal;
