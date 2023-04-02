import Block from '../../utils/Block';
import template from './chatList.hbs';
import { Chat } from '../../interfaces';
import styles from './chatList.scss';
import { withStore } from '../../utils/Store';
import { ChatItem } from '../chatItem';
import ChatsController from '../../controllers/ChatController';
import isEqual from '../../utils/helpers';

interface ChatListProps {
  chats: Chat[];
  isLoaded: boolean;
}

class ChatListBase extends Block<ChatListProps> {
  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.chats = this.createChats(newProps);
    return true;
  }

  private createChats(props: ChatListProps) {
    return props.chats.map((data) => new ChatItem({
      ...data,
      selectedChat: undefined,
      events: {
        click: () => {
          ChatsController.selectChat(data.id, data.title);
        },
      },
    }));
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));
// @ts-ignore
export const ChatList = withChats(ChatListBase);
