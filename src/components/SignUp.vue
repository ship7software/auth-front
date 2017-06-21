<template>
  <form class="form-auth-small">
    <label>Preencha todos os campos abaixo: </label>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.sponsorName.$error }">
      <input v-model="user.sponsorName" type="text" class="form-control" ref="sponsorName" placeholder="Seu nome" @input="$v.user.sponsorName.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.name.$error }">
      <input v-model="user.name" type="text" class="form-control" ref="name" placeholder="Nome da Empresa" @input="$v.user.name.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.phone.$error }">
      <input v-model="user.phone" type="tel" class="form-control" ref="phone" placeholder="Telefone" @input="$v.user.phone.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.email.$error }">
      <input v-model="user.email" type="email" class="form-control" ref="email" placeholder="Email" @input="$v.user.email.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.password.$error }">
      <input v-model="user.password" type="password" class="form-control" ref="password" placeholder="Senha" @input="$v.user.password.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.passwordConfirm.$error }">
      <input v-model="user.passwordConfirm" type="password" class="form-control" ref="passwordConfirm" placeholder="Confirmação de Senha" @input="$v.user.passwordConfirm.$touch()">
    </div>
    <button type="submit" class="btn btn-primary btn-lg btn-block">CADASTRAR</button>
    <div class="bottom">
      <span class="helper-text"><i class="fa fa-lock"></i> <router-link to="/login">Já sou cadastrado</router-link></span>
    </div>
  </form>
</template>

<script>
import { required, email, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'signup',
  data: () => ({
    user: {
      email: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      name: '',
      sponsorName: '',
    },
  }),
  validations: {
    user: {
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
      phone: {
        required,
      },
      password: {
        required,
      },
      passwordConfirm: {
        required,
        sameAsPassword: sameAs(user => user.passwordConfirm),
      },
    },
  },
  mounted() {
    this.$refs.sponsorName.focus();
  },
};
</script>
