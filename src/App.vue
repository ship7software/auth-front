<template>
  <div id="wrapper" v-cloak>
    <app-solver @resolved="resolveApp" @error="onError" />
    <transition name="fade" v-if="loading">
      <div class="vertical-align-wrap">
        <div class="vertical-align-middle">
          <vue-spinner size="big" message="Carregando..."></vue-spinner>
        </div>
      </div>
    </transition>
    <transition name="fade" v-else>
      <div class="vertical-align-wrap">
        <div class="vertical-align-middle">
            <div class="auth-box ">
              <div class="left">
                  <div class="content">
                    <div class="header">
                        <div class="logo text-center"><img :src="app.logoUrl" height="50px" alt="Application Logo"></div>
                        <p class="lead">{{ title }}</p>
                    </div>
                    <router-view></router-view>
                  </div>
              </div>
              <div class="right">
                  <div class="overlay"></div>
                  <div class="content text">
                    <h1 class="heading">{{ app.name }}</h1>
                    <div v-html="(app.authPage || {}).htmlDescription"></div>
                  </div>
              </div>
              <div class="clearfix"></div>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import strings from './strings';
import applicationService from './service/application';

export default {
  name: 'app',
  data: () => ({
    loading: true,
    app: {},
    title: 'Login',
  }),
  mounted() {
    this.title = this.$router.currentRoute.name;
    window.document.title = `${strings.app.name} - ${this.title}`;
  },
  watch: {
    $route(route) {
      this.title = route.name;
      window.document.title = `${strings.app.name} - ${this.title}`;
    },
  },
  methods: {
    resolveApp() {
      if (strings.app.shortName === 'default' && !strings.app.loaded) {
        const $vm = this;
        applicationService.getAll().then((response) => {
          const apps = response.data;
          let html = strings.app.authPage.htmlDescription;
          for (let i = 0; i < apps.length; i += 1) {
            html += `<a href='${apps[i].frontendUrlBase}'><img src='${apps[i].whiteLogoUrl}' height="40px"></a>`;
          }

          strings.app.authPage.htmlDescription = html;
          strings.app.loaded = true;
          $vm.finishLoad();
        });
      } else {
        this.finishLoad();
      }
    },
    finishLoad() {
      this.app = strings.app;
      window.document.title = `${strings.app.name} - ${this.title}`;
      setTimeout(() => { this.loading = false; }, 500);
    },
    onError() {

    },
  },
};
</script>

<style>

  [v-cloak] {
    display: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
