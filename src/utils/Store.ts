import { set } from './helpers';
import { EventBus } from './EventBus';
import Block from './Block';
import {User} from '../interfaces';
import {Chat} from '../interfaces/';
import {Message} from '../controllers/MessagesController';
import noAvatar from '../images/profile_no_avatar.svg';

export enum StoreEvents {
  Updated = 'updated'
}

interface State {
  IsSigned?: boolean,
  user?: User,
  chats?: Chat[],
  messages?: Record<number, Message[]>,
  selectedChat?: number,
  selectedChatTitle?: string,
  users?: User[],
}

export class Store extends EventBus {
  private state: State = {};

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data);
    
    this.emit(StoreEvents.Updated, this.getState());
  }

  public setUser(data: User) {
    if (!data.avatar) {
      data.avatar = noAvatar
    } else {
      data.avatar = `https://ya-praktikum.tech/api/v2/resources${data.avatar}`;
    }
    this.set('user', data);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

export function withStore<SP extends Record<string, any>>(mapStateToProps: (state: State) => SP) {

  return function wrap(Component: typeof Block){

    return class WithStore extends Component {

      constructor(props: any) {
        let previousState = mapStateToProps(store.getState());

        super({ ...props, ...previousState });

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState());
          previousState = stateProps;
          this.setProps({ ...stateProps });
        });
      }
    }

  }

}

export default store;
