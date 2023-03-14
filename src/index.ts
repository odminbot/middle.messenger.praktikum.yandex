import { LoginPage } from './pages/login';
import { RegistrationPage } from './pages/registration';
import { ProfilePage } from './pages/profile';
import { ProfileEditPasswordPage } from './pages/profile/edit/password';
import { ProfileEditUserPage } from './pages/profile/edit/user';
import { ChatPage } from './pages/chat';
import { Error404 } from './pages/errors/404';
import { Error500 } from './pages/errors/500';
import Router from "./utils/Router";

window.addEventListener('DOMContentLoaded', async () => {
  const router = new Router("#app");
  router
    .use("/", LoginPage)
    .use("/sign-up", RegistrationPage)
    .use("/settings", ProfilePage)
    .use("/messenger", ChatPage)
    .use("/settings/edit/password", ProfileEditPasswordPage)
    .use("/settings/edit/user", ProfileEditUserPage)
    .use("/500", Error500)
    .use("/404", Error404)
  router.start()

});
