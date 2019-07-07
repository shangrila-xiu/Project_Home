<template>
	<div v-cloak>
    <UserLogin></UserLogin>
    <UserReg></UserReg>
    <ReleaseS></ReleaseS>
		<!-- 内容开始 -->    
	<div class="content clear">
		<!-- <slot name="match"></slot> -->
		<ul class="list-group" >
			<li class="list-group-item" v-for="(newpager,index) in news">
				<router-link :to="'/article/'+newpager.id" style="color:#000">
					<div class="h4">
						{{index+1}} {{newpager.newsTitle}}
						<p class="fr" style="font-size:10px;margin-right: 10px;margin-top: 4px;">
							{{newpager.systemTimeStamp | normalTime}} &nbsp;&nbsp;来源：{{newpager.contentSource}}
						</p>
					</div>
				</router-link>
			</li>
		</ul>
		
		<!-- 分页开始 -->
		<pagination v-show="this.news.length!=0" :total="total" :current-page='current' @pagechange="pagechange"></pagination>
		<!-- 分页结束 -->
	</div>
	<!-- 内容结束 -->
    <!-- <cgetMore></cgetMore> -->
	
	<!-- 发布的资源展示开始 -->
	<!-- <div> -->
	<!-- <display-ziyuan></display-ziyuan> -->
	<!-- </div> -->
	<!-- 发布的资源展示结束 -->
	</div>	
</template>

<script type="text/javascript">
import UserLogin from './User/User_login.vue'
import UserReg from './User/UserReg.vue'
import pagination from './Page/page.vue'
import ReleaseS from './ziyuan/Ziyuan.vue'
// import GetMore from './GetMore.vue'
// import display_ziyuan from './ziyuan/display_ziyuan.vue'


export default{
	
		data(){
			return{
				news:[],
				imgsrc:domain.testUrl,
				// total: 150,     // 记录总条数
        		display: 10,   // 每页显示条数
        		current: 1,   // 当前的页数
        		len:11,
        		isLogin:false				
			}
		},
		components:{
    		'pagination': pagination,
    		// 'cNav':Nav,
    		// 'cgetMore':GetMore,
    		'UserLogin':UserLogin,
    		'UserReg':UserReg,
    		'ReleaseS':ReleaseS,
    		// 'display-ziyuan':display_ziyuan

		},
		watch:{
			$route(to){
				//console.log(to);
				var reg=/nav\/\d+/;
				if(reg.test(to.path)){
					// alert("yy"+this.$route.params.id)
					var newsId=this.$route.params.id || 0;
					this.fetchData(newsId);
				}
			}
		},
		
		 methods: {
		 	
		 	fetchData(newsId,current){
				// alert(current);
				if(typeof(newsId)=="undefined"){
		    		newsId=1;
		    	}
		    	if(typeof(current)=="undefined"){
		    		current=this.current;
		    	}
				// alert(current);
		    	
		    	// alert("xx"+id);
				// alert(id);
				this.$ajax.post(this.imgsrc+'/news/listNews',{
		    	"menuId":newsId,
				"pageNum":current,
				"pageCount":this.display
		    }).then(res => {

		      if(res.data.code=='200'){
		      	// console.log(res.data)
		      	this.news=res.data.contents.list;
		      	this.len=res.data.contents.size;
		      	// alert(this.artiCleData.id);
		      	 // console.log(this.news);
		      	// alert(res.data);
		      }
		      if(res.data.code=='500'){
		      	alert(res.data.message);
		      }
		  	})
			},
			// 分页方法
			pagechange:function(current){
        	
       			// console.log(current);
       // ajax请求, 向后台发送 currentPage, 来获取对应的数据
       
		    this.fetchData(this.$route.params.id,current);
				// alert(Math.ceil(this.len/this.display))
        	
		    }
		 	
	   },
	   computed:{
			total(){
				return this.len;
			},
		},
	   
	   mounted(){
    		
		    this.fetchData(this.$route.params.id,this.current,1);
		     //页码切换执行方法
              
		  
		},
	};
</script>

<style>
        
</style>
       