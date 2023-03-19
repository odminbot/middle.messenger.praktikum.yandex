import UserAPI from '../api/UserAPI';
import { EditPassword, EditUser } from '../interfaces/auth';
import AuthController from './AuthController';
import router from "../utils/Router";
import { Routes } from '../interfaces/routes';

export class UserController {
  
  private api = new UserAPI();

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

  async editUser(data: EditUser) {
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
}

export default new UserController();
