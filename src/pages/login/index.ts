import { Block } from '../../utils/Block';
import template from './login.hbs';
import styles from './login.scss';
import { Button } from '../../components/button';
import { LinkButton } from '../../components/linkButton';
import { Input } from '../../components/input';
import { focusin, focusout, submit } from '../../utils/Validator';

export class LoginPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.inputLogin = new Input({
      name: 'login',
      type: 'text',
      label: 'Логин',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPassword = new Input({
      name: 'password',
      type: 'password',
      label: 'Пароль',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.button = new Button({
      value: 'Войти',
      type: 'submit',
      className: 'button',
      events: {
        click: submit,
      },
    });
    this.children.linkButton = new LinkButton({
      colorClass: 'color-default',
      anchor: 'Зарегистрироваться',
      href: '/registration',
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
