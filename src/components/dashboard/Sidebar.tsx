import React from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { SidebarItems } from "../../models/SidebarItems";
import { sidebarList } from "../../data/sidebarList";
import { isSidebarOpenAtom, userAtom } from "../../atoms/other-atoms";
import { useSetAtom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const [isOpen, setIsOpen] = useAtom(isSidebarOpenAtom);
  const location = useLocation();
  const { pathname } = location;
  const setUser = useSetAtom(userAtom);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };
  return (
    <aside
      className={`sidebar | fixed w-4/5 md:w-2/5 lg:w-[15rem] xl:w-[17.5rem] bg-white h-screen z-10 top-0 lg:left-0 pt-6 border-r-2 lg:flex flex-col gap-6 items-start px-2 ${
        isOpen ? "flex" : "hidden"
      }`}>
      <Link to="/dashboard" className="px-4">
        Eat Now
      </Link>

      <ul className="flex flex-col gap-y-3 mb-12 w-[90%] h-3/5 mt-6">
        {sidebarList.map((item: SidebarItems) => (
          <li key={item.id}>
            <Link
              onClick={() => setIsOpen(false)}
              to={item.path}
              className={`${
                pathname === item.path
                  ? "rounded-[0.375rem] border border-[#00e9ca] text-[#00e9ca] font-[800]"
                  : "text-[#586179]"
              } flex gap-x-3 items-center text-sm leading-[1.5rem] px-4 py-2`}>
              {" "}
              {React.createElement(item.icon, { size: 25 })}{" "}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex gap-y-4 w-[90%] justify-self-end">
        <button
          className="flex gap-x-3 items-center text-sm text-[#586179] leading-[1.5rem] px-4"
          onClick={() => handleLogout()}>
          <RiLogoutCircleRLine size={25} /> Signout
        </button>
      </div>
    </aside>
  );
};
