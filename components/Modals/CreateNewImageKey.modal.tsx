/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Flex,
  Text,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import { FaInfoCircle, FaKey, FaWallet } from "react-icons/fa";

export default function CreateNewImageKey({
  isOpen,
  onClose,
  onButtonClick,
}: any) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent rounded={{ base: "none", md: "xl" }}>
        <ModalHeader>
          <Flex alignItems="center" experimental_spaceX="2">
            <Box color="brand.blue">
              <FaWallet />
            </Box>
            <Text>Create new key</Text>
          </Flex>
        </ModalHeader>
        <ModalCloseButton _focus={{}} />
        <ModalBody>
          <Flex
            mb="4"
            direction="column"
            experimental_spaceY="4"
            p="4"
            border="dashed 2px"
            rounded="xl"
            borderColor="blackAlpha.400"
          >
            <Flex justify="center" alignItems="start" experimental_spaceX="2">
              <Box mt="1">
                <FaInfoCircle />
              </Box>
              <Text textAlign="center" fontSize="base">
                You have no registered image key.
              </Text>
            </Flex>
            <Button
              leftIcon={<FaKey />}
              size="lg"
              color="white"
              _hover={{}}
              _focus={{}}
              _active={{}}
              onClick={onButtonClick}
              fontWeight="bold"
              bg="linear-gradient(289.29deg, #00E3D6 -76.18%, #3788FF 116.82%)"
            >
              Create a key
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
