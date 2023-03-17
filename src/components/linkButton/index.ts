import Block from '../../utils/Block';
import { PropsWithRouter, withRouter } from '../../hocs/withRouter';
import template from './linkButton.hbs';
import styles from './linkButton.scss';

interface LinkProps extends PropsWithRouter {
  colorClass?: string;
  href: string;
  anchor: string;
  events?: {
    click: () => void;
  };
}

class LinkButton extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: () => this.navigate()
      },
    });
  }

  navigate() {
    this.props.router.go(this.props.href);
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

export const Link = withRouter(LinkButton);
