import template from './editAvatar.hbs';
import styles from '../../profile.scss';
import Block from '../../../../utils/Block';
import { Button } from '../../../../components/button';
import UserController from '../../../../controllers/UserController';
import AuthController from '../../../../controllers/AuthController';
import { withStore } from '../../../../utils/Store';

export class EditAvatar extends Block<any> {
  constructor(props: any) {
    super(props);
  }

  onSubmit() {
    const inputFile = document.getElementById('avatar') as HTMLInputElement;
    if ((inputFile as any).files[0]) {
      const data = new FormData();
      data.append('avatar', (inputFile as any).files[0]);
      UserController.editAvatar(data as any);
    }
  }

  init() {
    
    this.children.saveButton = new Button({
      type: 'button',
      value: 'Поменять',
      className: 'button',
      events: {
        click: () => {
          this.onSubmit();
        },
      },
    });

    this.children.backButton = new Button({
      type: 'button',
      value: '',
      className: 'send-button',
      events: {
        click: () => {
          AuthController.back();
        },
      },
    });
  }
  render() {
    return this.compile(template, { ...this.props, styles });
  }
}

const withUser = withStore((state) => ({ ...state.user }));
export const ProfileEditAvatarPage = withUser(EditAvatar);
