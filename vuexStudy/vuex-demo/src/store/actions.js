import * as types from './types.js'
// import {INCREMENT} from './types.js'
export default{
	increment: ({
		commit
	}) => {
		commit(types.INCREMENT);
	},
	decrement:({commit})=>{
		commit(types.DECREMENT)
	},
	clickOdd:({commit,state})=>{
		if(state.mutations.count % 2 == 0){
			commit(types.INCREMENT);
		}
	},
	clickAsync:({commit,state}) =>{
		new Promise((resolve)=>{
			setTimeout(function(){
				commit(types.INCREMENT);
			},2000);
		})
	}

}