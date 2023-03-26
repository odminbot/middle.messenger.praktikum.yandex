import API, { ChatAPI } from "../api/ChatAPI";
import { TypesUsersChat, TitleChat } from '../interfaces/';
import store from "../utils/Store";
import MessagesController from './MessagesController';
import UserController from './UserController';

class ChatController {
  private readonly api: ChatAPI;

  constructor() {
    this.api = API;
  }

  async createChat(data: TitleChat) {
    try {
      await this.api.createChat(data);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async getChats() {
    try {
      const chats = await this.api.read();

      chats.map(async (chat) => {
        const token = await this.getToken(chat.id) ?? '';

        await MessagesController.connect(chat.id, token);
      });

      store.set('chats', chats);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  getToken(chatId: number) {
    try {
      return this.api.getToken(chatId);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      store.set("token", undefined);
      store.set("selectedChat", undefined);
      store.set("users", undefined);
      await this.getChats();
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async addUser(data: TypesUsersChat, currentChat: number) {
    try {
      await this.api.addUserToChat(data);
      await this.getChats();
      await this.getUsers(currentChat);

    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteUser(data: TypesUsersChat, currentChat: number) {
    try {
      await this.api.deleteUserFromChat(data);
      await this.getChats();
      await this.getUsers(currentChat);

    } catch (e: unknown) {
      console.error(e);
    }
  }
  
  async addUserByLogin(login: string) {
    try {
      const currentChat = store.getState().selectedChat;
      if (currentChat) {
        const userId = await UserController.getIdByLogin(login);
        if (userId) {
          await this.addUser({ users: [userId], chatId: currentChat}, currentChat);
        }
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async deleteUserByLogin(login: string) {
    try {
      const currentChat = store.getState().selectedChat;
      if (currentChat) {
        const userId = await UserController.getIdByLogin(login);
        if (userId) {
          await this.deleteUser({ users: [userId], chatId:currentChat}, currentChat);
        }
      }
    } catch (e: unknown) {
      console.error(e);
    }
  }

  async getUsers(chatId: number) {
    try {
      const users = await this.api.getChatUsers(chatId);
      store.set('users', users);
    } catch (e: unknown) {
      console.error(e);
    }
  }

  selectChat(chatId: number, chatTitle: string) {
    store.set('selectedChat', chatId);
    store.set('selectedChatTitle', chatTitle);
    this.getUsers(chatId);
  }
}

export default new ChatController();
