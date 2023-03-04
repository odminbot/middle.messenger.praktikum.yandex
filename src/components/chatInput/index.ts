import { Block } from "../../utils/Block";
import template from "./chatInput.hbs";
import styles from "./chatInput.scss";

interface Props {
  events?: { focusin: (e: Event) => void; focusout: (e: Event) => void };
}

export class ChatInput extends Block {
    constructor(props: Props) {
      super(props);
    }

    public getValue() {
      return (this.element as HTMLInputElement).value;
    }
  
    render() {
      return this.compile(template, { ...this.props, styles });
    }
  }
  