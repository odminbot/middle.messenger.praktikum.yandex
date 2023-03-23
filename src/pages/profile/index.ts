import template from './profile.hbs';
import styles from './profile.scss';
import Block from '../../utils/Block';
import { UserItem } from '../../components/userItem';
import { Button } from '../../components/button';
import { Avatar } from "../../components/avatar";
import { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import UserController from "../../controllers/UserController";
import router from '../../utils/Router';
import { Routes } from '../../interfaces/routes';

class ProfilePageBase extends Block {
  init() {
    AuthController.fetchUser();
 
    this.children.backButton = new Button({
      value: '',
      type: 'button',
      className: 'send-button',
      events: {
        click: () => router.go(Routes.Chat),
      },
    });

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
    this.children.email = new UserItem({
      label: 'Почта',
      value: this.props?.email,
    });
    this.children.login = new UserItem({
      label: 'Логин',
      value: this.props?.login,
    });
    this.children.firstName = new UserItem({
      label: 'Имя',
      value: this.props?.first_name,
    });
    this.children.secondName = new UserItem({
      label: 'Фамилия',
      value: this.props?.second_name,
    });
    this.children.displayName = new UserItem({
      label: 'Имя в чате',
      value: this.props?.display_name
    });
    this.children.phone = new UserItem({
      label: 'Телефон',
      value: this.props?.phone,
    });
    this.children.editData = new Button({
      value: 'Изменить данные',
      type: 'button',
      className: 'link-button color-default',
      events: {
        click: () => router.go(Routes.EditUser),
      },
    });
    this.children.editPassword = new Button({
      value: 'Изменить пароль',
      type: 'button',
      className: 'link-button color-default',
      events: {
        click: () => router.go(Routes.EditPassword),
      },
    });
    this.children.exit = new Button({
      value: 'Выйти',
      type: 'button',
      className: 'link-button color-active',
      events: {
        click: () => {
          AuthController.logout();
        }
      }
    });
  }
  
  render() {
    const profileName = this.props.first_name;
    return this.compile(template, { ...this.props, styles, profileName });
  }
}

const withUser = withStore((state) => ({ ...state.user }))
export const ProfilePage = withUser(ProfilePageBase);
