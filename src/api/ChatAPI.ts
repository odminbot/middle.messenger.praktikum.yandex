import BaseAPI from './BaseAPI';
import { Chat, TitleChat, TypesUsersChat } from '../interfaces';

export class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  read(): Promise<Chat[]> {
    return this.http.get('/');
  }

  createChat(data: TitleChat): Promise<string> {
    return this.http.post('/', data);
  }

  deleteChat(id: number): Promise<string> {
    return this.http.delete('/', { chatId: id });
  }

  getChatUsers(chatId: number): Promise<string> {
    return this.http.get(`/${chatId}/users`);
  }

  addUserToChat(data: TypesUsersChat) {
    return this.http.put('/users', data);
  }

  deleteUserFromChat(data: TypesUsersChat) {
    return this.http.delete('/users', data);
  }

  async getToken(chatId: number): Promise<string> {
    const response = await this.http.post<{token: string}>(`/token/${chatId}`);
    return response.token;
  }

  update = undefined;

  delete = undefined;

  create = undefined;
}

export default new ChatAPI();
