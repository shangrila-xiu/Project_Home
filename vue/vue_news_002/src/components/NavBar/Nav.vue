<template>

  <div>
    <nav class="navbar navbar-default " id="navv">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#" onclick="window.history.go(-1)"></a> 
    </div>
    
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <!-- 导航链接开始 -->
      <ul class="nav navbar-nav nav-define">
        
        <li v-for="menuBar in menus" >
          <router-link :to="'/nav/'+menuBar.id" tag="li" active-class="active">
          <a href="javascript:;" style="color:#000">   {{menuBar.menuName}}</a>
        </router-link>
        </li>
        
      </ul>
      <!-- 导航链接结束 -->
      <ul class="nav navbar-nav nav-define">
      <li class="zixun">
        <router-link :to="{name:'displayzixun'}" tag="li" active-class="active">
          <a href="javascript:;" style="color:#000"> 资源推荐</a>
        </router-link>
          
      </li>
    </ul>
    <!-- 搜索框开始 -->
    <ul>
      <li>
        <form class="navbar-form navbar-left"  >
        <div class="form-group  exploreS">
          <input type="text" class="form-control search-from" v-model="INFOEx" placeholder="Search">

        </div>
        <button type="button" class="btn btn-default btnExplore"  @click="explore" @keyup.enter="explore()">查询</button>
        
    </form>
      </li>
    </ul>
<!-- 搜索框结束 -->
    

<!-- 登录、注册、注销开始 -->
      <!-- 登录、注册、注销开始、发布咨讯 -->
      <ul class="nav navbar-nav navbar-right" style="font-size:10px;">
        <!-- 登录。注册 -->
       <li class="reg_login" v-if="!isLogin" >
         <ul>
           <li >
            <a  href="javascript:void(0)" @click="openReg()" style="color:#000"><span class="glyphicon glyphicon-user" style="text-shadow: black 5px 3px 3px;width:20px;height:20px;"></span> 注册</a>
            </li>
            <li>
                <a href="javascript:void(0)" @click="openLogin()" style="color:#000"><span class="glyphicon glyphicon-log-in" style="font-size:16px;text-shadow: black 5px 3px 3px; margin-right: 3px;" ></span> 登录</a>
            </li>
         </ul>
       </li>
        
          <!-- 登录成功后，下面的内容就会显示 -->
          <!-- 发布资源开始 -->
          <li class="release_out" v-else>
            <ul>
              <li class="releaseS" >
                <a href="javascript:void(0)" @click="releaseS" style="">发布咨讯</a> 
              </li>
        <!-- 发布资源结束 -->
              <li>
                <div class="User-info dropdown " >
                <div class="btn btn-default dropdown-toggle" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span v-text="uName"></span>
                  <span class="caret"></span>  
                  
                </div>
              <!-- 下拉设置数据项 -->
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <!-- <router-link :to="{name:'userDetail'}">个人中心</router-link> -->
                  </li>

                  <li role="separator" class="divider"></li>
                  <li><a href="javascript:void(0)" @click="loginOut()">
                    <span class="glyphicon glyphicon-off" style="text-shadow: black 5px 3px 3px; margin-right: 3px;"></span>
                    注销</a>
                  </li>
                </ul>
              </div>
              </li>
            </ul>
          </li>
         
      </ul>
       <!-- 登录、注册、注销结束 -->


    </div><!-- /.navbar-collapse -->
    
  </div><!-- /.container-fluid -->
</nav>

    <!-- 搜索模态框开始 -->
<div class="modal fade" id="Explore" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" 
      data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">您的搜索结果为</h4>
      </div>
      <div class="modal-body">
        <ul>
          <li v-for="(INfo,index) in INFOExs" v-show="INfoLen" @click="closeEx" >
            <router-link :to="'/article/'+INfo.id"  >
              <div class="InfoEx">
                <p style="color: #000;">{{index+1}} {{INfo.newsTitle}}</p>
              </div>
            </router-link>
<hr>
          </li>
        <li v-show="!INfoLen">
            <p style="color:rgb(178, 199, 178);font-size:20px;font-weight:bold;">
              主人，系统君已经尽力了，并没有找到更多您想要的内容
            </p>
          </li>
        </ul>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

    <!-- 搜索模态框结束 -->
    
  </div>
  
  <!-- 导航结束 -->
  

</template>

