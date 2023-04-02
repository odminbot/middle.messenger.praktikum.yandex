import styles from './chat.scss';
import template from './chat.hbs';
import Block from '../../utils/Block';
import { ChatInput } from '../../components/chatInput';
import { Button } from '../../components/button';
import router from '../../utils/Router';
import { Routes } from '../../interfaces/routes';
import ChatsController from '../../controllers/ChatController';
import { ChatList } from '../../components/chatList';
import { ChatCore } from '../../components/chatCore';
import { ChatHeader } from '../../components/chatHeader/chatHeader';

export class ChatsPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.profile = new Button({
      value: 'Профиль >',
      type: 'button',
      className: 'link-button chat_profile-link',
      events: {
        click: () => {
          router.go(Routes.Profile);
        },
      },
    });

    this.children.chatList = new ChatList({ chats: [], isLoaded: false });
    this.children.header = new ChatHeader({ users: [], selectedChat: 0 });
    this.children.chatCore = new ChatCore({});

    ChatsController.getChats().finally(() => {
      (this.children.chatList as Block).setProps({
        isLoaded: true,
      });
    });

    this.children.inputChatName = new ChatInput({
      name: 'title',
      class: 'chat-input chat-input_add-chat',
      placeholder: 'Название нового чата',
    });

    this.children.buttonAddChat = new Button({
      value: 'Добавить',
      type: 'button',
      className: 'chat-button',
      events: {
        click: () => this.addNewChat(),
      },
    });
  }

  addNewChat() {
    const input = this.children.inputChatName as ChatInput;
    const title = input.getValue();
    const data = { title };
    if (title) {
      ChatsController.createChat(data);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
