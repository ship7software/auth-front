import Vue from 'vue';

const user = new Vue({
  methods: {
    sendPasswordReset(email) {
      return this.$http.post('/user/passwordReset/send', { email });
    },
    verifyToken(token) {
      return this.$http.post('/user/passwordReset/verify', { token });
    },
    resetPassword(data) {
      return this.$http.post('/user/passwordReset', data);
    },
  },
});

export default user;
