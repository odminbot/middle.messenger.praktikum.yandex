import { Block } from '../../utils/Block';
import template from './input.hbs';
import styles from './input.scss';

interface InputProps {
  type: string;
  name: string;
  class: string;
  value?: string;
  label?: string,
  error?: string,
  placeholder?: string,
  events?: { focusin: (e: Event) => void; focusout: (e: Event) => void };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
