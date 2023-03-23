import MessagesController, {Message as MessageInfo} from '../../controllers/MessagesController';
import Block from '../../utils/Block';
import { ChatInput } from '../chatInput';
import { Button } from '../button';
import isEqual from '../../utils/helpers';
import { ChatMessage } from '../chatMessage';
import styles from './chatCore.scss';
import template from './chatCore.hbs';
import { withStore } from '../../utils/Store';
import timeDateMessage from '../../utils/textMorfing';

interface ChatCoreProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  userId: number;
}

class ChatCoreBase extends Block<ChatCoreProps> {
  constructor(props: ChatCoreProps) {
    super(props);
  }

  protected init() {

    this.children.messages = this.createMessages(this.props);

    this.children.input = new ChatInput({
      class: 'chat_message',
      placeholder: 'Сообщение',
      name: 'message',
    });

    this.children.button = new Button({
      type: 'button',
      className: 'chat_send-button',
      events: {
        click: () => {
          const input = this.children.input as ChatInput;
          const message = input.getValue();
          input.setValue('');
          if (message !== '' && this.props.selectedChat) {
            MessagesController.sendMessage(this.props.selectedChat, message);
          }
        }
      }
    });

  }

  protected componentDidUpdate(oldProps: ChatCoreProps, newProps: ChatCoreProps): boolean {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    this.children.messages = this.createMessages(newProps);
    return true;
  }

  private createMessages(props: ChatCoreProps) {
    return props.messages.map(data => {
      return new ChatMessage({...data, time: timeDateMessage(data.time), isMine: props.userId === data.user_id });
    });
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}

const withSelectedChatCore = withStore(state => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      userId: state.user?.id,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    userId: state.user?.id,
  };
});

export const ChatCore = withSelectedChatCore(ChatCoreBase);
