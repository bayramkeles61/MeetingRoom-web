import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IRoom } from "../../models/room.model";
import { useAddRoomMutation, useGetAllRoomQuery } from "../../services/roomApi";
import {
  FormControl,
  FormLabel,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  ModalFooter,
  Button,
  Select,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface RoomModalCreateProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoomModalCreate: React.FC<RoomModalCreateProps> = ({
  isOpen,
  onClose,
}) => {
  const [addRoom] = useAddRoomMutation();
  const { refetch } = useGetAllRoomQuery();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IRoom>();

  const onSubmit: SubmitHandler<IRoom> = async (data) => {
    try {
      await addRoom(data);
      await refetch();
      onClose();
    } catch (error) {
      console.error("Error in form submission.", error);
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>Add new Room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} className="space-y-4">
            <FormControl>
              <FormLabel className="text-xs">
                <Text fontSize="sm">Room Name</Text>
              </FormLabel>
              <Input {...register("roomName")} placeholder="Room name" />
            </FormControl>
            <FormControl>
              <FormLabel>
                <Text fontSize="sm">Room Status</Text>
              </FormLabel>
              <Select
                placeholder="Select..."
                {...register("roomStatus", { required: true })}
                bg={errors.roomStatus ? "red.100" : "white"}
              >
                <option value="busy">Busy</option>
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
              </Select>
              {errors.roomStatus && (
                <span className="text-red-500">This field is required</span>
              )}
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
export default RoomModalCreate;
