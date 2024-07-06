export interface User {
  token: string;
  userName: string;
  email: string;
  id: string;
}

export interface RegisterFormValues {
  password: string;
  userName: string;
  email: string;
}
