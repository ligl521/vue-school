<template>
  <div id="app">
    <helloworld/>
    <router-view/>
  </div>
</template>
<script>
import helloworld from './HelloWorld'
export default {
  name: 'App',
  methods:{
  },
  components:{
    helloworld
  }
}
</script>
<style>
</style>