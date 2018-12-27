// import mutations from './mutations.js'
export default {
	count:(state)=>{
		// alert(state);
		// alert(state.count);
		return state.count;
	},
	getOdd:(state)=>{
		return state.count%2==0?'偶数':'奇数';
	}
};
