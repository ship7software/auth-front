<template>
  <form class="form-auth-small" @submit.prevent.default>
    <transition name="fade" v-if="loading">
      <div style="position: fixed; top:0; left: 0; width: 100%; height: 100%; z-index: 10000; background-color: rgba(255, 255, 255, 0.68); margin-top: calc(50% - 15px)">
        <vue-spinner size="large" message="Processando..."></vue-spinner>
      </div>
    </transition>
    <label>Preencha todos os campos abaixo: </label>
    <alert v-if="errorMessages && errorMessages.length > 0">
      <b>Ops! </b> Tivemos um problema ao realizar o cadastro.
      <br><br>
      <ul>
        <li v-for="error in errorMessages">{{ error }}</li>
      </ul>
    </alert>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.sponsorName.$error }">
      <input v-model="sponsorName" type="text" class="form-control" ref="sponsorName" placeholder="Seu nome" @blur="$v.sponsorName.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.name.$error }">
      <input v-model="name" type="text" class="form-control" ref="name" placeholder="Nome da Empresa" @blur="$v.name.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.phone.$error }">
      <the-mask :mask="['(##) ####-####', '(##) #####-####']" v-model="phone" type="tel" class="form-control" ref="phone" placeholder="Telefone" @blur="$v.phone.$touch()"></the-mask>
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.email.$error }">
      <input v-model="email" type="email" class="form-control" ref="email" placeholder="Email" @blur="$v.email.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.password.$error }">
      <input v-model="password" type="password" class="form-control" ref="password" placeholder="Senha" @blur="$v.password.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.passwordConfirm.$error }">
      <input v-model="passwordConfirm" type="password" class="form-control" ref="passwordConfirm" placeholder="Confirmação de Senha" @blur="$v.passwordConfirm.$touch()">
    </div>
    <button @click="register" type="submit" :disabled="$v.$invalid" title="Preencha os campos corretamente" class="btn btn-primary btn-lg btn-block">CADASTRAR</button>
    <div class="bottom">
      <span class="helper-text"><i class="fa fa-lock"></i> <router-link to="/login">Já sou cadastrado</router-link></span>
    </div>
  </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';
import organizationService from './../service/organization';
import authService from './../service/auth';

export default {
  name: 'signup',
  data: () => ({
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    name: '',
    sponsorName: '',
    errorMessages: [],
    loading: false,
  }),
  validations: {
    email: {
      required,
      email,
    },
    name: {
      required,
    },
    sponsorName: {
      required,
    },
    phone: {},
    password: {
      required,
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  mounted() {
    this.$refs.sponsorName.focus();
  },
  methods: {
    register() {
      this.errorMessages = [];
      const $vm = this;
      $vm.loading = true;
      organizationService.register({
        email: this.email,
        password: this.password,
        phone: this.phone,
        name: this.name,
        sponsorName: this.sponsorName,
      }).then((response) => {
        authService.resolveAuthResponse(response.data);
      }).catch((err) => {
        $vm.loading = false;
        if (err.response.data) {
          if (err.response.data.messages) {
            $vm.errorMessages = err.response.data.messages;
          } else if (err.response.data.message) {
            $vm.errorMessages.push(err.response.data.message);
          }
        }
      });
    },
  },
};
</script>
