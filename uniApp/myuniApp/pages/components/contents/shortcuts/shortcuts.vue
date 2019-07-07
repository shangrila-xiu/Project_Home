<template>
	<view>
		<view class="shortcut">
			<text class="leftLine"></text>
			<text class="shortcuts">快捷功能</text>
			<text class="rightLine"></text>
		</view>
		<uni-grid show-border="false" :options="[
			{image:'../../../../../static/shop.png',text:'我的商品'},
			{image:'../../../../../static/replenishment.png',text:'等待补货'},
			{image:'../../../../../static/purchase.png ',text:'立即采购'},
			{image:'../../../../../static/hotel.png',text:'酒店设置'},
			{image:'../../../../../static/purchaseOrder.png',text:'采购记录'},
			{image:'../../../../../static/equipment.png',text:'设备列表'},
			{image:'../../../../../static/template.png',text:'商品模板'}]" 
			>
		</uni-grid>
	</view>
</template>

<script>
	import {uniGrid} from '@dcloudio/uni-ui/lib/uni-grid/uni-grid'
export default {
    components: {uniGrid}
}
</script>

<style>
	.shortcut{
		height: 40px;
   line-height: 60px;
   text-align: center;
	}
	.leftLine,.rightLine{
		display: inline-block;
   width: 120px;
		border: 1px solid #ccc;
	}
	
.shortcuts{
	margin: 20upx;
	vertical-align: middle;
	font-size: 24upx;
	font-weight: 900;
	font-family: 'song';
	letter-spacing: 5upx;
}

</style>
