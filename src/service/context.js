import Vue from 'vue';
import utils from './../utils';

const context = new Vue({
  methods: {
    get() {
      const query = utils.queryStringToJSON(window.location.search);
      const params = { hostname: window.location.hostname };

      if (query && query.context) {
        params.hostname = query.context;
      }

      return this.$http.get('/context/one', {
        params,
      });
    },
    set(app) {
      window.localStorage.setItem('application', app);
    },
    getStored() {
      return window.localStorage.getItem('application');
    },
  },
});

export default context;
