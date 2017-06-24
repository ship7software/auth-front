import Vue from 'vue';
import url from 'url';

const auth = new Vue({
  methods: {
    login(credentials) {
      return this.$http.post('/auth', credentials);
    },
    resolveAuthResponse(response, routerQuery) {
      let redirectUrl = response.redirectUrl;
      if (routerQuery && routerQuery.redirectUrl) {
        redirectUrl = url.resolve(routerQuery.redirectUrl, `?token=${response.token}`);
      }
      window.location.href = redirectUrl;
    },
  },
});

export default auth;
