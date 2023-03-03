import { Block } from "../../utils/Block";
import template from "./linkButton.hbs";
import styles from "./linkButton.scss";

interface LinkProps {
  colorClass?: string;
  href: string;
  anchor: string;
}

export class LinkButton extends Block {
  constructor(props: LinkProps) {
    super(props);
  }

render() {
    return this.compile(template, { ...this.props, styles });
  }
}
  