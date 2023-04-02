import API, { UserAPI } from '../api/UserAPI';
import { EditPassword, User } from '../interfaces';
import AuthController from './AuthController';
import router from '../utils/Router';
import { Routes } from '../interfaces/routes';

export class UserController {
  private readonly api: UserAPI;

  constructor() {
    this.api = API;
  }

  async editAvatar(data: any) {
    try {
      this.api.changeAvatar(data);
      router.go(Routes.Profile);
      setTimeout(() => location.reload(), 300);
    } catch (e: any) {
      console.error(e);
    }
  }

  async avatarEdit() {
    try {
      router.go(Routes.EditAvatar);
    } catch (e: any) {
      console.error(e);
    }
  }

  async editUser(data: User) {
    try {
      const changedData = await this.api.changeProfile(data);
      if (changedData) {
        await AuthController.fetchUser();
        router.go(Routes.Profile);
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  async editPassword(data: EditPassword) {
    try {
      await this.api.changePassword(data);
      router.go(Routes.Profile);
    } catch (e) {
      console.error(e);
    }
  }

  async getIdByLogin(login: string) {
    try {
      const users = await this.api.search(login);

      const user = users.find((u) => u.login === login);

      if (!user) {
        return null;
      }

      return user.id;
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new UserController();
