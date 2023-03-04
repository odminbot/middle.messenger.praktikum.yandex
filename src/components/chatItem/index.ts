import { Block } from '../../utils/Block';
import template from './chatItem.hbs';
import styles from './chatItem.scss';

interface Props {
  title: string,
  message: string,
  time: string,
  counter: number,
}

export class ChatItem extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
