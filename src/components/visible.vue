<template>
    <div class="schoolVisual">
        <div class="banner">
            <img src="../assets/visible/visible.jpg" alt="数据可视化" class="img-responsive">
        </div>
        <div class="container text-center visibleTitle">
            <p class="label label-success">新学说数据可视化图表</p>
        </div>
        <div class="container visiblePic">
            <div class="row">
                <div class=" col-xs-12  col-md-12 col-lg-12">
                    <div>
                        <a @click="toMapView" target="_blank">
                            <img src="../assets/visible/002.jpg" alt="新学说数据图">
                        </a>
                        <div class="caption clearfix">
                            <h3 class="text-center">中国国际学校地理位置图</h3>  
                            <p><a @click="toMapView" target="_blank" class="btn btn-sm btn-primary pull-right" role="button">了解详细</a></p>
                        </div>
                    </div>
                </div> 
            </div>
         </div>
        <schoolFooter />
    </div>
</template>

<script>
import schoolFooter from './schoolFooter'
export default {
  components:{
    schoolFooter
  },
  data() {
    return {

    }
  },
  methods:{
     toMapView(){
         window.open("../../static/map-view/map-view.html","_blank") 
     }
  },
  mounted(){
    
  },
}
</script>

<style lang="less" scoped>
  .schoolVisual{
      .visibleTitle{
          margin-top:50px;
          margin-bottom: 80px;
          p{
              padding:20px 30px; 
              font-size:30px;
              background: rgb(33,80,137)
          }
      }
      .visiblePic{
          text-align: center;
          border: 1px solid #ccc;
          width: 570px;
          padding: 10px 0;
          border-radius: 5px;
          img{
              width:540px;
              height:455px;
              cursor: pointer;
          }
          .caption{
              h3{
                  margin:20px 0;
              }
              p{
                  a{
                      margin-right:10px;
                  }
              }
          }
      }
  }
</style>

