<template>
	<keep-alive v-if="keepAlive">
	    <router-view />
	</keep-alive>
	<router-view v-else />
</template>

<script>

  export default {
    name: "RouteView",
    data(){
    	return{
    		keepAlive:this.$route.meta.keepAlive
    	}
    },
    mounted(){
//  	console.log(this.$route.meta.keepAlive)
    },
    computed: {
//    keepAlive () {
//      return this.$route.meta.keepAlive
//    }
    },
    
    components:{
    	
    }
  }
</script>