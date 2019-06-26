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
  }
}
</script>
<style>
  #app{
    padding-top: 52px;
  }
</style>
