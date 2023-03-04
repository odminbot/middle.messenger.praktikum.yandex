import template from './editUser.hbs';
import styles from '../../profile.scss';
import { Block } from '../../../../utils/Block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { focusin, focusout, submit } from '../../../../utils/Validator';

export class ProfileEditUserPage extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.email = new Input({
      name: 'email',
      type: 'email',
      label: 'Email',
      value: 'pochta@yandex.ru',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.login = new Input({
      name: 'login',
      type: 'text',
      label: 'Логин',
      value: 'ivanivanov',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.firstName = new Input({
      name: 'first_name',
      type: 'text',
      label: 'Имя',
      value: 'Иван',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.secondName = new Input({
      name: 'second_name',
      type: 'text',
      label: 'Фамилия',
      value: 'Иванов',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.displayName = new Input({
      name: 'display_name',
      type: 'text',
      label: 'Имя в чате',
      value: 'Иван',
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.phone = new Input({
      name: 'phone',
      type: 'text',
      label: 'Телефон',
      value: '+7(090) 111 11 11',
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
    const profileName = 'Иван';
    return this.compile(template, { ...this.props, styles, profileName });
  }
}
