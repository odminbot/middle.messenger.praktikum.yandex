import BaseAPI from './BaseAPI';

export interface TypesChat {
  title: string;
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

export interface User {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export interface TypesUsersChat {
  users: number[];
  chatId: number;
}

export class ChatAPI extends BaseAPI {
  constructor() {
      super('/chats');
  }
  
  //список чатов пользователя
  read(): Promise<Chat> {
    return this.http.get('/')
  }
  
  //создать новый чат
  createChat(title: string): Promise<string> {
    return this.http.post('/', title);
  }

  deleteChat(id: number): Promise<string>  {
    return this.http.delete('/', {chatId:id});
  }

  getChatUsers(chatId: number): Promise<string> {
    return this.http.get(`/${chatId}/users`);
  }

  //добавить пользователя в чат
  addUserToChat(data: TypesUsersChat) {
      return this.http.put('/users', data);
  }

  //удалить пользователя из чата
  deleteUserFromChat(data: TypesUsersChat) {
      return this.http.delete('/users', data);
  }

  getToken(chatId: number): Promise<string> {
      return this.http.post(`/token/${chatId}`);
  }
    
  update = undefined
  delete = undefined
  create = undefined;
}
