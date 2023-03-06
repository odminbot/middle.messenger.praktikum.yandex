import { Block } from '../../utils/Block';
import template from './userItem.hbs';
import styles from './userItem.scss';

interface Props {
  label: string;
  value: string;
}

export class UserItem extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
