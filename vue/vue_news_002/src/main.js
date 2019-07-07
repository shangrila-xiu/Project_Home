import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './configRouter.js'
import axios from 'axios'
import Home from './components/Home.vue'
import Login from './components/User/User_login.vue'
import Reg from './components/User/UserReg.vue'
import domain from './domain.js';
import  filters from './filters/'
import Vuex from 'vuex'//状态管理机制
// import Store from './vuex/store.js'
import VeeValidate from 'vee-validate';//表单验证插件
 import 'babel-polyfill'
Vue.use(VeeValidate);
Vue.use(VueRouter);
Vue.use(Vuex);
export default new VueRouter({
  mode: 'history'  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
}) 
Vue.prototype.$ajax=axios;//修改Vue的原型属性

const router=new VueRouter({
	mode: 'history', //切换路径模式，变成history模式
  scrollBehavior: () => ({ y: 0 }), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
	routes
});
// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
global.domain = domain;
// Vue.prototype.$bus = new Vue()

new Vue({
	// Store,
	router,
  el: '#app',
  render: h => h(App)
})
