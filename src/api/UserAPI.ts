import BaseAPI from './BaseAPI';
import { User, EditUser, EditPassword } from '../interfaces/auth';

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  //изменять данные пользователя
  public changeProfile(data: EditUser) {
    return this.http.put('/profile', data);
  }

  //изменять аватар
  public changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  public searchUser(login: string) {
    return this.http.post('/search',  { login: login });
  }

  //изменять пароль
  public changePassword(data: EditPassword) {
    return this.http.put('/password', { data });
  }

  public getUserById(userId: string): Promise<User> {
    return this.http.get(`/${userId}`);
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}
