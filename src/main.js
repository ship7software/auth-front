// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Axios from 'axios';
import q from 'q';
import promiseFinally from 'promise.prototype.finally';
import Spinner from 'vue-simple-spinner';
import VuePassword from 'vue-password';
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import router from './router';
import './styles/main.css';
import './styles/validation.css';
import App from './App';
import contextService from './service/context';
import AppSolver from './components/AppSolver';
import Alert from './components/Alert';

promiseFinally.shim();
Vue.prototype.$q = q;

Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Axios.defaults.baseURL = process.env.API_URL || '/api';

Vue.use(Vuelidate);

/* eslint-disable no-new, no-param-reassign */

Axios.interceptors.request.use((config) => {
  config.headers['X-Application'] = contextService.getAppStored();
  config.headers['X-Context'] = contextService.getStored();

  return config;
});

Vue.component('app-solver', AppSolver);
Vue.component('vue-spinner', Spinner);
Vue.component('vue-password', VuePassword);
Vue.component('alert', Alert);
Vue.use(VueTheMask);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});
