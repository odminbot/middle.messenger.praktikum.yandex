import template from './profile.hbs';
import styles from "./profile.scss";
import { Block } from '../../utils/Block';
import { UserItem } from '../../components/userItem';
import { LinkButton } from '../../components/linkButton';

export class ProfilePage extends Block {
    constructor() {
       super({});
    }

    init() {
        this.children.email = new UserItem({
            label: "Почта",
            value: "pochta@yandex.ru",
        });
        this.children.login = new UserItem({
            label: "Логин",
            value: "ivanivanov",
        });
        this.children.firstName = new UserItem({
            label: "Имя",
            value: "Иван",
        });
        this.children.secondName = new UserItem({
            label: "Фамилия",
            value: "Иванов",
        });
        this.children.displayName = new UserItem({
            label: "Имя в чате",
            value: "Иван",
        });
        this.children.phone = new UserItem({
            label: "Телефон",
            value: "+7(090) 111 11 11",
        });
        this.children.editData = new LinkButton({
            colorClass: "color-default",
            anchor: "Изменить данные",
            href: "/profile/edit/user",
        });
        this.children.editPassword = new LinkButton({
            colorClass: "color-default",
            anchor: "Изменить пароль",
            href: "/profile/edit/password",
        });
        this.children.exit = new LinkButton({
            colorClass: "color-active",
            anchor: "Выйти",
            href: "/chat",
        });
  }

  render() {
        const profileName = 'Иван';
        return this.compile(template, { ...this.props, styles, profileName });
  }
}
