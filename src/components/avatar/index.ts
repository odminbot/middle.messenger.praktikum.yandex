import Block from '../../utils/Block';
import template from './avatar.hbs';
import styles from './avatar.scss';

interface AvatarProps {
  style: string,
  class: string,
  events: {
    click: (evt: Event) => void;
  };
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
