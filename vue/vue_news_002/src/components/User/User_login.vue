<template>
	<!-- 登录模态框开始 -->
	<!-- 登录窗口 -->
    <div id="login" class="modal fade" :visible.sync="isLogin" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-title">
                    <h1 class="text-center">登录</h1>
                </div>
                <div class="modal-body">
                    <form class="form-group" :model="loginForm">
                        <div class="form-group">
                                <label for="">邮箱</label>
                                <!-- v-validate="'required'" type="email" name="email" -->
                                <input class="form-control"  placeholder="请输入邮箱" v-model="loginForm.uEmail" autocomplete >
                                <span>{{ errors.first('email') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="">密码</label>
                                <input class="form-control"  type="password" placeholder="请输入密码" v-model="loginForm.uPassword">
                            </div>
                            <div class="text-center">
                                <button class="btn btn-primary" type="button" @click="login('loginForm')">登录</button>
                                <button type="reset" class="btn btn-danger" data-dismiss="modal">重置</button>
                            </div>
                            <a href="" data-toggle="modal" data-dismiss="modal" data-target="#register">还没有账号？点我注册</a>
                            <input type="checkbox" name="" value="checked" v-model="loginForm.checked">七天免登录
                            <!-- <span  style="cursor: pointer;color: #f19149;font-size: 0.75rem;margin-left: 5px;">忘记密码？</span> -->

                    </form>
                </div>
            </div>
        </div>
    </div>
<!-- 登录模态框结束 -->
</template>

<script type="text/javascript">


    export default{ 
        inject: ['reload'],
        data(){
            return{ 
                imgsrc:domain.testUrl,
                loginForm:{
                    uEmail:'',
                    uPassword:'',
                    checked:true
                },
                uName:'',
               isLogin:false,
                sessionId:'',
                test:''

                
            }
        },
        
        methods:{
            login(formValue){
            var Email = this.loginForm.uEmail;
            var Pass = this.loginForm.uPassword;
            
            if(Email == ''|| Email==null){
                alert("请输入邮箱！");
                return false;
            }
            if(Pass == '' || Pass == null){
                alert("请输入密码！")
                return false;
            }

            this.$ajax.post(this.imgsrc+'/user/login',{
                "uEmail":Email,
                "uPassword":Pass
            }).then(res => {
              if(res.data.code=='200'){
                // console.log(res.data)
                this.uName = res.data.contents[0].uName;
                this.sessionId = res.data.contents[0].sessionId;
                // alert(this.sessionId)
                localStorage.setItem('sessionId',this.sessionId );//将sessionId保存到localStorage
                localStorage.setItem('uEmail',Email);
               localStorage.setItem('userName',this.uName);//将用户名保存到localStorage
               this.isLogin=true;
               // alert(this.isLogin);
               localStorage.setItem('isLogin',this.isLogin);//
         setTimeout(function(){
                        $('#login').remove();
  $('.modal-backdrop').remove();//关闭阴影遮罩层
document.body.style.overflow = 'auto';//关闭弹出框之后，恢复滚动
//                 $('#login').modal('hide');
//                 $(".modal.fade").hide();
                // $("#myModal").trigger("click");
              },0.01);
                 this.reload();
//                 弹出框出现之后，浏览器会给body增加内联样式：style=“overflow:hidden”，弹出框关闭后，样式依然在，所以需要手工修改样式
// DOM操作：document.body.style.overflow = ‘auto’
// JQuery操作: $(‘body’).css(‘overflow’,‘auto’)

                // this.$router.go(0);
                
                if(this.loginForm.checked == true){
                    this.setCookie(Email,Pass,7);
                }else{
                    this.clearCookie();
                }

                // alert(res.data);
              }
              if(res.data.code=='500'){
                alert(res.data.message)
              }
            })
        },
        //设置cookie
        setCookie(c_name,c_pwd,exdays) {

            // alert("setCookie开始执行")
            var exdate=new Date();//获取时间
            //  if(exdays <=1){
            //      exdate.setTime(exdate.getTime() + 1*60*60*1000*exdays);
            //      localStorage.clear();
            // }
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            //字符串拼接cookie
            window.document.cookie="uEmail"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="uPassword"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
        },
        getCookie() {
            // alert("getCookie开始调用");
            if (document.cookie.length>0) {
                // alert(document.cookie);
                var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
                for(var i=0;i<arr.length;i++){
                    var arr2=arr[i].split('=');//再次切割
                    //判断查找相对应的值
                    if(arr2[0]=='uEmail'){
                      this.loginForm.uEmail=arr2[1];//保存到保存数据的地方
                    }else if(arr2[0]=='uPassword'){
                      this.loginForm.uPassword=arr2[1];
                    }
                }
            }
        },
        clearCookie(){//清除
            // alert("clearCookie开始执行");
            this.setCookie('','',-1);
            
            // this.setCookie( 'name' , this.loginForm.uEmail)
        },


},
 //页面加载调用获取cookie值
    mounted(){
            // console.log("DOM准备好之后执行")
        // alert("页面加载调用获取cookie值");
       this.$nextTick(() => {
          this.getCookie();
        })
      
    }
};

//‘name’是你自己取得名字，后面的this.ruleForm2.name是我写的一个input内v-model的值
  
</script>