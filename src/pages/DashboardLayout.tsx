import { SideBar } from "../components/dashboard/Sidebar";
import { MobileNav } from "../components/dashboard/MobileNav";
import { Outlet } from "react-router-dom";
import { Header } from "../components/dashboard/Header";
import { useAtomValue, useSetAtom } from "jotai";
import { userAtom, syncRemindersAtom } from "../atoms/other-atoms";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DashboardLayout = () => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate();
  const setSyncReminders = useSetAtom(syncRemindersAtom);

  useEffect(() => {
    if (!user || user.token === "") {
      navigate("/register");
    }
  }, []);
   useEffect(() => {
    setSyncReminders();
  }, [setSyncReminders]);

  return (
    <>
      <MobileNav />
      <SideBar />

      <div className="lg:ms-[15rem] xl:ms-[17.5rem] px-4 pt-5 max-w-7xl">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default DashboardLayout;
