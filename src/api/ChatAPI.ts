import BaseAPI from './BaseAPI';

export interface IChatInfo {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    first_name: string,
    second_name: string,
    avatar: string,
    email: string,
    login: string,
    phone: string
  },
  time: string
  content: string
}

export interface IChatData {
  id?: string,
  title?: string,
  chatId?: number,
  userId?: number
}

export default class ChatAPI extends BaseAPI {
  constructor() {
      super('/chats');
  }
  
  read(): Promise<IChatInfo> {
    return this.http.get('/')
  }
  
  //создать новый чат
  createChat(title: string): Promise<string> {
    return this.http.post('/', {title})
  }

  deleteChat(chatId: number): Promise<string>  {
    return this.http.delete('/', {chatId});
  }

  getChatUsers(chatId: number): Promise<string> {
    return this.http.get(`/${chatId}/users`);
  }

  //добавить пользователя в чат
  addUserToChat(chatId: number, userId: number) {
      return this.http.put('/users', { users: [userId], chatId: chatId })
  }

  //удалить пользователя из чата
  deleteUserFromChat(chatId: number, userId: number) {
      return this.http.delete('/users', { users: [userId], chatId: chatId })
  }

  //список чатов пользователя
  getToken(chatId: number): Promise<string> {
      return this.http.post(`/token/${chatId}`);
  }
    
  update = undefined
  delete = undefined
  create = undefined;
}
