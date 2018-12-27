<template>
	<div>
		<h2>这是新闻</h2>
		<ul>
			<li v-for="val in news">{{val}}</li>
		</ul>
	</div>
</template>
<style scope>
	li:nth-child(even){
		border-bottom:1px dashed #ccc;
	}
</style>
<script type="text/javascript">
	export default{
		name:'news',
		data(){
			return{
				news:['111','222','333','444']
			}
		},
	}

</script>
