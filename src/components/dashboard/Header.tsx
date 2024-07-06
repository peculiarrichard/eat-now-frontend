import { useAtomValue } from "jotai";
import { userAtom } from "../../atoms/other-atoms";

export const Header = () => {
  const user = useAtomValue(userAtom);
  return (
    <>
      <div className="flex items-start mt-16 lg:mt-0 lg:mb-10 justify-between m-auto w-full py-4 rounded-2xl">
        <h1 className="text-xl font-[500]">Hello, {user?.userName}</h1>
      </div>
    </>
  );
};
