import { Block } from '../../utils/Block';
import template from './chatMessage.hbs';
import styles from './chatMessage.scss';

interface Props {
  class: string,
  date: string,
  text: string,
  time: string,
}

export class ChatMessage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
