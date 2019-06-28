<template>
  <div id="loding">
      <div class="loding">
        <!-- <img src="../assets/lodingTwo.gif" alt=""> -->
      </div>
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
        z-index: 1000;
        left: 0;
        right: 0;
        bottom: 0;
        top: 52px;
        background: rgba(0, 0, 0, 0.6);
        background:url(../assets/lodingTwo.gif) no-repeat 680px 150px ;
        background-size: 100px;
    }
    img{
        width: 150px;
        height: 150px;
        display: block;
        margin: 50px auto;
        background: rgba(0, 0, 0, 0.6)
    }
</style>
