import { useAtom, useSetAtom } from "jotai";
import { registerAndSigninUser } from "../../services";
import {
  registerValuesAtom,
  isLoadingAtom,
  errorMsgAtom,
  userAtom,
  showPasswordAtom,
  formErrorsAtom,
} from "../../atoms/other-atoms";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { PrimaryButton } from "../dashboard/ButtonAndLinks";
import { Link } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

export const RegisterForm = () => {
  const [formvalues, setFormValues] = useAtom(registerValuesAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
  const setUser = useSetAtom(userAtom);
  const [errMsg, setErrMsg] = useAtom(errorMsgAtom);
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useAtom(showPasswordAtom);
  const [formErrors, setFormErrors] = useAtom(formErrorsAtom);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerAndSigninUser(
      setIsLoading,
      navigate,
      toast,
      setErrMsg,
      formvalues,
      setUser,
      setFormErrors
    );
  };
  return (
    <>
      <div className="flex flex-col gap-y-4 w-[90%] lg:w-[60%] m-auto my-10 lg:my-20">
        <p className="text-center text-2xl font-semibold leading-[2.375rem] mb-4">
          {" "}
          Hi there, please register/sign-in to get started
        </p>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-y-4 w-full lg:w-[70%] m-auto">
          <label
            htmlFor="email"
            className="block text-sm font-[500] mb-2 leading-normal">
            Email*
            <div
              className={`bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
              <input
                type="email"
                id="email"
                className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                placeholder="Enter your email"
                value={formvalues.email}
                onChange={(e) =>
                  setFormValues({ ...formvalues, email: e.target.value })
                }></input>
            </div>
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </label>
          <label
            htmlFor="userName"
            className="block text-sm font-[500] mb-2 leading-normal">
            Username*
            <div
              className={`bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
              <input
                type="text"
                id="userName"
                className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                placeholder="Choose a unique username"
                value={formvalues.userName}
                onChange={(e) =>
                  setFormValues({ ...formvalues, userName: e.target.value })
                }></input>
            </div>
            {formErrors.userName && (
              <p className="text-red-500 text-sm">{formErrors.userName}</p>
            )}
          </label>
          <label
            htmlFor="password"
            className="block text-sm font-[500] mb-2 leading-normal">
            Password*
            <div
              className={`bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700`}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-transparent focus:outline-none appearance-none text-gray-900 w-full"
                placeholder="*********"
                value={formvalues.password}
                onChange={(e) =>
                  setFormValues({ ...formvalues, password: e.target.value })
                }></input>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-ss font-bold text-right text-gray-900">
                {showPassword ? (
                  <MdOutlineVisibility />
                ) : (
                  <MdOutlineVisibilityOff />
                )}
              </button>
            </div>
            <p className="text-sm">
              Password must be at least 8 characters long and must include a
              special character and an uppercase letter
            </p>
            {formErrors.password && (
              <p className="text-red-500 text-sm">{formErrors.password}</p>
            )}
          </label>
          <PrimaryButton
            name="Submit"
            type="submit"
            isLoading={isLoading}></PrimaryButton>
          {errMsg && <p className="text-red-500 text-sm">{errMsg}</p>}
        </form>

        <Link to="/" className="underline text-center">
          Back to home
        </Link>
      </div>
    </>
  );
};
