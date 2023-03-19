import styles from './chat.scss';
import template from './chat.hbs';
import Block from '../../utils/Block';
import { ChatItem } from '../../components/chatItem';
import { ChatHeader } from '../../components/chatHeader';
import { ChatMessage } from '../../components/chatMessage';
import { ChatInput } from '../../components/chatInput';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { focusin, focusout } from '../../utils/Validator';
import router from '../../utils/Router';
import ChatController from "../../controllers/ChatController";
import { Routes } from '../../interfaces/routes';
import { withStore } from "../../utils/Store";

export type ChatInfo = {
  last_message: {
    content: string,
  },
  title: string,
  id: number,
  unread_count: number,
};

type MessageData = {
  time: Date,
  user_id: number,
  content: string,
};

class ChatPage extends Block {
  // constructor() {
  //   super({});
  // }

  init() {
    
     // const messageList = [
    //   {
    //     class: 'message-in',
    //     date: '19 июня',
    //     text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \
    //     Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    //     time: '11:56',
    //   },
    //   {
    //     class: 'message-out',
    //     date: '',
    //     text: 'Круто!',
    //     time: '12:00',
    //   },
    // ];

    this.children.profile = new Button({
      value: 'Профиль >',
      type: 'button',
      className: 'link-button chat_profile-link',
      events: {
        click: () => router.go(Routes.Profile),
      }
    });

    this.children.inputChatName = new ChatInput({
      name: 'title',
      class: 'chat-input',
      placeholder: 'Название нового чата',
    });

    this.children.buttonAddChat = new Button({
      value: "Добавить",
      type: 'button',
      className: "chat-button add",
      events: {
        click: () => {
          let form = document.querySelector(".chat_add") as HTMLDivElement;
          const inputs = form.querySelectorAll("input");
          let data: any = {};
          inputs.forEach((input) => {
            data[input.name] = input.value;
          });
          ChatController.createChat(data);
        }
      }
    });

    this.children.inputMessage = new ChatInput({
      name: 'message',
      class: 'chat_message',
      placeholder: 'Сообщение',
    });

    this.children.buttonSend = new Button({
      type: 'submit',
      className: 'chat_send-button',
      events: {
        click: (e) => {
          e.preventDefault();
          this.sendMessage();
        }
      }
    });

    this.children.chatItems = [];
    const Textlength = 40;

    if (this.props?.allChats !== undefined) {
      
      Object.values(this.props.allChats).forEach((chats: any) => {

        const text = chats.last_message?.content.length > Textlength
                     ? `${chats.last_message?.content.slice(0, Textlength)}...`
                     : chats.last_message?.content;

        this.children.chatItems.push(
          new ChatItem({
            title: chats.title,
            message: text,
            counter: chats.unread_count,
            events: {
              click: () => {
                ChatController.getChat(
                  chats.id,
                  this.props.user.id,
                  chats.title,
                );
              }
            }
          })
        );
      });
    }

    console.log(this.props.token);
    console.log(this.props.nameChat);

    if (this.props?.token !== undefined) {
      this.children.header = new ChatHeader({
        chatId: this.props.chatId,
        nameChat: this.props.nameChat,
      });
    }

    // this.children.chatMessages = [];

    // for (let i = 0; i < messageList.length; i++) {
    //   this.children.chatMessages.push(
    //     new ChatMessage({
    //       class: messageList[i].class,
    //       date: messageList[i].date,
    //       text: messageList[i].text,
    //       time: messageList[i].time,
    //     }),
    //   );
    // }
  }

  sendMessage() {
    const userMessage = (this.children.inputMessage as ChatInput).getValue();
    console.log(userMessage);
  }

  render() {
    const chatName = this.props.first_name;
    return this.compile(template, { ...this.props, styles, chatName });
  }
}

const withChats = withStore((state) => ({
  allChats: state.allChats,
  chatId: state.chatId,
  nameChat: state.nameChat,
  token: state.token,
  user: state.user,
  chat: state.chat,
}));

export const ChatsPage = withChats(ChatPage);
