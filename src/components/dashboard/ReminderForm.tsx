import { useAtom } from "jotai";
import { getScheduleOptions } from "../../utils/getScheduleOptions";
import {
  reminderAtom,
  isLoadingAtom,
  reminderErrorMsgAtom,
  allremindersAtom,
} from "../../atoms/other-atoms";
import { PrimaryButton } from "./ButtonAndLinks";
import { createReminder } from "../../services";
import { useDisclosure } from "@chakra-ui/react";
import { CreateReminderSuccessModal } from "./ReminderOptions";
import { stringToCron } from "../../utils/cronconverter";

export const ReminderForm = () => {
  const [reminder, setReminder] = useAtom(reminderAtom);
  const { title, category, scheduleFrequency } = reminder;
  const [isLoading, setIsloading] = useAtom(isLoadingAtom);
  const [errMsg, setErrMsg] = useAtom(reminderErrorMsgAtom);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [allReminders, setAllReminders] = useAtom(allremindersAtom);

  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createReminder(
      reminder,
      setIsloading,
      setErrMsg,
      onOpen,
      setAllReminders,
      allReminders
    );
    setReminder({
      scheduleFrequency: "",
      title: "",
      category: "",
      type: "",
    });
  };

  const options = getScheduleOptions(reminder.category);
  return (
    <>
      <h1 className="text-xl mb-6">Create a new Reminder</h1>
      <form
        className="flex flex-col gap-y-4 w-full lg:w-[70%]"
        onSubmit={handleCreateJob}>
        <label
          htmlFor="title"
          className="block text-sm font-[500] mb-2 leading-normal">
          Title*:
          <div
            className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
            <input
              type="text"
              id="title"
              className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
              placeholder="Choose a name that you can remember for tracking"
              value={title}
              onChange={(e) =>
                setReminder({ ...reminder, title: e.target.value })
              }
            />
          </div>
        </label>

        <label
          htmlFor="category"
          className="block text-sm font-[500] mb-2 leading-normal">
          Category*:
          <div
            className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
            <select
              id="category"
              value={category}
              className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
              onChange={(e) =>
                setReminder({
                  ...reminder,
                  category: e.target.value,
                  scheduleFrequency: "",
                })
              }>
              <option value="">Select Category</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="cheats">Cheat Meals</option>
            </select>
          </div>
        </label>
        {category === "cheats" ? (
          <label
            htmlFor="schedule"
            className="block text-sm font-[500] mb-2 leading-normal">
            When*:
            <div
              className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
              <input
                type="text"
                id="schedule"
                value={scheduleFrequency}
                className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                onChange={(e) =>
                  setReminder({
                    ...reminder,
                    scheduleFrequency: e.target.value,
                    type: "oneoff",
                  })
                }
                placeholder="e.g., Tomorrow at 5pm"
              />
            </div>
            *Cheat meals are once in a while thing. Choose a future date, e.g.,
            Tomorrow at 5pm
          </label>
        ) : (
          category && (
            <label
              htmlFor="schedule"
              className="block text-sm font-[500] mb-2 leading-normal">
              Frequency*:
              <div
                className={`bg-white border-gray-200 flex border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
                <select
                  id="schedule"
                  className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                  onChange={(e) => {
                    const cronValue = stringToCron(e.target.value);
                    setReminder({
                      ...reminder,
                      scheduleFrequency: cronValue,
                      type: "reoccuring",
                    });
                  }}>
                  <option value="">Select Frequency</option>
                  {options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </label>
          )
        )}
        {errMsg && <p className="text-sm text-red-500 text-center">{errMsg}</p>}
        <PrimaryButton
          name="Set reminder"
          type="submit"
          isLoading={isLoading}
        />
      </form>
      <CreateReminderSuccessModal onClose={onClose} isOpen={isOpen} />
    </>
  );
};
