import Block from '../../utils/Block';
import template from './login.hbs';
import styles from './login.scss';
import { Button } from '../../components/button';
import { Link } from '../../components/linkButton';
import { Input } from '../../components/input';
import { focusin, focusout, isValid } from '../../utils/Validator';
import { SigninData } from '../../interfaces';
import AuthController from '../../controllers/AuthController';
import { Routes } from '../../interfaces/routes';

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
        click: (e) => this.onSubmit(e),
      },
    });
    this.children.linkButton = new Link({
      colorClass: 'color-default',
      anchor: 'Зарегистрироваться',
      href: Routes.Registration,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName('input');
    const signInData = {};
    if (isValid(inputs)) {
      Array.from(inputs).forEach((input) => {
        // @ts-ignore
        signInData[input.name] = input.value;
      });
      AuthController.signin(signInData as SigninData);
    }
  }
  
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
