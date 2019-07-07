<template>
	<div>
		<vUserLogin></vUserLogin>
    <vUserReg></vUserReg>
    <vReleaseS></vReleaseS>

		<div class="nav">
			<ul>
				<!-- 回退操作 -->
		    	<li class="l-btn" onclick="window.history.go(-1)"></li>
		    </ul>
		</div>
		<!-- 某篇文章的详细内容 -->
		<div class="contentss">
			<p class="headers" v-html="artiCleData.newsTitle"></p><!--标题-->
			<div class="viFrom">
				<div class="visit" v-cloak>
			        	<p>访问量：{{artiCleData.systemVisitNumber}} </p><!--浏览次数-->
			        </div>
			        <div class="comeFrom" v-cloak>
			        	<p>来源:{{artiCleData.contentSource}}</p><!--来源于什么地方-->
			        	 <p>{{artiCleData.systemTimeStamp | normalTime }}</p>
			        </div>
			</div>
			
			 <div id="text-box" >
			 	<p id="pcon" v-html="artiCleData.newsContent"></p><!--内容展示-->
				<div class="comm-submit">
					<button type="button" class="btn btn-primary " @click="comm">
  						评论
					</button>
				</div>
			 </div>
		</div>

		<!-- 留言展示开始 -->
		<div class="comm">
			<vComment v-if="isRouterAlive"></vComment>
		</div>
			
		<!-- 留言展示结束 -->

		<!-- 模态框 -->
		<div class="modal fade" id="comm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" 
			aria-hidden="true" data-backdrop="static" data-keyboard="false">
           <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        	<span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
           				<textarea class="conmmCON" maxlength="500"  name="" cols="80%" rows="10%" v-model="contents"></textarea>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                        <button type="submit" class="btn btn-primary" @click="add_comm">提交评论</button>
                    </div>
               </div>
            </div>
        </div>
		
	</div>
</template>
<script>
import Comment from '../Comments/Comment.vue'
import UserLogin from '../User/User_login.vue'
import UserReg from '../User/UserReg.vue'
import ReleaseS from '../ziyuan/Ziyuan.vue'


	export default{
		// inject: ['reload'],
		 provide(){
		    return{
		      reload: this.reload
		    }
		  },	
		data(){
			return {
				 isRouterAlive:true,
				imgsrc:domain.testUrl,//定义URL公共的地方
				artiCleData:{},//将数据保存在这个对象中
				contents:''
			}
		},
		components:{
			'vComment':Comment,
			'vUserLogin': UserLogin,
        'vUserReg': UserReg,
        'vReleaseS': ReleaseS
        
		},
		watch:{
			$route(to){
				//console.log(to);
				var reg=/article\/\d+/;//正则表达式确定点击的是哪个链接
				if(reg.test(to.path)){
					// alert(this.$route.params.id)
					var articleId=this.$route.params.id || 0;//获得点击的哪个咨讯的id，并保存到articleId
					this.fetchData(articleId);//fetchData方法
				}
			}
		},
		methods:{
			 reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
			fetchData(id){
				
				// alert("xx"+id)
				this.$ajax.post(this.imgsrc+'/news/getNewsByNewsId',{//ajax调接口
		    	'id':id
		    }).then(res => {
		    	if(res.data.code=='200'){//当访问正确
		      	this.artiCleData=res.data.contents;
		      	if(res.data.contents.systemVisitNumber == null || res.data.contents.systemVisitNumber == 0){
		      		res.data.contents.systemVisitNumber = "未知数";
		      	}
		      }
		      if(res.data.code=='500'){
		      	alert(res.data.message);
		      }
		  	})
			},
			// 添加留言、评论方法
			 comm(){
				if(localStorage.getItem('sessionId') == null || localStorage.getItem('sessionId') == '' || localStorage.getItem('sessionId')==='undefined'){
					alert("请登录");
					return false;
				}else{
					// alert("localStorage.getItem('sessionId')")
					 $("#comm").modal({backdrop: 'static', keyboard: false});  //手动开启
					
				}
			},
			add_comm(){
				if(this.contents == '' || this.contents == null){
					alert("您要评论的内容不能为空！");
					return false;
				}
				this.$ajax.post(this.imgsrc+'/comment/insertComment',{//ajax调接口
		    		"sessionId":localStorage.getItem('sessionId'),
					"newsId":this.$route.params.id,
					"content":this.contents,
					"uEmail":localStorage.getItem('uEmail')
		    }).then(res => {
		      if(res.data.code=='200'){//当访问正确
		      	this.contents='';
		      	// 当提交评论成功后关闭框
		     

		      // 与用户交互提示
			// alert(res.data.message);
			 setTimeout(function(){
                $('#comm').modal('hide');
                $(".modal.fade").hide();
				$('.modal-backdrop').remove();//关闭阴影遮罩层
               
                // $("#myModal").trigger("click");
              },1000);
			 this.reload();
			 // this.$router.go(0);
			  // this.fetchData(this.$route.params.id);

		      }
		      if(res.data.code=='500'){
		      	alert(res.data.message);
		      }
		  	})
			}
		},
		mounted(){//DOM准备好之后执行
		
			this.fetchData(this.$route.params.id);//
			// alert(this.$route.params.id);
			//发送 隐藏footer的 action
			// if(this.$route.path.indexOf('article')>0){
			// 	this.$store.dispatch('hideFooter');
			// }
		}
	};
