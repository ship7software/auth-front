import Vue from 'vue';

const context = new Vue({
  methods: {
    get() {
      return this.$http.get('/context/one', {
        params: {
          hostname: window.location.hostname,
        },
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
