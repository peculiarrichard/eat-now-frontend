const apiUrl = import.meta.env.VITE_API_URL;
import { ToastProps } from "@chakra-ui/react";
import { RegisterFormValues, User } from "../models/User";
import { NavigateFunction } from "react-router-dom";
// import { SetStateAction } from "jotai/experimental";
import { handleValidationError } from "../utils/handleValidationErrors";
import { registrationValidationSchema } from "../validations";
import { Allreminders, ScheduleFormValues } from "../models/Schedule";

let user;

if (typeof window !== "undefined") {
  user = JSON.parse(localStorage.getItem("eatNowUser") || "{}");
}
const token = user?.token;

export const registerAndSigninUser = async (
  setLoading: (val: boolean) => void,
  navigate: NavigateFunction,
  toast: (val: ToastProps) => void,
  setErrorMsg: (val: string) => void,
  formValues: RegisterFormValues,
  setUser: (val: User) => void,
  setFormErrors: (errors: { [key: string]: string }) => void
) => {
  try {
    await registrationValidationSchema.validate(formValues, {
      abortEarly: false,
    });
    setLoading(true);
    const url = apiUrl + "/auth/register-and-login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });
    const { message, user } = await res.json();

    if (res.ok) {
      toast({
        title: message,
        description: message,
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      setUser(user);
      navigate("/dashboard");
    } else {
      setErrorMsg(message);
    }
  } catch (error: any) {
    handleValidationError(error, setFormErrors, setErrorMsg);
    console.error(`Error Registering User: ${error}`);
  } finally {
    setLoading(false);
  }
};

export const getAllUserReminders = async () => {
  try {
    const url = apiUrl + "/schedule/get-user-jobs";
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Error fetching all user reminders");
    }
    return data.data;
  } catch (error: any) {
    console.error(`Error Fetching Reminders: ${error}`);
    throw new Error(error.message);
  }
};

export const updateReminder = async (
  id: string,
  setLoading: (val: boolean) => void,
  toast: (val: ToastProps) => void,
  setAllReminders: (val: Allreminders[]) => void,
  allReminders: Allreminders[],
  scheduleFrequency: string,
  setErrorMsg: (val: string) => void
) => {
  setLoading(true);
  try {
    if (!scheduleFrequency) {
      setErrorMsg("Please select a new schedule frequency");
      return;
    }
    const url = apiUrl + "/schedule/update-job/" + id;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ scheduleFrequency }),
    });
    const resData = await res.json();
    const { message, data } = resData;
    const updatedReminders = allReminders.map((reminder) =>
      reminder._id === id ? data : reminder
    );

    setAllReminders(updatedReminders);
    toast({
      title: "Success",
      description: message || "Reminder updated successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error: any) {
    toast({
      title: "Process failed",
      description: error.message || "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    console.error(`Error updating reminder: ${error}`);
  } finally {
    setLoading(false);
  }
};
export const createReminder = async (
  formValues: ScheduleFormValues,
  setLoading: (val: boolean) => void,
  setErrorMsg: (val: string) => void,
  onOpen: () => void,
  setAllReminders: (val: Allreminders[]) => void,
  allReminders: Allreminders[]
) => {
  try {
    setLoading(true);
    const url = apiUrl + "/schedule/create-job/";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formValues),
    });
    const { message, data } = await res.json();
    if (res.ok) {
      const updatedReminders = [...allReminders, data];
      setAllReminders(updatedReminders);
      onOpen();
    } else {
      setErrorMsg(message);
    }
  } catch (error: any) {
    setErrorMsg(
      error.message || "Something went wrong with creating a reminder"
    );
    console.error(`Error creating reminder: ${error}`);
  } finally {
    setLoading(false);
  }
};

export const deleteReminder = async (
  id: string,
  setLoading: (val: boolean) => void,
  toast: (val: ToastProps) => void,
  setAllReminders: (val: Allreminders[]) => void,
  allReminders: Allreminders[]
) => {
  setLoading(true);
  try {
    const url = apiUrl + "/schedule/delete-job/" + id;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    const { message } = data;
    const updatedReminders = allReminders.filter(
      (reminder) => reminder._id !== id
    );
    setAllReminders(updatedReminders);

    toast({
      title: "Reminder Deleted",
      description: message,
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  } catch (error: any) {
    toast({
      title: "Process failed",
      description: error.message || "Something went wrong",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
    console.error(`Error deleting reminder: ${error}`);
  } finally {
    setLoading(false);
  }
};
