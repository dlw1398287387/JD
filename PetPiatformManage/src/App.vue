<template>
  <div id="app" >
    <keep-alive>
    	<router-view v-if="$route.meta.keepAlive" :locale="zh_CN"></router-view>
   </keep-alive>
   <router-view v-if="!$route.meta.keepAlive" :locale="zh_CN"></router-view>
  </div>
</template>

<script>
	import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
	import moment from 'moment';
	import 'moment/locale/zh-cn';
	moment.locale('zh-cn');
	
export default {
  name: 'App',
  data() {
    return {
      zh_CN,
    }
  }
}
</script>

<style>

	
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}


</style>
