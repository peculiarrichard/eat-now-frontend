import {
  allremindersAtom,
  loadableAllRemindersAtom,
  selectedReminderAtom,
} from "../../atoms/other-atoms";
import { useAtom, useAtomValue } from "jotai";
import { AllRemindersSkeleton } from "./Skeletons";
import { Allreminders } from "../../models/Schedule";
import { PrimaryLink } from "./ButtonAndLinks";
import { SlOptions } from "react-icons/sl";
import { Menu, MenuList, MenuItem, MenuButton } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { EditReminderModal, DeleteReminderPopover } from "./ReminderOptions";
import { getReadableTimeAndDate } from "../../utils/getReadableTimeAndDate";

export const AllRemindersDisplay = () => {
  const date = new Date().toISOString();
  const allReminders = useAtomValue(allremindersAtom);
  const [, setSelectedReminder] = useAtom(selectedReminderAtom);
  const [loadableAllReminders] = useAtom(loadableAllRemindersAtom);
  const updateDisclosure = useDisclosure();
  const deleteDisclosure = useDisclosure();

  return (
    <>
      <h1 className="text-xl mb-6">All Reminders</h1>
      <div className="lg:w-4/5 xl:w-3/5 w-[90%] grid my-6 gap-y-5">
        {loadableAllReminders.state === "loading" && <AllRemindersSkeleton />}
        {loadableAllReminders.state === "hasError" && (
          <p className="text-red-500 text--sm">
            There was an error fetching your reminders
          </p>
        )}
        {loadableAllReminders.state === "hasData" && allReminders?.length > 0
          ? allReminders.map((reminder: Allreminders) => (
              <div
                key={reminder._id}
                className="flex items-center justify-between p-3 border-2 shadow-sm rounded-2xl h-32 lg:h-20 max-h-32 ">
                <div className="flex flex-col md:flex-row gap-x-6">
                  <p>Title: {reminder.data.title}</p>
                  <p>Reminder Type: {reminder.data.type}</p>
                  <p>
                    Next run:{" "}
                    {reminder.nextRunAt
                      ? getReadableTimeAndDate(reminder.nextRunAt)
                      : "-"}
                  </p>
                </div>
                <Menu>
                  <MenuButton onClick={() => setSelectedReminder(reminder)}>
                    <SlOptions />
                  </MenuButton>
                  <MenuList>
                    {reminder.nextRunAt &&
                      new Date(reminder.nextRunAt).toISOString() > date && (
                        <MenuItem onClick={() => updateDisclosure.onOpen()}>
                          Update
                        </MenuItem>
                      )}

                    <MenuItem onClick={() => deleteDisclosure.onOpen()}>
                      <p className="text-red-500">Delete</p>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            ))
          : loadableAllReminders.state === "hasData" && (
              <div className="flex flex-col gap-y-8">
                <p>You are yet to create a reminder</p>
                <PrimaryLink
                  to="/dashboard/set-reminder"
                  name="Create new reminder"
                />
              </div>
            )}
        <EditReminderModal
          isOpen={updateDisclosure.isOpen}
          onClose={updateDisclosure.onClose}
        />
        <DeleteReminderPopover
          isOpen={deleteDisclosure.isOpen}
          onClose={deleteDisclosure.onClose}
        />
      </div>
    </>
  );
};
