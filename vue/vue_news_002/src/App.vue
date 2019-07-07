
<template>
  <div id="app" v-cloak>
    <div class="container">
      <cHead ></cHead>
        <cNav v-if="isRouterAlive"></cNav>
    <Swiper></Swiper>
    <div>
      <transition enter-active-class="zoomInLeft" leave-active-class="zoomOutRight">
        <!-- <router-view  class="animated"></router-view>   -->
          <router-view  class="animated"></router-view>  
      </transition>
    </div>
    
    <cFooter></cFooter>
    </div>
  </div>

</template>

<script>

import Head from './components/Header/Head.vue'
import Swiper from './components/Swiper/Swiper.vue'
import Nav from './components/NavBar/Nav.vue'

import Home from './components/Home.vue'
import Footer from './components/Footer/Footer.vue'


export default {

  name: 'app',
  provide(){
    return{
      reload: this.reload
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isRouterAlive:true
      
    }
  },
  
  
  components:{
    'cHead':Head,
        'Swiper':Swiper,
    'cNav':Nav,
    'Home':Home,
    // 'cPages':Pages,
    'cFooter':Footer,
    
   
    // 'Article':Article,
    // 'testRouter':testR
    
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
  // inject:['reload'],
 
};

</script>

<style type="text/css" media="screen">
  [v-cloak]{
    display: none;
  }
  *{
    padding: 0;
    margin: 0 auto;
  }
</style>





