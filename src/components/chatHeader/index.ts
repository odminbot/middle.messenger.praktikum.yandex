import styles from './chatHeader.scss';
import template from './chatHeader.hbs';
import Block from '../../utils/Block';
import ChatController from '../../controllers/ChatController';
import { Button } from '../button';
import { ChatInput } from '../chatInput';

type Props = {
  chatId: number;
  nameChat: string;
};

export class ChatHeader extends Block<Props> {
  constructor(props: Props) {
    super(props);
  }

init() {

    this.children.inputUserId = new ChatInput({
      name: 'userId',
      class: 'chat-input',
      placeholder: 'user id',
    });

    this.children.buttonAddUser = new Button({
      value: 'Add User',
      type: 'button',
      className: 'chat-button',
      events: {
        click: () => {
          let form = document.querySelector(".add-remove-user") as HTMLDivElement;;
          const inputs = form.querySelectorAll("input");
          let data: any = {};
          inputs.forEach((input) => {data[input.name] = input.value;});
          if (data?.userId) {
            ChatController.addUser({chatId: this.props.chatId, users: [data.userId],});
          }
          const element =  document.querySelector(".add-remove-user") as HTMLFormElement;
          if (typeof(element) !== 'undefined' && element !== null) {
            element.reset();
          }
          return true;
        },
      },
    });

    this.children.buttonRemoveUser = new Button({
      value: "Delete User",
      type: 'button',
      className: "chat-button activ",
      events: {
        click: () => {

          let form = document.querySelector(".add-remove-user") as HTMLDivElement;;
          const inputs = form.querySelectorAll("input");
          let data: any = {};
          inputs.forEach((input) => {data[input.name] = input.value;});
          if (data?.userId) {
            ChatController.deleteUser({
              chatId: this.props.chatId,
              users: [parseInt(data.userId)],
            });
            data.userId = "";
          }
        },
      },
    });

    this.children.buttonRemoveChat = new Button({
      value: "Удалить чат",
      className: "chat-button activ",
      type: 'button',
      events: {
        click: () => {
          ChatController.deleteChat(this.props.chatId);
        },
      },
    });

  }

  render() { 
    return this.compile(template, { ...this.props, styles });  
  }
}
