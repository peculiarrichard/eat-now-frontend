import * as Yup from "yup";

export const registrationValidationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[\W_])/,
      "Password must contain at least one number, one letter, and one special character, and be at least 8 characters long"
    ),
});
