import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";

export const PrimaryButton = ({
  name,
  type,
  isLoading,
}: {
  name: string;
  type: "button" | "submit" | "reset";
  isLoading: boolean;
}) => {
  return (
    <button
      type={type}
      className="bg-[#00e9ca] text-white font-[700] px-8 py-4 text-center rounded-xl hover:text-black hover:bg-[#c8ffef]">
      {isLoading ? <Spinner /> : name}
    </button>
  );
};

export const PrimaryLink = ({ name, to }: { name: string; to: string }) => {
  return (
    <Link
      to={to}
      className="bg-[#00e9ca] text-white text-center font-[700] px-8 py-4 rounded-xl hover:text-black hover:bg-[#c8ffef]">
      {name}
    </Link>
  );
};
