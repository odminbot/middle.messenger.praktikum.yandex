import template from './errors.hbs';
import Block from '../../utils/Block';
import { Link } from '../../components/linkButton';
import { ErrorPage } from '../../components/error';

export class Error404 extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.error = new ErrorPage({
      error: '404',
      message: 'Не туда попали',
      linkButton: new Link({
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
