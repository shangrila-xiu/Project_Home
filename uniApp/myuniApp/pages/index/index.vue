<template>
	<view>
		<!-- banner -->
		<vBanner></vBanner>
		<!-- 经营概况展示区 -->
		<vManage></vManage>
		<!-- 快捷功能展示区 -->
		<vShortCuts></vShortCuts>
	</view>
</template>

<script>
	import Banner from '../components/banner/banner'
	import Manage from '../components/contents/manage/manage'
	import ShortCuts from '../components/contents/shortcuts/shortcuts'
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		},
		components:{
			'vBanner':Banner,
			'vManage':Manage,
			'vShortCuts': ShortCuts
		}
	}
</script>

<style>
	
</style>
