import Block from "../../utils/Block";
import template from "./chatHeader.hbs";
import styles from "./chatHeader.scss";
import { withStore } from "../../utils/Store";
import { User } from "../../interfaces";
import { Button } from '../button';
import { ChatInput } from '../chatInput';
import ChatsController from "../../controllers/ChatController";

interface ChatHeaderProps {
  users: User[],
  selectedChat: number,
  selectedChatTitle: string,
}

class ChatHeaderBase extends Block<ChatHeaderProps> {

  protected init() {

    this.children.buttonRemoveChat = new Button({
      value: "Удалить чат",
      className: "chat-button activ",
      type: 'button',
      events: {
        click: () => {
          ChatsController.deleteChat(this.props.selectedChat);
        },
      },
    });

    this.children.inputUserLogin = new ChatInput({
      name: 'login',
      class: 'chat-input chat-input_add-user',
      placeholder: 'Логин',
    });

    this.children.buttonAddUser = new Button({
      value: 'Добавить Пользователя',
      type: 'button',
      className: 'chat-button',
      events: {
        click: () => this.addUser(),
      },
    });

    this.children.buttonRemoveUser = new Button({
      value: "Удалить Пользователя",
      type: 'button',
      className: "chat-button activ",
      events: {
        click: () => this.deleteUser(),
      },
    });

  }

  addUser() {
    const input = this.children.inputUserLogin as ChatInput;
    const login = input.getValue();
    if (login) {
      ChatsController.addUserByLogin(login);
    }
  }

  deleteUser() {
    const input = this.children.inputUserLogin as ChatInput;
    const login = input.getValue();
    if (login) {
      ChatsController.deleteUserByLogin(login);
    }
  }

  protected render(): DocumentFragment {
    return this.compile(template, {...this.props, styles});
  }
}

const withUsers = withStore((state) => ({
  users: state.users, 
  selectedChat: state.selectedChat,
  selectedChatTitle: state.selectedChatTitle,
}));

//@ts-ignore
export const ChatHeader = withUsers(ChatHeaderBase);
