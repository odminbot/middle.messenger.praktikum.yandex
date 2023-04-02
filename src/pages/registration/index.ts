import Block from '../../utils/Block';
import template from './registration.hbs';
import styles from './registration.scss';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/linkButton';
import { focusin, focusout, isValid } from '../../utils/Validator';
import { User } from '../../interfaces';
import AuthController from '../../controllers/AuthController';
import { Routes } from '../../interfaces/routes';

export class RegistrationPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.inputEmail = new Input({
      name: 'email',
      type: 'text',
      label: 'Почта',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
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
    this.children.inputFirstName = new Input({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputSecondName = new Input({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.inputPhone = new Input({
      name: 'phone',
      type: 'tel',
      label: 'Телефон',
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
    this.children.inputRepeatPassword = new Input({
      name: 'repeat_password',
      type: 'password',
      label: 'Пароль (ещё раз)',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.button = new Button({
      value: 'Зарегистрироваться',
      type: 'submit',
      className: 'button',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
    this.children.linkButton = new Link({
      colorClass: 'color-default',
      anchor: 'Войти',
      href: Routes.Index,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName('input');
    const signUpData = {};
    if (isValid(inputs)) {
      Array.from(inputs).forEach((input) => {
        // @ts-ignore
        signUpData[input.name] = input.value;
      });
      AuthController.signup(signUpData as User);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