</script>
<style scoped>
@media screen and (max-width:900px){
.contentss .cont{ 
		padding: 0 0 0 85px;
    color: #494d4d;
    width: 100%;
    height: auto;
	}
}
	html,body{ overflow-x: hidden; }
	[v-cloak]{
		display: none;
	}
	/* .nav{width:100%; position:fixed;top:0;left:0; background:#fff; border-bottom:1px solid #e8eaec; z-index:99;} */
	.nav ul{width:6.4rem;height:0.45rem; padding-top:0.15rem; margin:0 auto;}
	.nav ul li{width:0.29rem;height:0.31rem; 
		/* background:url(../assets/img/history.png) no-repeat 0 0;  */
		background-size:100%; margin:0 0 0 0.38rem;}
	.viFrom{
		width: 100%;
		    margin-bottom: 10px;
    height: 20px;
    text-align: center;
    background: #f8f8f8;
    vertical-align: middle;
    line-height: 20px;
	}
	.viFrom .visit p,.viFrom .comeFrom p{
		color: #9c9898;
		/* left: 39%; */
    font-size: 16px;
    text-align: center;
    padding-left: 10px;

	}
	.contentss{
		    /* position: absolute; */
       border: 1px dashed #c6c1c6;
    /* width: 50%; */
    /* max-width: 6.4rem; */
    margin: 0 auto;
    margin-top: 5px;
    background: #f2f4f5;
    padding:8px ;
    height: auto;
    /* padding-bottom: 3.85rem; */
		}
	.contentss .headers{
		font-size: 22px;
		text-align: center;
		/* text-shadow: 2px 1px 1px gray; */
		 padding:0.39rem 0.28rem 0.15rem 0.28rem; 
		 height:auto;
		 background: none
	}
	.headers h2{ float:left; margin-right:0.18rem;}
	.headers p{ float:left; margin-top:0.18rem; font-size:0.3rem;}
	#text-box{
		margin-top: 18px;
		padding-bottom: 1px;

	}
	#text-box p{ 
		/* line-height:0.45rem;  */
		
		text-indent: 2em;
		font-size: 18px;
		font-family: "微软雅黑";

	}
	
	.cont h3{ 
		/* font-size:18px; */
		text-align: center;
		line-height:0.6rem; 
		padding-bottom:0.25rem;
		 border-bottom:1px solid #494d4d;
	}
	.cont .time{
		margin: -60px 0 auto 0 auto;
		/* position: relative; */
		width: 100%;
		height: 20px;
		
	}
	.time p,.viFrom .visit p,.viFrom .comeFrom p{ 
		    float: left;
    position: relative;
  }
.time p{
	margin-left: 7px;
    /* left: 171px; */
    /* top: 11px;
    margin-left: 22px; */
    font-size: 8px;
}
	.time span{width:0.33rem;height:0.32rem; position:absolute; top:-0.02rem;right:-0.35rem;}
	.time span img{width:100%;height:100%;}
	/* .visit p{float: left;} */
	/* .cont .text-box{ font-size:0.25rem;} */
	.comm-submit{
		    position: relative;
    top: 2px;
    /* margin-right: 36px; */
    bottom: 10px;
    left: 90%;
		
	}
	.comm{
		margin: 0 auto;
	}
	
	#pcon p img{
		width: 100%;
	}
	
	
@media screen and (max-width:375px){
	.viFrom .visit p,.viFrom .comeFrom p{
        color: #c0b6b6;
       float: left;
    font-size: 12px;
    text-align: center;
    padding-left: 10px;

    }

	.contentss .cont{ 
		padding: 0 ;
    color: #494d4d;
    width: 100%;
    height: auto;
	}
	.comm-submit{
        float:right;
        margin-top: -36px;
        margin-right: 5px;
        padding-bottom: 10px;

    }
    .conmmCON{

    	width: 100%;
    }
}
	
</style>