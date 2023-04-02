import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { ProfileEditPasswordPage } from './pages/profile/edit/password';
import { ProfileEditUserPage } from './pages/profile/edit/user';
import { ProfileEditAvatarPage } from './pages/profile/edit/avatar';
import { ChatsPage } from './pages/chat';
import Router from './utils/Router';
import AuthController from './controllers/AuthController';
import { Routes } from './interfaces/routes';
import store from './utils/Store';
import './index.scss';

window.addEventListener('DOMContentLoaded', async () => {
  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Registration, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditPassword, ProfileEditPasswordPage)
    .use(Routes.EditUser, ProfileEditUserPage)
    .use(Routes.EditAvatar, ProfileEditAvatarPage)
    .use(Routes.Chat, ChatsPage);

  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registration:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();
    store.set('IsSigned', true);
    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Chat);
    }
  } catch (e) {
    store.set('IsSigned', false);
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
