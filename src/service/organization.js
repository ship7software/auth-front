import Vue from 'vue';

const organization = new Vue({
  methods: {
    register(org) {
      return this.$http.post('/organization', org);
    },
  },
});

export default organization;
