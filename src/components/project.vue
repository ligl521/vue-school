<template>
  <div class="project">
      <div class="banner">
        <img src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/nsi-pc/banner04.jpg" alt="国际学校项目数据库" class="img-responsive" />
      </div>
      <!-- 搜索栏 -->
      <div class="companyBox">
        <div class="companyGroup">
          <div class="searchBox">
            <el-input
              placeholder="请输入内容"
              v-model="searchKey"
              @keyup.enter.native="searchCompany"
              class="inputBtn"
            >
              <el-button @click="searchCompany" slot="append"
                ><i class="iconfont icon-sousuo"></i
              ></el-button>
            </el-input>
          </div>
          <p class="homeBannerP">
              <span>热门搜索：</span>
              <a v-for="(item,index) in searchHot"  :key="index" @click="hotSearch(item.key)" target="_blank">{{item.key}}</a>
          </p>
        </div>
        <div class="companyku">
          <p>发布项目信息</p>
          <p @click="addProject">马上发布</p>
        </div>
      </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-4" v-for="(item,index) in projectList" :key="index">
              <div class="thumbnail">
                <a @click="toProjectDetail(item.id)" class="linkHref"><img src="../assets/project/project01.jpg" alt="新学说"></a>
                <div class="caption">
                  <h5 class="projectName">{{item.subjectname}}</h5>
                  <p class="content" @click="toProjectDetail(item.id)">
                    <span class="linkHref" id="lengthControl">{{item.subjectintroduction}}</span>
                  </p>
                  <div class="clearfix publishCompany">
                    <p class="pull-right">发布单位：<span>{{item.company}}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="generalSearchResult">
            <p>已搜索到<span class="gengeralSearchNum">{{searchCount}}</span>条结果</p>
        </div>
           
      <schoolFooter />
  </div>
</template>

<script>
import schoolFooter from './schoolFooter'
import {getProjectDate,suggestSearch} from '@/api/api'
export default {
  components:{
    schoolFooter
  },
  data() {
    return {
      searchKey:"",
      projectList:"",
      searchCount:"",
      pageNum:1,
      pageSize:20,
      searchHot:[
          {key:"投资"},
          {key:"场地"},
          {key:"运营团队"},
          {key:"人才培训"},
          {key:"课程设计"},
          {key:"市场调研"},
          {key:"品牌推广"},
      ]
    }
  },
  created() {
    this.searchKey = this.$route.query.item;
  },
  
  methods:{
    //coolie 读取存在
    getCookie(name) {
      var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    getDate(){
      getProjectDate({
        searchKey:this.searchKey, 
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }).then(res=>{
        console.log(res.data)
        this.projectList=res.data.list
        this.searchCount=res.data.total
      })
    },
    toProjectDetail(id){
        let routeData= this.$router.resolve({path: '/projectDetail',query:{id:id}})
        window.open(routeData.href, '_blank');
    },
    addProject(){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可加入！',
                type: 'warning'
            });
        }else{
            this.$router.push('/projectAdd');
        }
    },

    hotSearch(value){
      this.searchKey=value
      this.getDate()
    },
    enterAdd(){
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可加入！',
                type: 'warning'
            });
        }else{
           this.$router.push({path:"./companyAdd"})
        }
    },
    searchCompany(){
        this.getDate()
    },
  },
  mounted(){
    this.getDate()
  },
}
</script>

<style lang="less" scoped>
.project{
  background:#f5f5f5;
  .companyBox {
    display: flex;
    justify-content: center;
    margin-bottom: 40px;
    .companyGroup {
      .searchBox {
        display: inline-block;
        margin-top: 50px;
        .el-input {
          width: 570px;
          i {
            font-size: 40px;
            color: #fff;
          }
        }
      }
      .homeBannerP{
        color: #a19c9c;
        font-size: 14px;
        margin-top: 30px !important;
            a{
                margin:0 10px;
                cursor: pointer;
            }
        }
      }
    .companyku {
      width: 280px;
      height: 100px;
      border-radius: 10px;
      background-color: #eaf4ff;
      color: #215089;
      font-weight: bold;
      text-align: center;
      margin: 50px 0 0 70px;
      &:hover {
        cursor: pointer;
      }
      p:first-of-type {
        padding-top: 20px;
        font-size: 20px;
        color: #215089;
        font-weight: bold;
        letter-spacing: 1px;
      }
      p:last-of-type {
        border-radius: 20px;
        padding: 8px 25px;
        margin-top: 10px;
        display: inline-block;
        background-color: #215089;
        color: #fff;
        transition: all 0.3s;
        letter-spacing: 1px;
      }
    }
  }
  .thumbnail{
    .linkHref {
      color: #337ab7;
      cursor: pointer;
    }
    .caption{
      color:#333;
      .projectName {
        line-height: 1.5;
        min-height: 42px;
        margin-top: 10px;
      }
      .content {
        text-indent: 2em;
        min-height: 60px;
        margin:10px 0;
      }
      .publishCompany {
        color: #999;
        font-size: 18px;
        p{
          margin-bottom:0;
        }
      }   
    }
    
  }
  .generalSearchResult{
    text-align: center;
    margin:20px 0;
    color: black;
    font-size: 14px;
    span{
      font-weight: bold;
      color: lightcoral;
      padding: 0 6px;
      font-size: 16px;
    }
  }
}
  
</style>
<style>
    .companyGroup .el-input__inner{
        height: 50px !important;
        border: 2px solid #214f89;
    }
    .companyGroup .el-input-group__append {
        border: 0;
        background: #214f89;
    }
</style>

