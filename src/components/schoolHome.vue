<template>
  <div>
    <div class="schoolHome">
      <div class="homeToolbar clearfix">
        <div class="toolbarLeft clearfix">
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
          <ul>
            <li><i class="iconfont icon-shijian"></i></li>
            <li>国际学校库</li>
          </ul>
        </div>
        <div class="toolbarRight">
          <ul>
            <li><el-input v-model="input" placeholder="请输入内容"></el-input></li>
            <li><el-button type="info">信息按钮</el-button></li>
          </ul>
        </div>
      </div>
      <div class="schoolHomeCenter">
        <div class="homeCenterToobar clearfix">
          <p><span id="btnpath">北京</span><span>上海</span><span>深圳</span><span>深圳</span><span>深圳</span><span>深圳</span></p>
          <el-button type="info">信息按钮</el-button>
        </div>
        <div class="homeList clearfix">
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
          </div>
          <div>
            <p><i class="iconfont icon-shijian"></i></p>
            <ul>
              <li>北京哈喽学校</li>
              <li>课程：美国课程</li>
            </ul>
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
  data() {
    return {
      input:""
    }
  },
  created() {

  },
  components:{
    schoolFooter
  }
}
</script>

<style conped>
  .schoolHome{
    margin: 0 auto;
    width: 1200px;
    border: 1px solid;
  }
  .toolbarLeft{
    float: left;
  }
  .toolbarLeft ul{
    width: 120px;
    height: 120px;
    border: 1px solid #ccc;
    float: left;
    border-radius: 5px;
    margin: 30px;
  }
  .toolbarLeft ul li:first-of-type{
     height: 90px;
     text-align: center;
  }
  .toolbarLeft ul li:first-of-type i{
    line-height: 90px;
    text-align: center;
    font-size: 50px;
  }
   .toolbarLeft ul li:last-of-type{
     text-align: center;
   }
  .toolbarRight{
    float: left;
    width: 200px;
    margin-left: 50px;
    text-align: center;
  }
  .toolbarRight li:first-of-type{
    margin-top: 35px;
  }
 .toolbarRight button.el-button.el-button--info{
    width: 200px;
    margin-top: 30px;
  }
  .schoolHomeCenter{
    margin-top: 20px;
    border: 1px solid #cccccc;
  }
  .homeCenterToobar{
    /* margin-top: 40px; */
    width: 80%;
    margin: 20px auto 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #cccccc;
    font-size: 24px;
  }
  .homeCenterToobar p{
    float: left;
  }
  #btnpath{
    color: red;
  }
  .homeCenterToobar p span{
    padding: 0 10px;
    color: #777;
  }
  .homeCenterToobar button.el-button.el-button--info{
    float: right;
  }
  .homeList{
    width: 80%;
    margin:0 auto;
    /* display: flex; */
  }
  .homeList>div{
    float: left;
    border: 1px solid #cccccc;
    width: 219px;
    margin: 10px;
    height: 100px;
  }
  .homeList>div p{
    float: left;
    /* background: red; */
    width: 50px;
    height: 50px;
    margin-left: 20px;
    margin-top: 20px;
  }
  .homeList>div i{
    font-size: 55px;

  }
  .homeList>div ul{
    float: left;
    margin-left: 15px;
    margin-top: 15px;
    line-height: 30px;
  }
</style>
