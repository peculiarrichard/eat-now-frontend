import { SidebarItems } from "../models/SidebarItems";
import { IoHomeOutline } from "react-icons/io5";
import { MdDataSaverOff } from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";

export const sidebarList: SidebarItems[] = [
  {
    id: 1,
    path: "/dashboard",
    icon: IoHomeOutline,
    label: "Home",
  },
  {
    id: 2,
    path: "/dashboard/set-reminder",
    icon: IoTimerOutline,
    label: "Set Reminders",
  },
  {
    id: 3,
    path: "/dashboard/logs",
    icon: MdDataSaverOff,
    label: "Logs",
  },
];
