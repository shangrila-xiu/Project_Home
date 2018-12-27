import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from '../router.config.js'

import animate from './assets/animate.css'

Vue.use(VueRouter);
const router = new VueRouter(routerConfig);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
  //在1.0
  //components:{App}
})
