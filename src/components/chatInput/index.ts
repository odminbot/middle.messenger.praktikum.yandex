import Block from '../../utils/Block';
import template from './chatInput.hbs';
import styles from './chatInput.scss';

interface Props {
  name: string,
  class: string,
  placeholder?: string,
  events?: { focusin: (e: Event) => void; focusout: (e: Event) => void };
}

export class ChatInput extends Block {
  constructor(props: Props) {
    super(props);
  }

  public getValue() {
    return (this.element as HTMLInputElement).value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
