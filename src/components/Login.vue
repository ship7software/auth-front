<template>
  <form class="form-auth-small" @submit.prevent.default>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.email.$error }">
      <input v-model="user.email" type="email" class="form-control" ref="email" placeholder="Email" @input="$v.user.email.$touch()">
    </div>
    <div class="form-group" v-bind:class="{ 'form-group--error': $v.user.password.$error }">
      <input v-model="user.password" type="password" class="form-control" ref="password" placeholder="Senha" @input="$v.user.password.$touch()">
    </div>
    <button type="submit" class="btn btn-primary btn-lg btn-block">ENTRAR</button>
    <button @click="$router.push('/signup')" type="button" class="btn btn-success btn-lg btn-block">NÃO SOU CADASTRADO</button>
    <div class="bottom">
      <span class="helper-text"><i class="fa fa-lock"></i> <a href="#">Esqueci minha senha?</a></span>
    </div>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  data: () => ({
    user: {
      email: '',
      password: '',
    },
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
};
</script>
