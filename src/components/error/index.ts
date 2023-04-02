import styles from './error.scss';
import template from './error.hbs';
import Block from '../../utils/Block';

interface Props {
  error: string
  message: string
  linkButton: Block
}

export class ErrorPage extends Block {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
