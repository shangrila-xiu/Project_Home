import {
	INCREMENT,
	DECREMENT,
	CLICKODD
} from './types.js'

import getters from './getters.js'
// import Vuex from 'vuex'
// import Vue from 'vue'
// Vue.use(Vuex);
const state = {
	count:10
};

const mutations = {
	[INCREMENT](state){
		state.count++;
	},
	[DECREMENT](state){
		if(state.count>0){
			state.count--;
		}
		
	},
	
};

export default {
	state,
	mutations,
	getters
}