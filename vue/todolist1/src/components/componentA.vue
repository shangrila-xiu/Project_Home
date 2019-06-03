<template>
	<div id="childComponent">
		<!--<h2>{{msg}}</h2>-->
		<h5>{{this.msgFromFather}}</h5>
		<button v-on:click="onClickMe">ClickMe</button>
	</div>
</template>

<script>
	export default{
		data(){
			return {
				msg:'from component A,i am your child',
			}
		},
		props:['msgFromFather'],//字符串数组的形式展示；如果要知道类型，可以写成对象的形式{msgToChild:string}
		methods:{
			onClickMe:function(){
//				console.log(this.msgFromFather);
				this.$emit('child-tell-me-thing',this.msg);//将数据发送出去
			}
		}
	}
</script>

<style>
</style>