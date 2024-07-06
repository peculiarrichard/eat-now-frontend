import { useAtomValue } from "jotai";
import { userAtom } from "../atoms/other-atoms";
import { useNavigate } from "react-router-dom";
const ProtectedPages = ({ children }: any) => {
  const user = useAtomValue(userAtom);
  const navigate = useNavigate()
  if (!user) {
    navigate("/register")
  }

  return children;
};

export default ProtectedPages;
