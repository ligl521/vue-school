<template>
  <div id="container">
    <loding v-if="this.$store.state.loding"/>

    <div id="searchBar">
      <!-- 搜索学校 -->
      <el-autocomplete
        id="schoolInput"
        v-model="input"
        :fetch-suggestions="querySearch"
        placeholder="请输入学校关键字"
        :trigger-on-focus="false"
        @select="handleSelect"
        @keyup.enter.native="getschool"
      ></el-autocomplete>
      <el-button id="searchBtn" type="primary" icon="el-icon-search" @click="getschool"></el-button>
    </div>
    <!-- 切换按钮 -->
    <div class="toggleBut clearfix">
      <p>
        <span><i class="iconfont icon-icontubiao" :class="chageIcon?'black':'blackTwo'" @click="toggleButLongitudinal"></i></span>
        <span><i class="iconfont icon-gongneng" :class="chageIcon?'blackTwo':'black'" @click="toggleButTransverse"></i></span>
      </p>
    </div>
    <!-- 学校展示列表 -->
    <transition name="fade">
    <div class="schoolDetail" v-if="schoolDetail">
        <span id="search_res">{{this.no_school}}</span>
        <el-row :gutter="20" type="flex" style="flex-wrap:wrap">
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3" v-for="(item,index) in schoolLists" :key="index">
                <div class="grid-content bg-purple" @mousedown="mousedownH($event)" @mouseup="mouseupH($event,item)">
                    <div class="logoimg" v-if="item.schoolLogo? true:false"><img :src="item.schoolLogo"></div>
                    <div class="logoimg" v-if="item.schoolLogo? false:true"><img :src="schoolLogoUrlTwo"></div>
                    <ul>
                        <li class="schoolName">{{item.schoolName | ellipsisName}}</li>
                        <li>学制：{{item.schoolSystem}}</li>
                        <li>课程：AP:美国课程</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
    </transition>
    <!-- 学校展示列表two -->
     <transition name="fafa">
      <div class="www" v-if="!schoolDetail">
        <span id="search_res">{{this.no_school}}</span>
        <div class="schoolList" v-for="(item,i) in schoolLists" :key="i" @mousedown="mousedownH($event)" @mouseup="mouseupH($event,item)">
          <div class="school_logo_div">
            <img
              id="school_logo"
              :src='item.schoolLogo?item.schoolLogo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png"'
            >
          </div>
          <!-- 展示学校detail -->
          <div class="school_infomation">
            <span class="schoo l_info">{{item.schoolName}}</span>
            <span style="display:none">{{item.id}}</span>
            <span class="school_info">{{item.areas+item.areas02+item.areas03}}</span>
            <span class="school_info">{{item.course}}</span>
          </div>
          <div class="school_right">
            <span class="school_right_info">{{item.loadTime}}</span>
            <span class="school_right_info">{{item.schoolSystem}}</span>
            <span class="school_right_info">{{item.schoolProperties}}</span>
          </div>
        </div>
      </div>
    </transition>
    <div class="block">
      <span class="demonstration"></span>
      <!-- 分页组件 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next"
        :total="total_school"
      ></el-pagination>
    </div>
    <schoolFooter/>
  </div>
</template>

