<template >
  <div  >
    <vUserLogin></vUserLogin>
    <vUserReg></vUserReg>
    <vReleaseS></vReleaseS>
    <div class="ziyuan">
      <p class="ziyuan_title">资源推荐</p>
      <!-- 主要内容区 -->
      <ul class="ziyuan_main list-group" >
        <li v-for="(displayZiyuan,index) in listSource" class="ziyuan_list list-group-item" >
          <div style="padding-left:6px;">
            <div class="title_ziyuan">
            <a :href="displayZiyuan.url" target="_blank">{{displayZiyuan.title}}</a>
          </div><br>
          <div class="ziyuan_content" v-html="displayZiyuan.content" ></div>
          <div class="ziyuan_user">
            <span class="label label-info" style="vertical-align: middle;margin-right: 4px" >
              <span class="glyphicon glyphicon-user">&nbsp;{{displayZiyuan.user.uName}}</span>
            </span>
          </div>
          <!-- 综合获赞、被访问次数、类型-->
          <div class="ziyuan_res">
          <div style="float:right;">
            <span class="label label-default" style="margin-right: 4px;">
            {{displayZiyuan.createTime | normalTime}}
          </span> 
          访问次数：
          <span style="color: rgb(248, 253, 248);
                        font-weight: 200;
                        background:rgb(119, 119, 119);
                        width: 26px;
                        display: inline-block;">
              {{displayZiyuan.visitNums}}
          </span>
          类型：<span class="label label-default">{{displayZiyuan.type}}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

      <!-- 分割线 -->
      <p class="fenge"></p>

    <!-- 分页开始 -->
    <div class="page">
      <pagination  :total="total" :current-page='current' @pagechange="pagechange"></pagination>
      
    </div>
    <!-- 分页结束 -->
   
    </div>
 
</template>
<script>
import pagination from '../Page/page.vue'
import UserLogin from '../User/User_login.vue'
import UserReg from '../User/UserReg.vue'
import ReleaseS from '../ziyuan/Ziyuan.vue'



  export default{
     provide(){
      return{
          fetchData:this.fetchData
      }
  },
    data(){
      return{
        
        // isRouterAlived:true,
        isShow:false,
        imgsrc:domain.testUrl,
        display:10,
        listSource:{},
        len:1,
        current:1
      }
    },
    components:{
        'pagination': pagination,
        'vUserLogin': UserLogin,
        'vUserReg': UserReg,
        'vReleaseS': ReleaseS

    },
    computed:{
      // total(){
      //  return 1

      // }
    },
    methods:{
    //    reloads(){
    //   this.isRouterAlived = false
    //   this.$nextTick(function(){
    //     this.isRouterAlived = true
    //   })
    // },
 
      fetchData(current){
        this.$ajax.post(this.imgsrc+'/resource/listResource',{
        "pageNum":current,
        "pageCount":this.display
        }).then(res => {
         if(res.data.code=='200'){
            this.listSource=res.data.contents[0].list;
            this.len=res.data.contents[0].size;
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
       
        this.fetchData(current);
        // alert(Math.ceil(this.len/this.display))
          
        }
    },
    computed:{
      total(){
        return this.len;
      }
    },
    mounted(){
      this.fetchData(1);
    },

  };
</script>
<style type="text/css" scoped>
.title_ziyuan{
         padding-top: 6px;
    clear: both;
    width: 100%;
    height: 38px;
    text-align: initial;
}
.title_ziyuan a{
    text-decoration: none;
    font-size: 23px;
  color: #040711;
}
  .fenge{
    border: 1px solid #ccc;
    width: 2px;height: 2px;
  }
  .ziyuan{
        /* background: rgba(110,1110,110,0.1); */
    font-size: 0;
    margin-top: 4px;
    padding-bottom: 10px;
    padding-top: 5px;
    /* margin: 0 auto; */
    width: 100%;
    height: auto;
    border: 1px dashed #ccc;
  }

  .ziyuan .ziyuan_title{
       background: rgba(226,228,214,0.3);
    font-size: 27px;
    font-weight: 300;
    color: #060000;
    padding: 2px 10px;
    font-family: "隶书";
  }
  .ziyuan .ziyuan_main{
     /* background: rgba(200, 211, 214, 0.2); */
    margin-left: 10px;
    margin-top: 4px;
    height: auto;
    font-size: 14px;
    padding-bottom: 5px;
    margin: 0 auto;
    text-align: center;
  }
  .ziyuan_main a{
   /* clear: both; */
   /*  padding: 1px;
    text-indent: 2em;
    text-align: left;
    float: left;
    margin-left: -28px;
    text-decoration: none; */
    /* font-size: 22px; */
    /* color: #000; */
  }
  .ziyuan_list{
    margin-top: 10px;
    padding: 3px;
    /* border: 1px dashed #ccc; */
        /* background: rgba(200, 211, 214, 0.2); */
  }
  .ziyuan_user{
    
   padding: 5px;
    float: right;
  }
  .ziyuan_user span:first-child{
    padding-right: 5px;
  }
  .ziyuan_user span:last-child{
    margin-left: 5px;
    vertical-align: text-top;
  }
  .ziyuan .ziyuan_main .ziyuan_content{
          /* padding: 5px; */
    /* padding-left: 24px; */
    font-weight: 400;
    font-size: 16px;
    /* white-space: normal; */
    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    width: 86%;
    height: auto;
    /* line-height: 30px; */
    /* border: 1px solid #ccc; */
    clear: both;
    text-align: left;
    text-indent: 2em;

  }
  .ziyuan_res{
        /* margin-left: 100px; */
    margin-top: 5px;
    padding-bottom: 28px;
  }
  .page{
    margin-top: 10px;
  }
  .page .pagination{}
</style>