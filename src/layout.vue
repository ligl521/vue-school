<template>
  <div id="app">
    <heads/>
    <router-view/>
  </div>
</template>
<script>
import heads from '@/components/heads'
// import homes from '@/components/homes'
export default {
  name: 'App',
  methods:{
  },
  components:{
    heads,
    //homes
  }
}
</script>
<style>
</style>
