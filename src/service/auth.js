import Vue from 'vue';

const auth = new Vue({
  methods: {
    login(credentials) {
      return this.$http.post('/auth', credentials);
    },
    resolveAuthResponse(response) {
      window.location.href = response.redirectUrl;
    },
  },
});

export default auth;
