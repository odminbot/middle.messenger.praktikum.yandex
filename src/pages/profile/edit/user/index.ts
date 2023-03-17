import template from './editUser.hbs';
import styles from '../../profile.scss';
import Block from '../../../../utils/Block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { focusin, focusout, submit, isValid } from '../../../../utils/Validator';
import router from '../../../../utils/Router';
import { Routes } from '../../../../interfaces/routes';
import UserController from '../../../../controllers/UserController';
import { EditUser } from '../../../../interfaces/auth';
import store from '../../../../utils/Store';

export class ProfileEditUserPage extends Block {

  constructor() {
    super({});
  }

  init() {

    const userData = store.getState().user;

    this.children.backButton = new Button({
      value: '',
      type: 'button',
      className: 'send-button',
      events: {
        click: () => router.go(Routes.Chat),
      },
    });
    this.children.email = new Input({
      name: 'email',
      type: 'email',
      label: 'Email',
      value: userData.email,
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
      value: userData.login,
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
      value: userData.first_name,
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
      value: userData.second_name,
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
      value: userData.display_name,
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
      value: userData.phone,
      class: 'input-container',
      events: {
        focusin,
        focusout,
      },
    });
    this.children.saveButton = new Button({
      value: 'Сохранить',
      type: 'button',
      className: 'button',
      events: {
        click: (e) => this.onSubmit(e),
      },
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    
    console.log('submit1');

    const inputs = document.getElementsByTagName('input');
    const updateUserData = {};
    if (isValid(inputs)) {
      Array.from(inputs).forEach((input) => {
        // @ts-ignore
        updateUserData[input.name] = input.value;
      });

      console.log('submit2');
      UserController.editUser(updateUserData as EditUser);
      console.log('submit3');
      router.go(Routes.Profile);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }

}
