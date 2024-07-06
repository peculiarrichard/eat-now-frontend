import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { useAtom } from "jotai";
import { isSidebarOpenAtom } from "../../atoms/other-atoms";

export const MobileNav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useAtom(isSidebarOpenAtom);
  return (
    <div className="mobile-nav | fixed w-full bg-white h-16 z-10 top-0 flex justify-between items-center px-4 border-b lg:hidden">
      <Link to="/dashboard">Eat Now</Link>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="text-2xl">
        {isSidebarOpen ? (
          <AiOutlineCloseCircle size={30} />
        ) : (
          <RiMenuUnfoldLine />
        )}
      </button>
    </div>
  );
};
