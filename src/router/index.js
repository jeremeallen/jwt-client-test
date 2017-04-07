import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login';
import User from '@/components/Users';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/users',
      name: 'users',
      component: User,
    },
  ],
});
