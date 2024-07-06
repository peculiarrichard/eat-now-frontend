import { useAtomValue, useAtom } from "jotai";
import {
  selectedReminderAtom,
  isUpdatingAtom,
  isDeletingAtom,
  updateReminderErrorMsgAtom,
  allremindersAtom,
} from "../../atoms/other-atoms";
import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Spinner,
} from "@chakra-ui/react";
import { getScheduleOptions } from "../../utils/getScheduleOptions";
import { useState } from "react";
import { updateReminder, deleteReminder } from "../../services";
import { PrimaryButton, PrimaryLink } from "./ButtonAndLinks";
import { ReminderCategory } from "./ReminderCategory";

export interface optionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditReminderModal = ({ isOpen, onClose }: optionsProps) => {
  const selectedReminder = useAtomValue(selectedReminderAtom);
  const category = selectedReminder.data.category!;
  const options = getScheduleOptions(category);
  const [scheduleFrequency, setScheduleFrequency] = useState("");
  const [updateLoading, setUpdateLoading] = useAtom(isUpdatingAtom);
  const editToast = useToast();
  const [errMsg, setErrMsg] = useAtom(updateReminderErrorMsgAtom);
  const [allReminders, setAllReminders] = useAtom(allremindersAtom);

  const handleUpdateReminder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateReminder(
      selectedReminder._id,
      setUpdateLoading,
      editToast,
      setAllReminders,
      allReminders,
      scheduleFrequency,
      setErrMsg
    );
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <form
              onSubmit={handleUpdateReminder}
              className="flex flex-col gap-y-4 w-full p-4">
              <ReminderCategory
                options={options}
                category={category}
                scheduleFrequency={scheduleFrequency}
                onChange={(e) => setScheduleFrequency(e)}
              />
              <PrimaryButton
                type="submit"
                name="Update"
                isLoading={updateLoading}
              />
            </form>
            {errMsg && (
              <p className="text-red-500 text-sm text-center">{errMsg}</p>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const DeleteReminderPopover = ({ isOpen, onClose }: optionsProps) => {
  const selectedReminder = useAtomValue(selectedReminderAtom);
  const cancelRef: any = useRef();
  const deleteToast = useToast();
  const [allReminders, setAllReminders] = useAtom(allremindersAtom);
  const [loading, setLoading] = useAtom(isDeletingAtom);

  const handleDeleteReminder = async () => {
    await deleteReminder(
      selectedReminder._id,
      setLoading,
      deleteToast,
      setAllReminders,
      allReminders
    );
    onClose();
  };
  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete this Reminder
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteReminder}
                ml={3}
                disabled={loading}>
                {loading ? <Spinner /> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const CreateReminderSuccessModal = ({
  isOpen,
  onClose,
}: optionsProps) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className="m-auto p-4 flex flex-col items-center justify-center gap-y-4 my-8">
            <p>Yayyy! your reminder has been created</p>
            <PrimaryLink to="/dashboard" name="See all reminders" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
