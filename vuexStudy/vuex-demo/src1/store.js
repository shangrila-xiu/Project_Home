import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
	count:0
};
const mutations={//处理数据、状态的变化
	increment(state){
		state.count++;
	},
	decrement(state){
		if(state.count>0){
		state.count--;
		}
	},
	
};

const actions={
	increment:({//处理你要干什么，异步请求，判断，流程控制
		commit
	})=>{
		// console.log(commit);
		commit('increment');
	},
	decrement:({//处理你要干什么，异步请求，判断，流程控制
		commit
	})=>{
		// console.log(commit);
		commit('decrement');
	},
	clickOdd:({//处理你要干什么，异步请求，判断，流程控制
		commit,
		state
	})=>{
		// console.log(commit);
		// commit('clickOdd');
		if(state.count%2==0){
			commit('increment');
		}
	},
	clickAsync:({commit})=>{
		new Promise((resolve)=>{
			setTimeout(function(){
				// alert(1)
				commit('increment');
				resolve();
			},1000);
		});
	}
};

const getters={
	count(state){
		return state.count;
	},
	getOdd(state){
		if(state.count>0){
			return state.count%2==0?'偶数':'奇数';
		}
		
	}
};

//需要导出store
export default new Vuex.Store({
	actions,
	state,
	mutations,
	getters
});