<template>
  <div id="app">
   <h1 v-text="title"></h1>
   <input  v-model="newItem" @keyup.enter="addNew" type="" name="">
   <ol>
   	<li v-for="item in items" v-bind:class="{finished:item.isFinished}" v-on:click="toggleFinish(item)">{{item.label}}</li>
   </ol>
   <p>child tells me:{{msgFromChild}}</p>
   <!--<componentA></componentA>-->
   <component-a msgFromFather='i am your father!' v-on:child-tell-me-thing='listenToMyBoy'></component-a>
  </div>
</template>

<script type="text/javascript">
	import Store from './Store'
	import ComponentA from './components/componentA'
//	console.log(Store);
  export default{
  	components: { ComponentA },
    data(){
      return {
        title:'this is a todo list',
        items:Store.fetch(),
        newItem:'',
        msgFromChild:''
      }
    },
    
    watch:{
//  	items:{
//  		handler:function(val,oldVal){
//  			console.log(val,oldVal);
//  		},
//  		deep:true
//  	}
			items:{
				handler:function(items){
				Store.save(items);
				},
				deep:true
			}
			
    },
    methods:{
      toggleFinish:function(item){
        item.isFinished=!item.isFinished;
      },
      addNew:function(){
        this.items.push({
          label:this.newItem,
          isFinished:false
        })
        this.newItem='';
       
      },
      listenToMyBoy:function(msg){
      	this.msgFromChild=msg;
      }
    }
  }
</script>
<style type="text/css">
	.finished{
		text-decoration: underline;
	}
</style>
