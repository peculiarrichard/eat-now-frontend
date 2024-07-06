import { useAtom, useAtomValue } from "jotai";
import {
  allremindersAtom,
  loadableAllRemindersAtom,
} from "../atoms/other-atoms";
import { AllRemindersSkeleton } from "../components/dashboard/Skeletons";
import { Allreminders } from "../models/Schedule";
import { getReadableTimeAndDate } from "../utils/getReadableTimeAndDate";

const Logs = () => {
  const allReminders = useAtomValue(allremindersAtom);
  const [loadableAllReminders] = useAtom(loadableAllRemindersAtom);
  return (
    <>
      <h1 className="text-xl mb-6">Logs of all scheduled reminders</h1>

      <div className="lg:w-3/5 w-[90%] grid my-6 gap-y-5">
        {loadableAllReminders.state === "loading" && <AllRemindersSkeleton />}
        {loadableAllReminders.state === "hasError" && (
          <p className="text-red-500 text--sm">
            There was an error fetching logs
          </p>
        )}
        {loadableAllReminders.state === "hasData" &&
        allReminders?.length > 0 ? (
          allReminders.map((reminder: Allreminders) => (
            <div key={reminder._id} className="flex flex-col gap-y-4 ">
              {reminder.failReason ? (
                <p className="text-red-500 text-sm">
                  {reminder.name} was run at
                  {getReadableTimeAndDate(reminder.lastRunAt!)} but failed at{" "}
                  {getReadableTimeAndDate(reminder.failedAt!)}. Reason:{" "}
                  {reminder.failReason}
                </p>
              ) : reminder.lastRunAt ? (
                <p>
                  {reminder.name} was run at{" "}
                  {getReadableTimeAndDate(reminder.lastRunAt)} and finished by{" "}
                  {getReadableTimeAndDate(reminder.lastFinishedAt!)}
                </p>
              ) : (
                <p>No job has run yet!</p>
              )}
            </div>
          ))
        ) : loadableAllReminders.state === "hasData" && (
          <div className="flex flex-col gap-y-8">
            <p>No logs have been created yet</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Logs;
