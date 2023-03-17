import UserAPI from '../api/UserAPI';
import { EditPassword, EditUser } from '../interfaces/auth';
import AuthController from './AuthController';

export class UserController {
  private api = new UserAPI();

  async editUser(data: EditUser) {
    try {
      await this.api.changeProfile(data);
      await AuthController.fetchUser();
    } catch (e: any) {
      console.error(e);
    }
  }

  async editPassword(data: EditPassword) {
    try {
      await this.api.changePassword(data);
    } catch (e) {
      console.error(e);
    }
  }

  async editAvatar(data: FormData) {
    try {
      await this.api.changeAvatar(data);
      await AuthController.fetchUser();
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
