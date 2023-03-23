import Block from '../../utils/Block';
import template from './chatItem.hbs';
import styles from './chatItem.scss';
import {Chat} from '../../interfaces';
import {withStore} from '../../utils/Store';
import timeDateMessage from '../../utils/textMorfing';

interface ChatItemProps {
  id: number,
  title: string,
  selectedChat: Chat | undefined,
  unread_count: number,
  last_message: {
    content: string | null,
    time: any,
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
    let time:any = '';
    
    if (this.props.last_message?.content) {
      time = timeDateMessage(this.props.last_message?.time);
      const maxLength = 40;
      text = this.props.last_message?.content.length > maxLength ? `${this.props.last_message?.content.slice(0, maxLength)}...` : text;
    }  

    return this.compile(template, {
      ...this.props,
      time: time,
      last_message: text,
      unread_count: this.props.unread_count,
      isSelected: this.props.id === this.props.selectedChat?.id,
      styles,
    });
  }
}

const withSelectedChat = withStore((state) => ({selectedChat: (state.chats || []).find(({id}) => id === state.selectedChat)}));

export const ChatItem = withSelectedChat(ChatItemBase);
