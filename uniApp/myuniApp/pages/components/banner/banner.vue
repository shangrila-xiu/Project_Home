<template>
	<view>
		<!-- 顶部展示区 -->
		<uni-card title="首页" thumbnail="" extra="额外信息" note="Tips">
			<text class="title">设备总数： 89台</text>
			<text class="describe">在线率：16.85% | 在线设备：15</text>
			<image src="../../../static/machine.png" mode="widthFix"></image>
		</uni-card>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
uni-card{
		margin: 10upx;
		display: block;
		height: 280upx;
		width: widthFix;
		background: linear-gradient(to right, #F5F5F5 , #fcfcfc,#F5F5F5 ); /* 标准的语法 */
	}
	uni-card .title{
		position: absolute;
		top: 10%;
		left: 20%;
		/* letter-spacing: 10upx; */
		font-size: 28upx;
		font-weight: 900;
		
	}
	uni-card .describe{
		position: absolute;
		top: 15%;
		left: 5%;
	}
	uni-card image{
		float: right;
		margin-top: 30upx;
		margin-right: 30upx;
		width: 200upx;
		height: 200upx;
	}
</style>
