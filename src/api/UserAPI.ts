import BaseAPI from './BaseAPI';
import { User, EditPassword } from '../interfaces';

export class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public changeProfile(data: User):Promise<Response> {
    return this.http.put('/profile', data);
  }

  public changeAvatar(data: FormData) {
    return this.http.put('/profile/avatar', data);
  }

  public searchUser(login: string) {
    return this.http.post('/search',  { login: login });
  }

  public changePassword(data: EditPassword) {
    return this.http.put('/password', data);
  }

  public getUserById(userId: string): Promise<User> {
    return this.http.get(`/${userId}`);
  }

  search(login: string): Promise<User[]> {
    return this.http.post('/search', {login});
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserAPI();
