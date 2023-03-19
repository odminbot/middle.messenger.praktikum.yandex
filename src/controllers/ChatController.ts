import { ChatAPI, TypesUsersChat } from "../api/ChatAPI";
import store from "../utils/Store";

class ChatController {
  private readonly api: ChatAPI;

  socket: WebSocket | null;

  data: any;

  constructor() {
    this.api = new ChatAPI();
    this.socket = null;
  }

  async createChat(data: any) {
    try {
      await this.api.createChat(data);

      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async getChats() {
    const chats = await this.api.read();
    store.set("allChats", chats);
  }

  async getChat(id: number, userId: number, name: string) {
    const resp: any = await this.api.getToken(id);
    const { token } = resp;

    console.log(`chatId: ${id} | token: ${token} | nameChat: ${name} | userId: ${userId}`);
    store.set("chatId", id);
    store.set("token", token);
    store.set("nameChat", name);

    if (this.socket) {
      this.socket.close();
      store.set("chat", { chatId: id });
    }
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`);

    this.socket.addEventListener("close", (event) => {
      
      if (event.wasClean) { 
        console.log("connection close");
      } else {
        console.log("connection lost");
      }

      console.log(`Code: ${event.code} | Reason: ${event.reason}`);
    });

    this.socket.addEventListener("open", () => {
      console.log("connection open");
      (this.socket as WebSocket).send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });

    this.socket.addEventListener("message", (evt) => {
      
      let user = JSON.parse(evt.data); 

      if (!user) {
        throw new SyntaxError('Error');
      } else {
        this.data = {
          ...user,
          chatId: id,
        };
        store.set("chat", user);
      }
    });

    this.socket.addEventListener("error", (evt: any) => {
      console.log('Error', evt.message);
    });

    this.getChats();
  }

  async sendMessage(newMessage: { message: string }) {
    if (this.socket) {
      this.socket.send(
        JSON.stringify({
          content: newMessage.message,
          type: "message",
        })
      );
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    }

    this.getChats();
  }

  async deleteChat(id: number) {
    try {
      await this.api.deleteChat(id);
      store.set("token", undefined);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async addUser(data: TypesUsersChat) {
    try {
      await this.api.addUserToChat(data);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }

  async deleteUser(data: TypesUsersChat) {
    try {
      await this.api.deleteUserFromChat(data);
      await this.getChats();
    } catch (e: any) {
      console.error(e);
    }
  }
}

// export default new ChatController();

const controller = new ChatController();

// @ts-ignore
window.chatsController = controller;

export default controller;