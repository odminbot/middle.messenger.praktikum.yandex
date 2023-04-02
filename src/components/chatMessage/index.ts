import Block from '../../utils/Block';
import template from './chatMessage.hbs';
import styles from './chatMessage.scss';

interface ChatMessageProps {
  date?: string,
  content: string,
  time: string,
  isMine: boolean;
}

export class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    super(props);
  }

  protected render(): DocumentFragment {
    return this.compile(template, { ...this.props, styles });
  }
}
