<template>
	<!-- 注册模态框开始 -->
 <!-- 注册窗口 -->
    <div id="register" class="modal fade" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body">
                    <button class="close" data-dismiss="modal">
                        <span>&times;</span>
                    </button>
                </div>
                <div class="modal-title">
                    <h1 class="text-center">注册</h1>
                </div>
                <div class="modal-body">
                    <form class="form-group" action="" :model="RegForm">
                        <div class="form-group">
                            <label for="uNamea">*用户名</label>
                            <input class="form-control Form_width" id="uNamea" type="text" placeholder="用户名建议输入中文！" v-model="RegForm.uName" @keyup="checkuName(RegForm.uName)" maxlength="10" @focus="ShowNameAlert" @blur="checkAll">
                            <div v-show="isNoZhuce" style="    color: orange;
                                                                border: 1px solid orange;
                                                                position: absolute;
                                                                width: 35%;
                                                                left: 63%;
                                                                top:45px;padding: 3px;border-radius: 10%;">
                                <ul>
                                	<li v-html="msgName"></li>
                                </ul>

                            </div>
                        </div>
                        <div class="form-group">
                            <label for="emaill">*邮箱</label>
                            <input class="form-control Form_width" id="emaill" v-validate="'required'" type="email" name="email"  placeholder="例如:123@123.com" v-model="RegForm.uEmail" @keyup="checkuEmail(RegForm.uEmail)" @focus="ShowEmailAlert" @blur="checkAll">
                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                             <p v-show="isEmailZhuce" style="    color: orange;
                                                                border: 1px solid orange;
                                                                position: absolute;
                                                                width: 35%;
                                                                left: 63%;
                                                                top: 124px;
                                                                margin-top: 0px;padding: 3px;border-radius: 10%;">
                                <ul>
                                    <li v-html="msgEmail"></li>
                                </ul>
                            </p>
                        </div>
                        <div class="form-group">
                            <label for="">*密码</label>
                            <input class="form-control Form_width" id="pass" minlength="6" maxlength="11" name="password" type="password"  placeholder="Password" ref="password"v-model="RegForm.uPassword" @focus="ShowPassAlert" @keyup="checkAll" @blur="LeavePassAlert">
                            <!-- <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span> -->
                             <div v-show="isPassZhuce" style="    color: orange;
                                                                border: 1px solid orange;
                                                                position: absolute;
                                                                width: 35%;
                                                                left: 63%;
                                                                top: 186px;padding: 3px;border-radius: 10%;">
                                <ul>
                                    <li>请输入密码！建议6~11个字符</li>
                                    
                                </ul>
                            </div>

                        </div>

                            <div class="form-group" style="clear: both;">
                                <label for="MOTTO">座右铭:</label><br>
                               <input class="form-control Form_width" id="MOTTO" v-validate="'required'" type="text" name="MOTTO"  placeholder="请输入50字以内的座右铭或自我介绍" maxlength="50"  v-model="RegForm.uMotto" @blur="checkAll()">
                                <!-- <textarea id="MOTTO"  name=""  maxlength="100" placeholder="请输入一百以内的座右铭或自我介绍"  rows="5%" cols="79%" v-model="RegForm.uMotto"></textarea> -->
                            </div>
                           
                            <div class="text-left">
                                <button class="btn btn-primary" type="button" :disabled="checkButton" @click="Register('RegForm')" >提交</button>
                                <input type="reset" name="" class="btn btn-warning">  
                                <button class="btn btn-danger" data-dismiss="modal" @click="cancle">取消</button>
                            </div>
                            <a href="" data-toggle="modal" data-dismiss="modal" data-target="#login">已有账号？点我登录</a>
                    </form>
                </div>
            </div>
        </div>
    </div>

<!-- 注册模态框结束 -->

</template>
<script type="text/javascript">
 
