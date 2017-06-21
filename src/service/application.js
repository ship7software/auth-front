import Vue from 'vue';

const application = new Vue({
  methods: {
    getAll() {
      return this.$http.get('/application');
    },
  },
});

export default application;
