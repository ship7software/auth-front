import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import PasswordReset from '@/components/PasswordReset';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'Seja bem vindo!',
      component: Login,
    },
    {
      path: '/signup',
      name: 'Criar conta de acesso',
      component: SignUp,
    },
    {
      path: '/passwordReset',
      name: 'Redefinir a Senha',
      component: PasswordReset,
    },
  ],
});