export default{
    data(){
            return{
            	checkButton:true,
                isNoZhuce:false,
                msgName:'',
                isEmailZhuce:false,
                msgEmail:'',
                isPassZhuce:false,
                imgsrc:domain.testUrl,
                RegForm:{
                    uName:'',
                    uEmail:'',
                    uPassword:'',
                    uMotto:'',
                    // uSex:'2',
                    // uRank:'0',
                    // uStatus:'1'
                    // checked:true
                }
        }
    },
    methods:{
    	checkAll(){
    		var pasLen = document.getElementById('pass');
            if(this.RegForm.uName=='' || this.RegForm.uName==null){
              this.msgName='请输入用户名';
              // return false;
            }
            if(this.RegForm.uEmail == '' || this.RegForm.uEmail == null){
                this.msgEmail='请输入邮箱';
                // return false;
             }
    		if(this.isNoZhuce==true ){
            	this.checkButton=true; 
            }else if(this.isEmailZhuce==true){
            	this.checkButton=true; 

            }else if(pasLen.value.length<6){
            	this.checkButton=true; 
            	
            }else{
            	this.checkButton=false;//如果按钮的属性为可用
            	
            }
    	},


            // 注册方法开始
        Register(regFormName){
        	if(this.RegForm.uName =='' || this.RegForm.uName == null){
                alert("请输入用户名");
                this.checkButton=true;
                return false;
            }
             if(this.RegForm.uEmail == '' || this.RegForm.uEmail == null){
                alert("请输入邮箱")
                this.checkButton=true;
                return false;
            } if(this.RegForm.uPassword == '' || this.RegForm.uPassword == null){
                alert("请输入密码");
                this.checkButton=true;
                return false;
            } if(this.RegForm.uMotto == '' || this.RegForm.uMotto == null){
                alert("请输入座右铭");
                this.checkButton=true;
                return false;
            }
            
             this.$ajax.post(this.imgsrc+'/user/register',{
                'uName':this.RegForm.uName,
                'uEmail':this.RegForm.uEmail,
                'uPassword':this.RegForm.uPassword,
                'uMotto':this.RegForm.uMotto
            }).then(res => {
              if(res.data.code=='200'){
                alert(res.data.message)
                setTimeout(function(){
                    $('#register').modal('hide');
                    $('.modal .fade').hide();
                $('.modal-backdrop').remove();//关闭阴影遮罩层
                   
                },0.01)
                this.RegForm.uName='';

                this.RegForm.uEmail='';
                this.RegForm.uPassword='';
                this.RegForm.uMotto='';


                // alert(res.data);
              }
              if(res.data.code=='500'){
                alert(res.data.message)
              }
            })
        
        },
        ShowNameAlert(){
        	if(this.RegForm.uName=='' || this.RegForm.uName==null){
            	this.isNoZhuce=true;
            	this.msgName='一旦注册成功，无法修改！';
        	}
        },
        checkuName(Name){
        	
            this.$ajax.post(this.imgsrc+'/user/examUserNameInSystem',{
                "uName":Name
            }).then(res => {
                if(res.data.code=='200'){
                  	// this.msgName=res.data.message;
                  	this.isNoZhuce=false;
                    // console.log(res.data.message);//未被注册
                }
                if(res.data.code=='201'){
                	this.isNoZhuce=true;
                		
                    this.msgName=res.data.message;//已注册
                    // return false;
                }

                if(res.data.code=='500'){
                   this.msgName=res.data.message;//错误
                    // return false;
                }

            })
        },
        ShowEmailAlert(){
        	if(this.RegForm.uEmail=='' || this.RegForm.uEmail==null){
            	this.isEmailZhuce=true;
            	this.msgEmail='请认真填写，邮箱将作为登录本系统的账号！一旦注册成功，无法修改！';
        	}
            
        },
        checkuEmail(Email){
            
            this.$ajax.post(this.imgsrc+'/user/examUserEmailInSystem',{
                'uEmail':Email
            }).then(res =>{
                if(res.data.code=='200'){
            		this.isEmailZhuce=false;
                }
                if(res.data.code=='201'){
            		this.isEmailZhuce=true;

                	this.msgEmail=res.data.message;
                    // alert(res.data.message);//已注册
                    // return false;
                }
                
                    if(res.data.code=='500'){
                	this.msgEmail=res.data.message;
                  
                
                }
                
            })
        },
        ShowPassAlert(){
            this.isPassZhuce=true;
        },
        LeavePassAlert(){
            this.isPassZhuce=false;
        },
        cancle(){
           this.RegForm.uName='';

                this.RegForm.uEmail='';
                this.RegForm.uPassword='';
                this.RegForm.uMotto='';
        }
    }

};
</script>

<style type="text/css" scoped>
.Form_width{
    width: 63%;
}
    .is-danger{
        color: red;
        border: 1px solid orange;
        font-weight: 300;
        font-size: 17px;
    }
    .Rank{
        float: left;
        /* margin-left: 22px; */

    }
    .Status{
        float: left;
        margin-left: 62px;
    }

</style>