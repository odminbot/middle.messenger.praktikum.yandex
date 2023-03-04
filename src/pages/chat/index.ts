import styles from './chat.scss';
import template from './chat.hbs';
import { Block } from '../../utils/Block';
import { ChatItem } from '../../components/chatItem';
import { ChatMessage } from '../../components/chatMessage';
import { ChatInput } from '../../components/chatInput';
import { Button } from '../../components/button';
import { focusin, focusout } from '../../utils/Validator';

export class ChatPage extends Block {
  constructor() {
    super({});
  }

  init() {
    const chatList = [
      {
        title: 'Андрей',
        message: 'Изображение',
        time: '10:49',
        counter: 2,
      },
      {
        title: 'Киноклуб',
        message: 'Вы: стикер',
        time: '12:00',
        counter: 0,
      },
      {
        title: 'Илья',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        time: '15:12',
        counter: 4,
      },
      {
        title: 'Вадим',
        message: 'Вы: Круто!',
        time: 'Пт',
        counter: 0,
      },
      {
        title: 'тет-теты',
        message: 'И Human Interface Guidelines и Material Design рекомендуют...',
        time: 'Ср',
        counter: 0,
      },
    ];

    const messageList = [
      {
        class: 'message-in',
        date: '19 июня',
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. \
        Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
        time: '11:56',
      },
      {
        class: 'message-out',
        date: '',
        text: 'Круто!',
        time: '12:00',
      },
    ];

    this.children.chatItems = [];
    this.children.chatMessages = [];

    for (let i = 0; i < chatList.length; i++) {
      this.children.chatItems.push(
        new ChatItem({
          title: chatList[i].title,
          message: chatList[i].message,
          time: chatList[i].time,
          counter: chatList[i].counter,
        }),
      );
    }

    for (let i = 0; i < messageList.length; i++) {
      this.children.chatMessages.push(
        new ChatMessage({
          class: messageList[i].class,
          date: messageList[i].date,
          text: messageList[i].text,
          time: messageList[i].time,
        }),
      );
    }

    this.children.inputMessage = new ChatInput({
      events: {
        focusin,
        focusout,
      },
    });

    this.children.buttonSend = new Button({
      type: 'submit',
      className: 'chat_send-button',
      events: {
        click: (e) => {
          e.preventDefault();
          this.sendMessage();
        },
      },
    });
  }

  sendMessage() {
    const userMessage = (this.children.inputMessage as ChatInput).getValue();
    console.log(userMessage);
  }

  render() {
    const chatName = 'Вадим';
    return this.compile(template, { ...this.props, styles, chatName });
  }
}
