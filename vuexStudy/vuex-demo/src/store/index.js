import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import actions from './actions.js'
import mutations from './mutations.js'
// import getters from './getters.js'
// import types from './types.js'


export default new Vuex.Store({
	modules:{
		mutations,

	// getters
	},
	actions,//如果放在modules里面，就会报错
	
	
});