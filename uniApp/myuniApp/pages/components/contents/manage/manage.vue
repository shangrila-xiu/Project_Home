<template>
	<view>
		<text class="manage">经营概况</text>
		 <view class="uni-padding-wrap uni-common-mt">
            <view class="uni-title uni-common-mt">
				<view class="uni-flex uni-row">
					<view class="flex-item ">
						<text class="DailyVNum DailyVNumColor">0</text>
						<text class="DailyV">日成交额</text>
					</view>
					<view class="flex-item uni-bg-gray">
						<text class="DailyVNum">0</text>
						<text class="DailyV">日成交数</text>
					</view>
					<view class="flex-item uni-bg-gray">
						<text class="DailyVNum">287</text>
						<text class="DailyV">月成交额</text>
					</view>
				</view>
			</view>
    </view>

	</view>
</template>

<script>
export default {
}
</script>

<style>
	.uni-title text{
		color: #000000;
	}
	.uni-title .DailyVNumColor{
		color:orange;
	}
.manage{
	font-size: 24upx;
	font-weight: 900;
	font-family: 'song';
	position: absolute;
	left: 2%;
	top: 32%;
	letter-spacing: 5upx;
}
.uni-common-mt{
	/* margin-top: 101upx; */
}
.flex-item{
	margin-top: 100upx;
	height: 120upx;
	text-align: center;
	width: 50%;
}
.DailyVNum{
	height: 40upx;
	padding-bottom: 10upx;
	/* border: 1px solid #000000; */
	display: block;
}

.DailyV{
	
}
</style>
