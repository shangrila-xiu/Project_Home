import Vue from 'vue'
import App from './App.vue'

import store from './store/'
// import index from './store/'
new Vue({
	// index,
	store,
  el: '#app',
  render: h => h(App)
})
