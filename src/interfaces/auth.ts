export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User extends Record<string, any>{
  id: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
  avatar: string;
}

export interface EditUser {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface EditPassword {
  oldPassword: string;
  newPassword: string;
}
