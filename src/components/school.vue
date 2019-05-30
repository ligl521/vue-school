<template>
  <div id="container">
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
    <div class="www">
        <el-row :gutter="20" type="flex" style="flex-wrap:wrap">

                <!--<p>{{schoolList}}</p>  -->
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="3" v-for="(item,index) in schoolLists" :key="index" >
                <div class="grid-content bg-purple" @click="btnSchoolDetailsList(item)">
                    <div class="logoimg" v-if="item.schoolLogo? true:false"><img :src="schoolLogoUrl+item.schoolLogo"></div>
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
  </div>
</template>

<script>
//ajax请求
import axios from "axios";
export default {
  created: function() {
    this.getschool();
  },

  data() {
    return {
      input: "",
      schoolLists: [],
      currentPage: 1,
      pageSize: 24,
      pageNum: 1,
      total_school: 0,
      no_school: "",
      schools: [],
      timeout: null,
      schoolLogoUrl:"http://data.xinxueshuo.cn/",
      schoolLogoUrlTwo:"http://data.xinxueshuo.cn/nsi/assets/img/schoolNoPic.png",
    };
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
    btnSchoolDetailsList(val){
      this.$router.push({path:"./schoollisttwo",query:{id:val.id}})
    },
    //获取学校List数据(包括学校搜索)
    getschool() {
      let that = this;
      let urldata = new URLSearchParams();
      urldata.append("pageNum", that.pageNum);
      urldata.append("pageSize", that.pageSize);
      urldata.append("searchKey", that.input);
      axios.post("http://data.xinxueshuo.cn/nsi-1.0/school/list.do", urldata)
        .then(function(respons) {
          that.schoolLists = respons.data.data.list;
          that.total_school = respons.data.data.total;
          //判断有无搜索结果
          that.total_school == 0
            ? (that.no_school = "未搜索到结果，请重新输入关键字！")
            : (that.no_school = "");
            window.scrollTo(0,0)
            for (var i=0;i<respons.data.data.list.length;i++) {
              var str = respons.data.data.list[i].schoolSystem;
              var arr1 = str.split("；");
              var arr2 = arr1.slice(0,arr1.length-1);
              var arr3 = [];
              for(var j=0; j<arr2.length; j++){
                  arr3.push(arr1[j].slice(0,1))
              }
              respons.data.data.list[i].schoolSystem
              that.schoolLists[i].schoolSystem=arr3.join(",");
            }
        });
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
<style>
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
  margin-left: 75px;
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
.schoolList {
  border-radius: 10px;
  /* border: 1px solid gray; */
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
 li{
    list-style: none;
}
.el-col {
    border-radius: 4px;
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
.grid-content:hover{
  box-shadow: 0px 0px 15px #ccc ;

}
.grid-content ul{
  margin-left: -45px;
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
</style>
