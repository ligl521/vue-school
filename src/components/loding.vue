<template>
  <div id="loding">
      <div class="loding"><img src="../assets/loding.jpg" alt=""></div>
  </div>
</template>
<script>
export default {
  name: 'App',
}
</script>
<style scoped>
    .loding{
        position: fixed;
        z-index: 100;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.6)
    }
    img{
        width: 400px;
        height: 400px;
        display: block;
        margin: 150px auto;
    }
</style>