<script>
//ajax请求
import axios from "axios";
import {getSchoolLibrary} from "@/api/api"
import loding from '@/components/loding'
import schoolFooter from './schoolFooter'
export default {
  created: function() {
    this.getschool();
  },

  data() {
    return {
      schoolDetail:true,
      input: "",
      schoolLists: [],
      currentPage: 1,
      pageSize: 24,
      pageNum: 1,
      total_school: 0,
      no_school: "",
      schools: [],
      timeout: null,
      chageIcon:false,
      lodingshow:true,
      lodinghide:false,
      isclick : true,
      schoolLogoUrlTwo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png",
    };
  },
  components:{
    loding
  },
  beforeCreate(){
    this.$store.commit('loding',true)
  },
  methods: {
    querySearch(queryString, cb) {
      let that = this;
      let urldata = new URLSearchParams();
      urldata.append("keyword", that.input);
      axios
        .post("http://data.xinxueshuo.cn/nsi-1.0/school/suggest_search.do", urldata)
        .then(function(respons) {
          console.log(respons.data.data)
          var arr=[];
          for (var i = 0; i < respons.data.data.length; i++){
            let a1 = {}; //创建对象
            a1.value = respons.data.data[i];
            arr.push(a1)
          }
          cb(arr);
        });
    },
    //搜索提示的点击操作
    handleSelect(item) {
      console.log(item);
      this.getschool();
    },
    //路由跳转到schoolDetail
    mousedownH(evt){
      this.clientX = evt.clientX;
      this.clientY = evt.clientY;
    },
    mouseupH(evt,val){
      if(this.clientX==evt.clientX&&this.clientY==evt.clientY&&evt.button==0){
        this.$router.push({path:"./schoolDetail",query:{id:val.id}})
      }
    },
    // btnSchoolDetailsList(val){
    //   this.$router.push({path:"./schoolDetail",query:{id:val.id}})
    // },
    //获取学校List数据(包括学校搜索)
    getschool() {
      getSchoolLibrary({
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        searchKey:this.input
      }).then((respons)=>{
        this.$store.commit('loding',false)
        let that = this;
        console.log(respons.data)
        that.schoolLists = respons.data.list;
        that.total_school = respons.data.total;
        //判断有无搜索结果
        that.total_school == 0
          ? (that.no_school = "未搜索到结果，请重新输入关键字！")
          : (that.no_school = "");
          window.scrollTo(0,0)
        for (var i=0;i<respons.data.list.length;i++) {
          var str = respons.data.list[i].schoolSystem;
          var arr1 = str.split("；");
          var arr2 = arr1.slice(0,arr1.length-1);
          var arr3 = [];
          for(var j=0; j<arr2.length; j++){
              arr3.push(arr1[j].slice(0,1))
          }
          respons.data.list[i].schoolSystem
          that.schoolLists[i].schoolSystem=arr3.join(",");
        }

      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getschool();
      // window.scrollTo(0,0)
    },
    //切换学校列表
    toggleButTransverse:function() {
      this.schoolDetail=false;
      this.chageIcon = true;
    },
    toggleButLongitudinal:function() {
      this.schoolDetail=true;
      this.chageIcon = false;
    },

  },
  components:{
    schoolFooter
  },
  //学校过滤超出显示...
  filters: {
    ellipsisName (value) {
      if (!value) return ''
      if (value.length > 6) {
        return value.slice(0,9) + '...'
      }
      return value
    }
  }
};
</script>
<style scoped>
#search_res {
  display: flex;
  justify-content: center;
}
.el-button {
  border-radius: 0px;
}
.el-input__inner {
  border-radius: 0px;
}
#searchBar {
  margin-top: 25px;
  text-align: center;
}
#schoolInput {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 200%;
  margin-left: -200px;
}
.school_infomation {
  float: left !important;
  margin-left: 20px;
  width: 820px;
}
#searchBtn {
  padding: 12px 25px;
  margin-left: -5px;
}
.schoolDetail{
  width: 98%;
  margin: 0 auto;
}
.schoolList {
  border-radius: 10px;
  background-color: white;
  display: flex;
  width: 1168px;
  margin: auto;
  height: 150px;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.schoolList:hover {
  box-shadow: 0px 0px 1px 1px rgb(169, 169, 169);
}
.el-button--primary {
  background: rgb(33, 80, 137);
  border-color: rgb(33, 80, 137);
}
#school_logo {
  width: 100px;
  height: 100px;
}
.school_info {
  display: block;
  margin-top: 5px;
}
.school_right {
  flex: 1;
  text-align: center;
}
.school_right_info {
  display: block;
  margin-top: 5px;
}
.el-pagination {
  text-align: center;
  margin-top: 50px;
}
.el-col {
    border-radius: 4px;
}
.el-autocomplete {
    width: 400px;
}
.grid-content{
  border-radius: 4px;
  min-height: 36px;
  margin-top: 30px;
  /* margin-left: 5px; */
  text-align: center;
  height: 280px;
  border: 1px solid #ccc;
  background: #fff;
}
.black{
  color: #777;
}
.blackTwo{
  color: #214f89;
}
.grid-content:hover{
  box-shadow: 0px 0px 15px #ccc ;

}
.grid-content ul{
  margin-top: 10px;
  line-height: 30px;
  color: #777;
}
.grid-content ul li:first-of-type{
  font-size: 16px;
  color: #000;
}
.logoimg{
  position: relative;
  height: 155px;
}
.logoimg img{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100px;
  height: 100px;
}
.schoolList {
  border-radius: 10px;
  border: 1px solid gray;
  background-color: white;
  display: flex;
  width: 1168px;
  margin: auto;
  height: 150px;
  align-items: center;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
}
.schoolList:hover {
  box-shadow: 0px 0px 1px 1px rgb(169, 169, 169);
}
.toggleBut{
  margin-top: 20px;
}
.toggleBut p{
  border: 1px solid  #cccccc;
  float: right;
  margin-right: 25px;
}
.toggleBut span{
  display:inline-block;
  border-right: 1px solid #cccccc;
  float: left;
}
.toggleBut span:first-child{
  margin-top: 2px;
}
.toggleBut i{
  padding: 5px;
  font-size: 25px;
  display: inline-block;
}
.toggleBut span:first-child i{
  font-size: 22px;
}
.toggleBut i:hover{
  color: #214f89;
}
/* .fade-enter,.fade-leave-to{
  opacity: 0;
}
.fade-enter-to,.fade-leave{
    opacity: 1;
}
.fade-enter-active,.fade-leave-active{
    transition: all 3s;
} */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.fafa-enter-active, .fafa-leave-active {
  transition: opacity 1s
}
.fafa-enter, .fafa-leave-active {
  opacity: 0
}
</style>
