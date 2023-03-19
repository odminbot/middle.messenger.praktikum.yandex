import API, { AuthAPI } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import { SigninData, SignupData } from '../interfaces/auth';
import { Routes } from '../interfaces/routes';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);
      await this.fetchUser();
      router.go(Routes.Profile);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      console.log('auth controller logout');
      await this.api.logout();
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
