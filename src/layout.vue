<template>
  <div id="app">
    <heads/>
    <router-view/>
  </div>
</template>
<script>
import heads from '@/components/heads'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  methods:{

  },
  components:{
    heads
    //homes
  }
}
</script>
<style>
</style>
