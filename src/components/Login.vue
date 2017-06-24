<template>
  <form class="form-auth-small" @submit.prevent.default>
    <transition name="fade" v-if="loading">
      <div style="position: fixed; top:0; left: 0; width: 100%; height: 100%; z-index: 10000; background-color: rgba(255, 255, 255, 0.68); margin-top: calc(50% - 15px)">
        <vue-spinner size="large" message="Processando..."></vue-spinner>
      </div>
    </transition>
    <alert v-if="loginError">
      <b>Ops! </b> Usuário e/ou senha inválidos!
    </alert>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.email.$error }">
      <input v-model="user.email" type="email" class="form-control" ref="email" placeholder="Email" @blur="$v.user.email.$touch()" :disabled="loading">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.password.$error }">
      <input v-model="user.password" type="password" class="form-control" ref="password" placeholder="Senha" @blur="$v.user.password.$touch()" :disabled="loading">
    </div>
    <button :disabled="loading || $v.$invalid" type="submit" @click="doLogin" class="btn btn-primary btn-lg btn-block">ENTRAR</button>
    <button :disabled="loading" @click="$router.push('/signup')" type="button" class="btn btn-success btn-lg btn-block">NÃO SOU CADASTRADO</button>
    <div class="bottom">
      <span class="helper-text"><i class="fa fa-lock"></i><router-link to="/passwordReset"> Esqueci minha senha?</router-link></span>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import authService from './../service/auth';

export default {
  name: 'login',
  data: () => ({
    user: {
      email: '',
      password: '',
    },
    loading: false,
    loginError: false,
  }),
  validations: {
    user: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    },
  },
  mounted() {
    this.$refs.email.focus();
  },
  methods: {
    doLogin() {
      this.loading = true;
      this.loginError = false;
      const $vm = this;
      authService.login($vm.user).then((response) => {
        authService.resolveAuthResponse(response.data, this.$router.query);
      }).catch(() => { $vm.loginError = true; })
      .finally(() => { setTimeout(() => { this.loading = false; }, 500); });
    },
  },
};
</script>
