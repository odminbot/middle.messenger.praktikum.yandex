import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { ProfileEditPasswordPage } from './pages/profile/edit/password';
import { ProfileEditUserPage } from './pages/profile/edit/user';
import { ChatPage } from './pages/chat';
import { Error404 } from './pages/errors/404';
import { Error500 } from './pages/errors/500';
import { renderDom } from './utils/renderDom';

document.addEventListener('DOMContentLoaded', () => {
  const loginPage = new LoginPage();
  const registrationPage = new RegistrationPage();
  const profilePage = new ProfilePage();
  const profileEditPasswordPage = new ProfileEditPasswordPage();
  const profileEditUserPage = new ProfileEditUserPage();
  const chatPage = new ChatPage();
  const error500Page = new Error500();
  const error404Page = new Error404();

  const path: string = document.location.pathname;

  switch (path) {
    case '/':
      renderDom('#app', loginPage);
      break;
    case '/registration':
      renderDom('#app', registrationPage);
      break;
    case '/profile':
      renderDom('#app', profilePage);
      break;
    case '/profile/edit/password':
      renderDom('#app', profileEditPasswordPage);
      break;
    case '/profile/edit/user':
      renderDom('#app', profileEditUserPage);
      break;
    case '/chat':
      renderDom('#app', chatPage);
      break;
    case '/500':
      renderDom('#app', error500Page);
      break;
    case '/404':
      renderDom('#app', error404Page);
      break;
    default:
      renderDom('#app', error404Page);
      break;
  }

  loginPage.dispatchComponentDidMount();
  registrationPage.dispatchComponentDidMount();
  profilePage.dispatchComponentDidMount();
  profileEditPasswordPage.dispatchComponentDidMount();
  profileEditUserPage.dispatchComponentDidMount();
  chatPage.dispatchComponentDidMount();
});
