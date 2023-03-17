import template from './editPassword.hbs';
import styles from '../../profile.scss';
import Block from '../../../../utils/Block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { focusin, focusout, submit } from '../../../../utils/Validator';
import router from '../../../../utils/Router';
import { Routes } from '../../../../interfaces/routes';

export class ProfileEditPasswordPage extends Block {

  init() {

    this.children.backButton = new Button({
      value: '',
      type: 'button',
      className: 'send-button',
      events: {
        click: () => router.go(Routes.Chat),
      },
    });
    this.children.oldPassword = new Input({
      name: 'oldPassword',
      type: 'password',
      label: 'Старый пароль',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.newPassword = new Input({
      name: 'password',
      type: 'password',
      label: 'Новый пароль',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.repeatPassword = new Input({
      name: 'repeatPassword',
      type: 'password',
      label: 'Повторите новый пароль',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.saveButton = new Button({
      value: 'Сохранить',
      type: 'submit',
      className: 'button',
      events: {
        click: submit,
      },
    });
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}
