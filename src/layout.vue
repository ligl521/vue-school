<template>
  <div id="app">
    <heads/>
    <loding v-if="this.$store.state.loding"/>
    <router-view/>
  </div>
</template>
<script>
import heads from '@/components/heads'
import loding from '@/components/loding'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  methods:{

  },
  components:{
    heads,loding
    //homes
  }
}
</script>
<style>
</style>
