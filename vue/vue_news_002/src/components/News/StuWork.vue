<template>
	<!-- 内容开始 -->
	<div class="content clear" v-cloak>
		<ul class="list-group">
			<li class="list-group-item" v-for="(newpager,index) in news">
				<router-link :to="'/stuwork/'+newpager.id">
					<div class="h4">
						{{index+1}} {{newpager.newsTitle}}
						<p class="fr" style="font-size:10px;margin-right: 10px;margin-top: 4px;">
							{{newpager.systemTimeStamp | normalTime}} &nbsp;&nbsp;来源：{{newpager.contentSource}}
						</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
	
	<!-- 内容结束 -->

</template>
<script type="text/javascript">
	export default{
		data(){
			return{
				news:[],
				imgsrc:domain.testUrl
			}
		},
		mounted(){
    
		    this.$ajax.post(this.imgsrc+'/news/listNews',{
		    	"menuId":3,
				"pageNum":1,
				"pageCount":10
		    }).then(res => {
		      if(res.data.code=='201'){
		      	this.news=res.data.contents.list;
		      	// alert(res.data);
		      }
		  	})
		}
	}
</script>