import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React from "react";
import {
  useAddScreenMutation,
  useGetScreensByRoomIdQuery,
} from "../../services/screenApi";

import { SubmitHandler, useForm } from "react-hook-form";
import { IScreen } from "../../models/screen.model";
import { useParams } from "react-router-dom";

interface ScreenModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddScreenModal: React.FC<ScreenModalCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const { roomId } = useParams();
  const [addScreen] = useAddScreenMutation();
  const { refetch } = useGetScreensByRoomIdQuery(roomId!);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<IScreen>();

  const onSubmit: SubmitHandler<IScreen> = async (data) => {
    console.log(data);
    let dataWithRoomId = { ...data, roomId: roomId };
    try {
      await addScreen(dataWithRoomId);
      await refetch();
      onClose();
    } catch (error) {
      console.log("Error in form submission.", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add new Screen</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Screen name</FormLabel>
              <Input {...register("screenName")} placeholder="Screen name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Screen Type</FormLabel>
              <Input {...register("screenType")} placeholder="Screen type" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isLoading={isSubmitting}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddScreenModal;
