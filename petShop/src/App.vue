<template>
  <div id="app">
    <keep-alive>
    	<router-view v-if="$route.meta.keepAlive"></router-view>
	  </keep-alive>
	  <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
   	methods:{
 			
  	},
	  mounted(){
	  		document.body.addEventListener('touchend', function(){});
	  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	width: 100%;
}

</style>
