<template>
  <div style="background: #f5f5f5;">
    <div class="schoolTalent">
      <!-- 搜索栏 -->
      <div class="searchBox">
        <el-input
          placeholder="请输入内容"
          v-model="state"
          @keyup.enter.native="searchCompany"
        >
          <el-button
            @click="searchCompany"
            class="search"
            slot="append"
            icon="el-icon-search"
          >
          </el-button>
        </el-input>
        <el-button @click="personnel" type="success">加入人才库</el-button>
      </div>
      <!-- 数据列表 -->
      <div class="schoolTalent_list">
        <div class="list" v-for="item in list_arr">
          <div class="list_left">
            <img
              src="http://img.zcool.cn/community/01a29158b69c22a801219c774b4b0b.png@1280w_1l_2o_100sh.png"
              alt=""
            />
            <p>
              期望年薪：{{
                item.expectSalary == "" ? "面议" : item.expectSalary
              }}
            </p>
          </div>
          <div class="list_Middle">
            <p>
              <span class="list_Middle_name" @click="details(item.id)">{{
                item.name == "" ? "无" : item.name
              }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-tag
                style="vertical-align: text-bottom"
                size="small"
                type="success"
                >语文老师</el-tag
              >&nbsp;&nbsp;&nbsp;&nbsp;<el-tag
                style="vertical-align: text-bottom"
                size="small"
                type="success"
                >数学老师</el-tag
              >
            </p>
            <p>
              <span>{{
                item.expectWorkPlace == "" ? "无" : item.expectWorkPlace
              }}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;<span>{{ item.workYear }}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;<span>{{ item.education }}</span>
              &nbsp;&nbsp;|&nbsp;&nbsp;
              <span
                >入职时间：{{
                  item.entryTime == "" ? "无" : item.entryTime
                }}</span
              >
            </p>
            <p>
              期望职位：<span>{{
                item.expectWorkPosition == "" ? "无" : item.expectWorkPosition
              }}</span>
            </p>
            <p>
              现工作地点：{{ item.workPlace == "" ? "无" : item.workPlace }}
            </p>
          </div>
          <div class="list_right">
            <p>
              <span
                >工作时间：{{
                  item.workYear == "" ? "无" : item.workYear
                }}</span
              ><br /><span
                >毕业院校：{{
                  item.educationBackground == ""
                    ? "无"
                    : item.educationBackground
                }}</span
              >
            </p>
          </div>
          <div @click="details(item.id)" class="details">
            <i class="el-icon-right"></i>
          </div>
        </div>
      </div>
      <!-- 页数 -->
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="list_count"
      >
      </el-pagination>
      <schoolFooter />
    </div>
  </div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import { talentlist } from "@/api/api";
export default {
  data() {
    return {
      restaurants: [],
      state: "",
      timeout: null,
      list_arr: [], //渲染数组
      list_count: 0 //总条数只能是数字
    };
  },
  created() {
    this.list_num();
  },
  methods: {
    handleCurrentChange(val) {
      this.list_num(val);
    },
    list_num(num, name) {
      talentlist({
        pageNum: num,
        pageSize: "10",
        talent_searchKey: name
      }).then(res => {
        this.list_count = res.count;
        this.list_arr = res.data;
      });
    },
    details(e) {
        if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可查看！',
                type: 'warning'
            });
        }else{
            this.$router.push({ name: "talentDetails", query: { id: e } });
        }
    },
      //coolie 读取存在
    getCookie(name) {
      var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    personnel() {
       if(this.getCookie("username") == null){
            this.$message({
                message: '您还没有登录，登陆后即可加入！',
                type: 'warning'
            });
        }else{
            this.$router.push({ name: "personnel" });
        } 
    },
    //搜索引擎
    searchCompany() {
      this.list_num(1, this.state);
    }
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
.schoolTalent {
  text-align: center;
  // 头部css
  .top {
    padding-top: 20px;
  }
  // 搜索按钮css
  .searchBox {
    display: inline-block;
    margin: 20px 0;
    .btn_left {
      text-align: left;
    }
    .el-input {
      margin-top: 5px;
      width: 450px;
      i {
        font-size: 40px;
        color: #fff;
      }
    }
    .search {
      font-size: 26px;
      padding: 10px 15px;
    }
  }
  //数据列表css
  .schoolTalent_list {
    margin: 0 auto;
    width: 1100px;
    .list {
      overflow: hidden;
      position: relative;
      z-index: 1;
      transition: all 0.5s;
      margin: 15px 0;
      background-color: #fff;
      border-radius: 8px;
      padding: 20px 15px;
      display: flex;
      .list_left {
        width: 20%;
        img {
          display: block;
          margin: 0 auto;
          width: 100px;
          height: 100px;
          border-radius: 50px;
          box-shadow: 0 0 6px #000;
          padding: 4px;
          border: 2px solid #f5f5f5;
        }
        p {
          display: block;
          margin: 0 auto;
          text-align: center;
          background: #215089;
          color: #fff;
          margin-top: 15px;
          padding: 5px 10px;
          border-radius: 15px;
          width: 150px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .list_Middle {
        width: 40%;
        margin-left: 20px;
        text-align: left;
        p {
          line-height: 36px;
          .list_Middle_name {
            font-size: 18px;
            color: rgb(33, 79, 136);
            cursor: pointer;
          }
        }
      }
      .list_right {
        width: 20%;
        margin-left: 35px;
        text-align: left;
        p {
          width: 100%;
          height: 145px;
          display: table-cell;
          vertical-align: middle;
          line-height: 36px;
        }
      }
      .details {
        text-align: right;
        transform: translateY(-50%);
        position: absolute;
        bottom: -8%;
        right: -10%;
        z-index: 2;
        transition: all 0.5s;
        font-size: 60px;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
      }
    }
    .list:before {
      content: "";
      background: radial-gradient(
        circle at 23% 70%,
        rgba(33, 79, 136, 0.8),
        rgb(96, 143, 201) 30%
      );
      width: 50%;
      height: 150%;
      opacity: 0;
      transform: rotate(45deg);
      position: absolute;
      top: 96%;
      right: -50%;
      z-index: 1;
      transition: all 0.35s ease;
      cursor: pointer;
    }
    .list:hover:before {
      opacity: 1;
      right: -35%;
    }
    .list:hover .details {
      right: 1%;
    }
  }
}
</style>
