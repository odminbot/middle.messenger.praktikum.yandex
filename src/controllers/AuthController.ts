import API, { AuthAPI } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { SigninData, User } from '../interfaces';
import { Routes } from '../interfaces/routes';
import MessagesController from './MessagesController';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      await this.fetchUser();
      store.set('IsSigned', true);
      router.go(Routes.Chat);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: User) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      store.set('IsSigned', true);
      router.go(Routes.Chat);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.setUser(user);
  }

  async logout() {
    try {
      MessagesController.closeAll();
      await this.api.logout();
      store.set('IsSigned', false);
      router.go(Routes.Index);
    } catch (e: any) {
      console.error(e.message);
    }
  }
  
  async back() {
    try {
      router.back();
    } catch (e: any) {
      console.error(e.message);
    }
  }
  
  async forward() {
    try {
      router.forward();
    } catch (e: any) {
      console.error(e.message);
    }
  }

}

export default new AuthController();
