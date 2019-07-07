<template>
	<div v-cloak>
		<div class="wrap">
			<div class="container">
				<p class="h4" style="border-bottom: 3px solid rgb(22, 23, 23);
    width: 105px;">
					<span class="glyphicon glyphicon-triangle-right"></span>最新留言
				</p>
				<ul class="list-group commcon" id="commcom">
					<li class="list-group-item text-default" v-for="(comm,index) in comments" id="commli">
						<p class="fl">{{index+1}}</p>
				    	<div class="commcontent" >{{comm.content}}</div>
				    	<div class="commTitle ">
							<span style="color: rgb(24, 13, 68);font-size: 13px;">
								来自--->{{comm.uEmail}}
							</span>
				    	</div>
				    	<div class="suggest fr" id="suggest">
							<span>{{comm.createTimeStamp | normalTime}}</span>
							<button  type="button" class="btn btn-default btn-sm" @click="suport(comm.id,current)">
								<span class="glyphicon glyphicon-thumbs-up" id="suport"></span>
							</button> 
							<span style="font-size: 17px; color: rgb(27, 28, 29);;font-weight: bold;">
								{{comm.goodNums}}
							</span>
							<span style="font-size: 17px;color: green;font-weight: bold;visibility:hidden;" id="IDComm">
								{{comm.id}}
							</span>
					    </div>
					</li>
				</ul>
				

				</div>
				<!-- 分页展示 -->
				<div class="page-play">
					<pagination v-show="this.comments.length!=0" :total="total" :current-page='current' @pagechange="pagechange"></pagination>
				</div>
			</div>
		</div>

</template>
<script>
import pagination from '../Page/page.vue'

	export default{

		data(){
			return{
				// uEmail:'',
				comments:[],
				imgsrc:domain.testUrl,
				len:11,     // 记录总条数
	        	display: 10,   // 每页显示条数
	        	current: 1,   // 当前的页数
	        	goodNums:localStorage.getItem('goodNums'),

			}
		},
		components:{
    		'pagination': pagination,

		},
		watch:{
			$route(){
				var newsId=this.$route.params.id || 0;
					this.fetchData(newsId);
					
			}
		},
		methods:{
			fetchData(id,current){
				// alert(id)
				//获取评论列
				this.$ajax.post(this.imgsrc+'/comment/getComments',{
				"newsId":id,
				"pageNum":current,
				"pageCount":this.display
		    }).then(res => {

		      if(res.data.code=='200'){
		      	// alert(res.data.message)
		      	// console.log(res.data.contents[0])
		      	// this.uEmail=res.data.contents[0].list[0].uEmail;
		      this.comments=res.data.contents[0].list;
		      this.len = res.data.contents[0].size;
		      	// console.log(this.uEmail);
			}
		      if(res.data.code=='500'){
		      	alert(res.data.message);
		      }
		  	})
			},
			// 点赞执行的方法
			suport(ID,current){
				// console.log(ID);
			 this.$ajax.post(this.imgsrc+'/comment/increaseGood',{
				"sessionId":localStorage.getItem('sessionId'),
				"id":ID,
				"uEmail":localStorage.getItem('uEmail')
		    }).then(res => {

		      if(res.data.code=='200'){
		      	// alert(res.data.message);

		      	// console.log(res.data.id);
		      	// alert(this.goodNums)
		      	var goods = localStorage.setItem('goodNums',this.goodNums);
				this.goodNums= goods+1;
				// console.log(this.goodNums)
		    this.fetchData(this.$route.params.id,current);
			      }
			      if(res.data.code == '201'){
			      	alert(res.data.message);
			      }
			      if(res.data.code=='500'){
			      	alert(res.data.message);
			      }
			  	})
			},
			// 
			// Delete: function(index){
    //             this.people.splice(index, 1);
    //         }
		pagechange:function(current){
       			// console.log(current);
       // ajax请求, 向后台发送 currentPage, 来获取对应的数据
		    this.fetchData(this.$route.params.id,current);
        		
		    }
		},
		computed:{
			total(){
				//alert(this.len);
				return this.len;
				// alert(Math.ceil(this.len/this.display))
				// return Math.ceil(this.len/this.display)
			},
		},
		mounted(){
		    this.fetchData(this.$route.params.id,1);
		}
	};
</script>

<style type="text/css" media="screen" scoped>
.page-play{
	position: relative;
}
.pagination{
	margin: 0 auto;
}
[v-cloak]{
	display: none
}
	.wrap{
		margin: 0 auto;
		width: 1000px;
		margin-top: 14px;
	}
	.container{
		margin: 0 auto;
		margin-bottom: 5px;
	}
	.container .commcon{
		height: auto;
		    position: relative;
    left: -82px;
		margin-bottom: 10px ;
		width: 100%;
		/* border-bottom: 1px solid #ccc; */

		/* border: 1px solid #ccc; */
	}
	.container .commcon .h2{
		text-align: left;
	}
	.container .commcon .commTitle{
		    margin-left: 120px;
    height: auto;
    margin-bottom: 22px;
	}
	.container .commcon .commcontent{
		width: 100%;
		font-size:18px;
		font-weight: 200;
		margin-right: 122px;
		text-indent: 2em;
		word-wrap: break-word;
		word-break: break-all;
		overflow: hidden;
	}
	.container .commcon .suggest{
		margin-top:-32px;
		/* margin-right: 166px; */

	}
		.container .commcon .suggest span{
			display: inline-block;
		padding:0 8px;

		}
	.container .commcon .suggest button{

	}
.page-play {
	    width: 100%;
    margin: 0 auto 0 -308px;
}
@media screen and (max-width:375px){
	.container .commcon[data-v-10344354] {
    height: auto;
    position: relative;
    left: -14px;
    margin-bottom: 17px;
    width: 35.6%;
    /* border-bottom: 1px solid #ccc; */
    /* border: 1px solid #ccc; */
}
#commli{
	height: auto;
	padding-bottom: 24px;
}
.container .commcon .commcontent {
    width: 100%;
    margin-right: 122px;
    text-indent: 2em;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
.container .commcon .suggest {
       padding-top: 14px;
    /* margin-right: 141px; */
    width: 100%;
    float: left;
    /* padding-bottom: 20px; */
    height: 48px;
    /* margin-top: -12px; */
    line-height: 30px;
}
}
</style>
