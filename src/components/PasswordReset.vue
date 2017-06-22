<template>
  <form class="form-auth-small" @submit.prevent.default>
    <transition name="fade" v-if="loading">
      <div style="position: fixed; top:0; left: 0; width: 100%; height: 100%; z-index: 10000; background-color: rgba(255, 255, 255, 0.68); margin-top: calc(50% - 15px)">
        <vue-spinner size="large" message="Processando..."></vue-spinner>
      </div>
    </transition>
    <label v-if="!token">Digite o seu email e clique em enviar para receber instruções para recuperar sua senha </label>
    <label v-else>Escolha uma nova senha para você: </label>
    <alert v-if="success" type="success">
      <b>Pronto! </b> Enviamos um email para que você redefina a sua senha! <br>
      <a v-if="seconds < 1" href="#" @click="sendPasswordReset">Caso não tenha recebido o email, você pode reenviar o email!</a>
      <template v-else>Caso não receba, em {{ seconds }} segundos você poderá reenviar o email!</template>
    </alert>
    <alert v-if="expired" type="danger">
      <b>Ops! </b> Esse link de redefinição não é mais válido! <br>
      Preencha os seus dados abaixo e faça uma nova solicitação!
    </alert>
    <alert v-if="errorMessages && errorMessages.length > 0">
      <b>Ops! </b> Tivemos um problema ao trocar a senha.
      <br><br>
      <ul>
        <li v-for="error in errorMessages">{{ error }}</li>
      </ul>
    </alert>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.email.$error }">
      <input v-model="user.email" type="email" class="form-control" ref="email" placeholder="Email" @blur="$v.user.email.$touch()" :disabled="token">
    </div>
    <div v-if="token" class="form-group" v-bind:class="{ 'form-group--error': $v.password.$error }">
      <input v-model="password" type="password" class="form-control" ref="password" placeholder="Senha" @blur="$v.password.$touch()">
    </div>
    <div v-if="token" class="form-group" v-bind:class="{ 'form-group--error': $v.passwordConfirm.$error }">
      <input v-model="passwordConfirm" type="password" class="form-control" ref="passwordConfirm" placeholder="Confirmação de Senha" @blur="$v.passwordConfirm.$touch()">
    </div>
    <button v-if="!token" type="submit" @click="sendPasswordReset" class="btn btn-primary btn-lg btn-block" :disabled="(success && seconds > 0) || $v.$invalid">ENVIAR</button>
    <button v-else type="submit" @click="resetPassword" class="btn btn-primary btn-lg btn-block" :disabled="$v.$invalid">TROCAR SENHA</button>
    <div class="bottom">
      <span class="helper-text"><i class="fa fa-reply"></i> <router-link to="/login">Ir para o Login</router-link></span>
    </div>
  </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import userService from './../service/user';
import authService from './../service/auth';

export default {
  name: 'passwordReset',
  data: () => ({
    user: {
      email: '',
    },
    password: 'none',
    passwordConfirm: 'none',
    seconds: 0,
    success: false,
    expired: false,
    token: null,
    loading: false,
    errorMessages: [],
  }),
  validations: {
    user: {
      email: {
        required,
        email,
      },
    },
    password: {
      required,
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  mounted() {
    if (this.$router.currentRoute.query && this.$router.currentRoute.query.token) {
      this.token = this.$router.currentRoute.query.token;
      this.verifyToken();
    } else {
      this.$refs.email.focus();
    }
  },
  methods: {
    verifyToken() {
      this.loading = true;
      const $vm = this;
      userService.verifyToken(this.token).then((response) => {
        $vm.password = '';
        $vm.passwordConfirm = '';
        $vm.user.email = response.data.email;
        $vm.$refs.password.focus();
      }).catch(() => { $vm.expired = true; $vm.token = null; $vm.$refs.email.focus(); })
      .finally(() => { $vm.loading = false; });
    },
    resetPassword() {
      const $vm = this;
      $vm.errorMessages = [];
      $vm.loading = true;
      const data = {
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        token: this.token,
      };

      userService.resetPassword(data).then((response) => {
        authService.resolveAuthResponse(response.data);
      }).catch((err) => {
        if (err.response.status === 401) {
          $vm.expired = true; $vm.token = null; $vm.$refs.email.focus();
        } else if (err.response.data) {
          if (err.response.data.messages) {
            $vm.errorMessages = err.response.data.messages;
          } else if (err.response.data.message) {
            $vm.errorMessages.push(err.response.data.message);
          }
        }
      }).finally(() => { $vm.loading = false; });
    },
    sendPasswordReset() {
      this.success = false;
      this.seconds = 0;
      this.expired = false;
      this.loading = true;
      this.token = null;
      const $vm = this;
      userService.sendPasswordReset(this.user.email).then(() => {
        $vm.success = true;
        $vm.loading = false;
        $vm.seconds = 60;
        const interval = setInterval(() => {
          $vm.seconds -= 1;
          if ($vm.seconds < 1) {
            clearInterval(interval);
          }
        }, 1000);
      });
    },
  },
};
</script>
