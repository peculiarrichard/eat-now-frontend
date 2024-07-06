import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { User, RegisterFormValues } from "../models/User";
import { ScheduleFormValues, Allreminders } from "../models/Schedule";
import { loadable } from "jotai/utils";
import { getAllUserReminders } from "../services";

export const isSidebarOpenAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(false);
export const isDeletingAtom = atom<boolean>(false);
export const isUpdatingAtom = atom<boolean>(false);
export const errorMsgAtom = atom<string>("");
export const reminderErrorMsgAtom = atom<string>("");
export const updateReminderErrorMsgAtom = atom<string>("");
const userInitialValue: User | null = {
  token: "",
  userName: "",
  email: "",
  id: "",
};
const localStorageSyncStorage = createJSONStorage<User | null>(
  () => localStorage
);
export const userAtom = atomWithStorage<User | null>(
  "eatNowUser",
  userInitialValue,
  localStorageSyncStorage,
  {
    getOnInit: true,
  }
);
export const showPasswordAtom = atom<boolean>(false);
export const registerValuesAtom = atom<RegisterFormValues>({
  password: "",
  userName: "",
  email: "",
});
export const formErrorsAtom = atom<{ [key: string]: string }>({});
export const reminderAtom = atom<ScheduleFormValues>({
  scheduleFrequency: "",
  title: "",
  type: "",
  category: "",
});

export const allremindersAtom = atom<Allreminders[]>([]);

// Step 2: Create a derived atom to fetch reminders
export const fetchAllRemindersAtom = atom<Promise<Allreminders[]>>(async () => {
  const reminders = await getAllUserReminders();
  return reminders;
});

export const loadableAllRemindersAtom = loadable(fetchAllRemindersAtom);

export const syncRemindersAtom = atom(
  (get) => get(allremindersAtom),
  async (get, set) => {
    const reminders = await get(fetchAllRemindersAtom);
    set(allremindersAtom, reminders);
  }
);

// export const allremindersAtom = atom((get, set) => {
//   const loadableState = get(loadableAllRemindersAtom);
//   if (loadableState.state === "hasData") {
//     return loadableState.data;
//   }
//   return [];
// },
//   (get, set) => {
//     const loadableState = get(loadableAllRemindersAtom);
//     if (loadableState.state === "hasData") {
//       set(allremindersAtom, loadableState.data);
//     }
//   }
// );

export const selectedReminderAtom = atom<Allreminders>({
  _id: "",
  name: "",
  priority: 0,
  nextRunAt: new Date(),
  data: {},
  type: "single",
  lockedAt: new Date(),
  lastFinishedAt: new Date(),
});