<script type="text/javascript">
import User from '../User/User_login.vue'
// import Ziyuan from '../ziyuan/Ziyuan.vue'
  export default{
    data(){
      return{
        keyWords:false,
        menus:[],
        news:[],
        uName:localStorage.getItem('userName'),
        imgsrc:domain.testUrl,
        isLogin:localStorage.getItem('isLogin'),
        INFOExs:[],
        INFOEx:'',
        INfoLen:false
       
      }
    },
    components:{
        // 'v-pagination': pagination,
        

    },
    mounted(){
        // console.log(localStorage);
        this.$ajax.post(this.imgsrc+'/menu/listView').then(res => {
          if(res.data.code=='200'){
            this.menus=res.data.contents[0];
            // console.log(res.data.contents[0][0].id)
          }
        })
    },
    methods:{
     
      openReg(){
        // alert(1)
          $("#register").modal({backdrop: 'static', keyboard: false});  //手动开启
      },
      // 打开登录界面模态框
      openLogin(){
        $("#login").modal({backdrop: 'static', keyboard: false});  //手动开启
        
      },
       // 发布咨讯模态框打开方法
      releaseS(){
        // alert(1)
        $("#releaseS").modal({backdrop: 'static', keyboard: false});  //手动开启
        }, 
        // 关闭搜索框
        closeEx(){
          // alert(1)
          setTimeout(function(){
                $('#Explore').modal('hide');
//                 $(".modal.fade").hide();
                // $("#myModal").trigger("click");
              },0.01);
        }, 
      // 搜索内容
      explore(){
        // alert(1)
        if(this.INFOEx == '' || this.INFOEx == null){
          alert("您要输入的的内容不能为空！");
          return false;
        }else{
            $("#Explore").modal({backdrop: 'static', keyboard: false});  //手动开启
        
          this.$ajax.post(this.imgsrc+'/news/getNewsByTitleFuzzyMatch',{
          "newsTitle":this.INFOEx
        }).then(res => {
          
          if(res.data.code=='200'){
           
           this.INFOExs=res.data.contents;
           // console.log(this.INFOExs);
           if(this.INFOExs.length != 0 || this.INFOExs != undefined){
            this.INfoLen=!this.INfoLen;}
           
           this.INFOEx='';
            
           // console.log(res.data.contents[0].newsTitle);
            // console.log(this.INFOEx)
          }
          if(res.data.code==500){
            alert(res.data.message);
          }
        })
        }
        
      },
      // 搜索之后的结果
     
      // 用户注销
      loginOut(){
         this.$ajax.post(this.imgsrc+'/user/loginout',{
          "sessionId":localStorage.getItem('sessionId')
          }).then(res => {
          if(res.data.code=='200'){
            
            //删除某个
            localStorage.removeItem('sessionId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userName');
            localStorage.removeItem('isLogin');
            // this.clearCookie();
            // 将isLogin的值变为false
            // localStorage.setItem('isLogin',false);
            this.isLogin = false;
            alert(res.data.message);

          }
          if(res.data.code=='500'){
            alert(res.data.contents);
          }
        })
      }
    },
    

  }; 
</script>
<style type="text/css" media="screen" scoped>
.navbar{
  font-size: 25px;
  color: blue;
  font-family: "隶书";
}
.InfoEx p{
  float: left;
  margin-left: 5px;
}
.exploreS,.btnExplore{
  position: relative;
  top: -7px;
  left: 5px;
}
.modal-body{
  height: auto;
  padding-bottom: 70px;
}
.modal-body p{
  margin-top: 4px;
}
.modal-footer{
  padding-bottom:  10px;
      margin-top: 5%;
}
.zixun{
   /*     position: relative;
    left: -14px;
    top: -6px; */
   

}
/* .zixun a{
   color: #524848;
  text-decoration: none;
  font-size: 10px;
} */
/* ..zixun .router-link-exact-active{
  text-decoration: none;
  color: #fff;
  font-size: 10px;
} */
.router-link-exact-active,.active{
  color: #ccc;
    /* font-size: 21px; */
    text-decoration: none;
  background: rgba(202, 190, 190, 0.3);
    font-weight: 300;
    font-family: "隶书";
}
.reg_login{
      position: relative;
    top: -10px;
}
.reg_login ul li,.release_out ul li{
      float: left;
    margin-right: 16px;
    margin-top: 11px;
    font-size: 15px;
}
.reg_login ul li a,.release_out ul li a{
  /* color: #777171; */
  font-size: 20px;
}
.reg_login ul li a:hover,.release_out ul li a:hover{
  text-decoration: none;
}
.release_out ul li{
  
}
.releaseS{
      border: 1px solid rgb(236, 245, 245);
    border-radius: 15px;
    width: 91px;
    height: 27px;
  
    text-align: center;
    line-height: 27px;
  
    font-size: 15px;
    font-weight: 600;
    background: #F0F8FF;
}
.releaseS a{
   color: #1f2021;
}
.User-info{
  margin-top: -5px;
  /* border: 0; */
}
.User-info img{
  width: 30px;
  height: 30px;

}
  .nav-define li{
    margin-left: 4px;
    margin-top: 4px;

  }
/*   .zixun a:link,.nav-define li a:link{
    color:#7fe07f;
    font-weight: 100;
    text-decoration: none;
        font-size: 16px;
  }
  .zixun a:visited,.nav-define li a:visited{
    background: #7fe07f;
    text-decoration: none;
    color: #777;
  }
  .zixun a:hover,.nav-define li a:hover{
    text-decoration: none;
    color: #f0f;

  }
  .zixun a:active,.nav-define li a:active{
    text-decoration: none;
  }
 */
  .search-from{
    width: 200px;
    height: 36px;
  }

</style>