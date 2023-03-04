import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { ProfileEditPasswordPage } from './pages/profile/edit/password';
import { ProfileEditUserPage } from './pages/profile/edit/user';
import { ChatPage } from './pages/chat';
import { Error404 } from './pages/errors/404';
import { Error500 } from './pages/errors/500';
import { renderDom } from './utils/renderDom';

window.addEventListener('DOMContentLoaded', () => {

  let page = new LoginPage();
  const path: string = window.location.pathname;

  switch (path) {
    case '/':
      page = new LoginPage();
      break;
    case '/registration':
      page = new RegistrationPage();
      break;
    case '/profile':
      page = new ProfilePage();
      break;
    case '/profile/edit/password':
      page = new ProfileEditPasswordPage();
      break;
    case '/profile/edit/user':
      page = new ProfileEditUserPage();
      break;
    case '/chat':
      page = new ChatPage();
      break;
    case '/500':
      page = new Error500();
      break;
    case '/404':
      page = new Error404();
      break;
    default:
      page = new Error404();
      break;
  }

  page.dispatchComponentDidMount();
  renderDom('#app', page);
});
