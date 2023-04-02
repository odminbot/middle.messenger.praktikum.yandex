import Block from '../../utils/Block';
import template from './chatItem.hbs';
import styles from './chatItem.scss';
import { Chat } from '../../interfaces';
import { withStore } from '../../utils/Store';
import timeDateMessage from '../../utils/textMorfing';

interface ChatItemProps {
  id: number,
  title: string,
  avatar: string,
  selectedChat: Chat | undefined,
  unread_count: number,
  last_message: {
    content: string | null,
    time: string,
  },
  events: {
    click: (e: Event) => void
  };
}

class ChatItemBase extends Block<ChatItemProps> {
  constructor(props: ChatItemProps) {
    super(props);
  }

  render() {
    let text = '';
    let avatar_style = '';
    let time = '';

    if (this.props.last_message?.content) {
      time = timeDateMessage(this.props.last_message?.time);
      const maxLength = 40;
      text = this.props.last_message?.content.length > maxLength ? `${this.props.last_message?.content.slice(0, maxLength)}...` : text;
    }

    if (this.props.avatar) {
      avatar_style = `background-image: url(https://ya-praktikum.tech/api/v2/resources${this.props.avatar})`;
    }

    return this.compile(template, {
      ...this.props,
      time,
      last_message: text,
      avatar: avatar_style,
      unread_count: this.props.unread_count,
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
    });
  }
}

const withSelectedChat = withStore((state) => ({ selectedChat: (state.chats || []).find(({ id }) => id === state.selectedChat) }));

// @ts-ignore
export const ChatItem = withSelectedChat(ChatItemBase);
