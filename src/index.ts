import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { ProfileEditPasswordPage } from './pages/profile/edit/password';
import { ProfileEditUserPage } from './pages/profile/edit/user';
//import { ChatPage } from './pages/chat';
//import { Error404 } from './pages/errors/404';
//import { Error500 } from './pages/errors/500';
import Router  from './utils/Router';
import AuthController from './controllers/AuthController';
import { Routes } from './interfaces/routes';

window.addEventListener('DOMContentLoaded', async () => {

  Router
    .use(Routes.Index, LoginPage)
    .use(Routes.Registration, RegistrationPage)
    .use(Routes.Profile, ProfilePage)
    .use(Routes.EditPassword, ProfileEditPasswordPage)
    .use(Routes.EditUser, ProfileEditUserPage)
    //.use(Routes.Chat, ChatPage)
  
  let isProtectedRoute = true;

  switch (window.location.pathname) {
    case Routes.Index:
    case Routes.Registration:
      isProtectedRoute = false;
      break;
  }

  try {
    await AuthController.fetchUser();

    Router.start();

    if (!isProtectedRoute) {
      Router.go(Routes.Profile)
    }
  } catch (e) {
    Router.start();

    if (isProtectedRoute) {
      Router.go(Routes.Index);
    }
  }
});
