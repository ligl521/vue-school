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
<style>
    .loding{
        position: fixed;
        z-index: 1000;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.5)
    }
    img{
        width: 350px;
        height: 350px;
        display: block;
        margin: 50px auto;
    }
</style>