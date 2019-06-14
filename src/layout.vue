<template>
  <div id="app">
    <heads/>
    <loding v-if="loding"/>
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
      loding:this.$store.state.loding
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
