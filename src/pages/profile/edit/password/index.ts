import template from './editPassword.hbs';
import styles from '../../profile.scss';
import Block from '../../../../utils/Block';
import { Input } from '../../../../components/input';
import { Button } from '../../../../components/button';
import { Avatar } from "../../../../components/avatar";
import { focusin, focusout, isValid } from '../../../../utils/Validator';
import router from '../../../../utils/Router';
import { Routes } from '../../../../interfaces/routes';
import UserController from '../../../../controllers/UserController';
import { EditPassword } from '../../../../interfaces';
import { withStore } from '../../../../utils/Store';

class ProfileEditPassword extends Block {

  init() {

    let avatar_style = '';
    let avatar_class = '';
    
    if (this.props.avatar) { 
      avatar_style = `background-image: url(${this.props.avatar})`; 
      avatar_class = 'profile-container_user-pic';
    }
    else { 
      avatar_style = '';  
      avatar_class = 'profile-container_user-pic default_avatar';  
    }
        
    this.children.avatar = new Avatar({
      style: avatar_style,
      class: avatar_class,
      events: {
        click: () => {
          UserController.avatarEdit();
        },
      },
    });

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
      name: 'newPassword',
      type: 'password',
      label: 'Новый пароль',
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
        click: (e) => this.onSubmit(e),
      },
    });

  }

  onSubmit(event: Event) {
    event.preventDefault();
    const inputs = document.getElementsByTagName('input');
    const updatePasswordData = {};
    if (isValid(inputs)) {
      Array.from(inputs).forEach((input) => {
        // @ts-ignore
        updatePasswordData[input.name] = input.value;
      });
      UserController.editPassword(updatePasswordData as EditPassword);
    }
  }

  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }))
export const ProfileEditPasswordPage = withUser(ProfileEditPassword);
