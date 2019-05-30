<template>
  <div class="inedx">
      <div @click="btn"> dms</div>
      <p>343434</p>
        4652方式345646
  </div>
</template>
<script>

export default {
  components: {},
  methods: {
    btn:function(){
      
    },
    getid:function(){
      console.log(this.$route.query && this.$route.query.id)
    }
  },
  created(){
    this.getid()
  }  
};
</script>
<style>
  .inedx{
    background: red;
    height: 200px;
    width: 100%;
  }
</style>
