export interface SigninData {
  login: string;
  password: string;
}

export interface EditPassword {
  oldPassword: string;
  newPassword: string;
}

export interface TitleChat {
  title: string;
}

export interface TypesUsersChat {
  users: number | number[];
  chatId: number;
}

export interface User extends Record<string, any> {
  id?: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  login: string;
  email: string;
  password?: string;
  phone: string;
  avatar?: string;
}

export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: User
    time: string;
    content: string;
  };
}
