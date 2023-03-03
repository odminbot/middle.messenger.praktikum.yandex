import { Block } from "../../utils/Block";
import template from "./button.hbs";
import styles from "./button.scss";

interface ButtonProps {
  type: string;
  value?: string;
  className?: string;
  events?: {
    click: (e:Event) => void 
  }
}

export class Button extends Block {
    constructor(props: ButtonProps) {
    super(props);
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
