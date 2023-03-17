import template from './errors.hbs';
import Block from '../../utils/Block';
import { LinkButton } from '../../components/linkButton';
import { ErrorPage } from '../../components/error';

export class Error500 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.error = new ErrorPage({
      error: '500',
      message: 'Мы уже фиксим',
      linkButton: new LinkButton({
        colorClass: 'color-default',
        anchor: 'Назад к чатам',
        href: '/messenger',
      }),
    });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
