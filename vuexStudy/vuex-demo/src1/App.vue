<template>
  <div id="app">
    <h1>welcom to Vuex demo</h1>
    <input type="button" name="" value="增加" @click="increment">
    <input type="button" name="" value="减少" @click="decrement">
    <input type="button" name="" value="偶数可以点击会增加" @click="clickOdd">
    <input type="button" name="" value="点击异步请求增加" @click="clickAsync">
    <br>

    <div>
      <!-- <span>现在的数字为</span><strong>{{$store.state.count}}</strong> -->
      <span>现在的数字为</span><strong>{{count}},它现在是{{getOdd}}</strong>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed:mapGetters([
    'count',
    'getOdd'
  ]),
  methods:mapActions([
    'increment',
    'decrement',
    'clickOdd',
    'clickAsync'
  ])
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
