<template>
	<div>
    <div class="modal fade" id="releaseS" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">您将发布的咨讯</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-type" class="control-label">咨讯类型:</label>
            <!-- <input type="text" class="form-control" id="recipient-name" v-model="types" placeholder="请输入咨讯的类型"> -->
            <select name="types" v-model="addZiyuan.types" class="selectpicker">
              <!-- <option  value="" disabled>请选择类型</option> -->
              <option  value="电子书资源类">电子书资源类</option>
              <option  value="校园竞赛类">校园竞赛类</option>
              <option  value="校园热点类">校园热点类</option>
              <option  value="大学生创业类">大学生创业类</option>
              <option value="源码资源">源码资源</option>
              <option value="视频资源">视频资源</option>
              <option value="其他">其他</option>
             </select>
          </div>
           <div class="form-group">
             <label for="recipient1-link" class="control-label">咨讯访问链接:</label>
            <input type="text" class="form-control" id="recipient1-link" v-validate="'required'" v-model="addZiyuan.url" placeholder="请输入咨讯链接" name="link">
             <span v-show="errors.has('link')" class="help is-danger">{{ errors.first('link') }}</span>
          </div>
           <div class="form-group">
             <label for="recipient-title" class="control-label">资源标题:</label>
            <input type="text" class="form-control" id="recipient-title" v-model="addZiyuan.title" placeholder="请输入资源标题">
          </div>
          <div class="form-group">
            <label for="message-text" class="control-label">发布的内容:</label>
            <textarea class="form-control" id="message-text" v-model="addZiyuan.contents" placeholder="请输入100字以内的介绍文字" maxlength="100"></textarea>
          </div>
         </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
        <button type="submit" class="btn btn-primary" @click="ReleaseOK">发布</button>
      </div>
    </div>
  </div>
</div>
  </div>
</template>
<script>
	export default{
       // inject:['fetchData'],
      
		data(){
			return{
                imgsrc:domain.testUrl,
				addZiyuan:{
          contents:'',
           types:'',
           url:'',
           title:''
        }
        // uEmail:localStorage.getItem('userEmail')
			}
		},
		methods:{

			ReleaseOK(){
         var types = this.addZiyuan.types;
      var title= this.addZiyuan.title;
      var  URL = this.addZiyuan.url;
      var Content = this.addZiyuan.contents;
      if(types=='' || types==null){
        alert("请输入类型");
        return false;
      }
      if(URL=='' || URL==null){
        alert("请输入链接");
        return false;
      }
      if(title=='' || title==null){
        alert("请输入标题");
        return false;
      }
      if(Content=='' || Content==null){
        alert("请输入内容");
        return false;
      }
      this.$ajax.post(this.imgsrc+'/resource/insertResource',{    
	         "sessionId":localStorage.getItem('sessionId'),
					"content":Content,
					"type":types,
          "url":URL,
          "title":title
	       		 }).then(res => {
	          		if(res.data.code=='200'){
		            // this.menus=res.data.contents.list;
		            	alert(res.data.message);
                  this.addZiyuan.types='';
                   this.addZiyuan.title="";
                   this.addZiyuan.url="";
                   this.addZiyuan.contents="";
                 // this.fetchData(1);
                  setTimeout(function(){
                    $('#releaseS').modal('hide');
                    $('.modal .fade').hide();
                    $('.modal-backdrop').remove();//关闭阴影遮罩层
                  },0.01);

		          	}
		          	if(res.data.code=='500'){
		            	alert(res.data.message);
		          	}
	        	})
      }
			}
		
	};
</script>