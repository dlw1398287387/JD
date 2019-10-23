<template>
  <div class="exception">
    <div class="img">
      <img :src="config[type].img"/>
    </div>
    <div class="content">
      <h1>{{config[type].title}}</h1>
      <div class="desc">{{config[type].desc}}</div>
      <div class="action">
        <a-button type="primary"><router-link :to="{name:'ChartDish'}">返回首页</router-link></a-button>
      </div>
    </div>
  </div>
</template>

<script>
 import types from './type'

  export default {
    name: "Exception",
   
    data() {
      return {
        config: types
      }
    },
    methods: {
      
    },
    props:{
    	type:{
    		type:String,
    		default:'404',
    	}
    }
  }
</script>

<style  scoped>
  .exception {
  	min-height: 500px;
  	height: 80%;
  	align-items: center;
  	text-align: center;
  	margin-top: 150px;
  	/*background: #F0F2F5;*/
  }
  
  .exception .img {
  	display: inline-block;
  	padding-right: 10px;
  	zoom: 1;
  }
  
  .exception .img img {
  	height: 360px;
  	max-width: 430px;
		/*margin-left: 2rem;*/
  }
  
  .exception .content {
  	display: inline-block;
  	flex: auto;
  }
  
  .exception .content h1 {
  	color: #434e59;
  	font-size: 72px;
  	font-weight: 600;
  	line-height: 72px;
  	margin-bottom: 24px;
  }
  
  .exception .content .desc {
  	color: rgba(0, 0, 0, .45);
  	font-size: 20px;
  	line-height: 28px;
  	margin-bottom: 16px;
  }
  
  .mobile .exception {
  	margin-top: 30px;
  }
  
  .mobile .exception .img {
  	padding-right: unset;
  }
  
  .mobile .exception .img img {
  	height: 40%;
  	max-width: 80%;
  }
</style>