import Block from '../../utils/Block';
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

  public getName(): string {
    return (this.getContent() as HTMLInputElement).name;
  }

  public getValue(): string {
    return (this.getContent() as HTMLInputElement).value;
  }

  public setValue(value: string) {
    return (this.element as HTMLInputElement).value = value;
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
