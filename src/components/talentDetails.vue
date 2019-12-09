<template>
 <div style="background: #f5f5f5;">
    <div class="talentDetails">
        <div class="top">
            <div class="top_left">
                <h2>{{name}}</h2>
                <p><span>25岁</span><span>{{sex}}</span><span>{{education}}</span><span>{{workYear}}</span></p>
            </div>
            <div class="top_right">
                 <img src="http://img.zcool.cn/community/01a29158b69c22a801219c774b4b0b.png@1280w_1l_2o_100sh.png" alt="">
            </div>
        </div>
        <el-divider></el-divider>
        <!-- 期望职位 -->
        <div class="title">
            <div class="title_name"><el-divider direction="vertical"></el-divider><span>期望职位</span></div>
            <p><span>{{expectWorkPosition}}</span><span>{{expectWorkPlace}}</span><span>{{expectSalary}}</span></p>
        </div>
        <el-divider></el-divider>
        <!-- 工作经历 -->
        <div class="experience">
            <div class="experience_name title_name"><el-divider direction="vertical"></el-divider><span>工作经历</span></div>
            <p v-for="item in workExperience">
                <span class="experience_one">{{item.dizhi}}</span>
                <span class="experience_tow">{{item.laoshi}}</span>
                <span class="experience_three">{{item.time}}</span>
                <br>
                <span>{{item.wenben}}</span>
            </p>
        </div>
        <el-divider></el-divider>
        <!-- 教育背景 -->
        <div class="educational">
            <div class="title_name"><el-divider direction="vertical"></el-divider><span>教育背景</span></div>
            <p v-for="item in educationBackground"><span class="educational_one">{{item.name}}</span><span>{{item.zy}}</span><span class="educational_tow">{{item.time}}</span></p>
        </div>
        <el-divider></el-divider>
        <!-- 培训经历 -->
        <div class="educational">
            <div class="title_name"><el-divider direction="vertical"></el-divider><span>培训经历</span></div>
            <p v-for="item in workExperience">
                <span class="educational_one">{{item.dizhi}}</span>
                <span class="educational_tow">{{item.time}}</span>
                <br>
                <span>{{item.wenben}}</span>
            </p>
        </div>
        <el-divider></el-divider>
        <!-- 其他要求 -->
        <div class="educational">
            <div class="title_name"><el-divider direction="vertical"></el-divider><span>其他要求</span></div>
            <p><span>刚再荣升第三任妈妈，照片中见蔡少芬虽然素颜，但精神饱满，已经出院回家安胎，蔡少芬接受传媒访问时开怀地说：“BB重8磅2安士，好健康，老公都有跟入产房剪脐带，好照顾我。”不过她指一开始好害怕，因为又要重新</span></p>
        </div>
        <el-divider></el-divider>
        <!-- 联系方式 -->
        <div class="contact">
            <div class="contact_name">
                <el-divider direction="vertical"></el-divider>
                <div>
                  <p class="contact_mode">联系方式</p>
                  <p class="contact_people">联系人：赵艳松</p>
                  <p class="contact_phone">电话：15711049716</p>
                  <p class="contact_email">邮箱：zhaoyansong@xinxueshuo.cn</p>
                </div>
            </div>
            
        </div>
        <el-divider></el-divider>
    </div>
    <schoolFooter />
</div>
</template>

<script>
import schoolFooter from "./schoolFooter";
import {talentdetail} from "@/api/api";
export default {
  data() {
    return {
        name:"",//名字
        education:"",//学历
        workYear:"",//工作年限
        sex:"",//性别
        expectWorkPlace:"",//工作地点
        expectWorkPosition:"",//期望工作
        expectSalary:"",//期望年薪
        educationBackground:[{"name": "泉州师范学院","time": "2010-2014","zy": "汉语国际教育"},
        {"name": "泉州师范学院-2","time": "2010-2014-2","zy": "汉语国际教育-2"}],//教育背景
        workExperience:
         [{"time": "2015.7-2016.5-1","dizhi": "印度尼西亚泗水中文世界-1","laoshi": "中文老师","wenben": "刚再荣升第三任妈妈，照片中见蔡少芬虽然素颜，但精神饱满，已经出院回家安胎，蔡少芬接受传媒访问时开怀地说：“BB重8磅2安士，好健康，老公都有跟入产房剪脐带，好照顾我。”不过她指一开始好害怕，因为又要重新"},
		  {"time": "2015.7-2016.5-2","dizhi": "印度尼西亚泗水中文世界-2","laoshi": "中文老师","wenben": "刚再荣升第三任妈妈，照片中见蔡少芬虽然素颜，但精神饱满，已经出院回家安胎，蔡少芬接受传媒访问时开怀地说：“BB重8磅2安士，好健康，老公都有跟入产房剪脐带，好照顾我。”不过她指一开始好害怕，因为又要重新"}],
    };
  },
  created() {
     this.talentDetails(this.$route.query.id)
  },
  methods:{
    talentDetails(id){
        talentdetail({
        talentId:id,
        }).then(res=>{
           console.log(res.data)
           this.name = res.data.name //名字
           this.education = res.data.education//学历
           this.workYear = res.data.workYear//工作年限
           this.sex = res.data.sex//性别
           this.expectWorkPlace = res.data.expectWorkPlace//工作地点
           this.expectWorkPosition = res.data.expectWorkPosition//期望工作
           this.expectSalary = res.data.expectSalary //期望年薪
        //    this.educationBackground = res.data.educationBackground //教育背景
        })
    }
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
// 通用的css
.title_name{
    font-size: 22px;
    vertical-align: top;
    .el-divider{
        background-color: #215089;
        margin-top: -2px;
        width: 4px;
    }
    span{
        vertical-align: text-bottom;
    }
}

.talentDetails{
    width: 1000px;
    background-color: #fff;
    margin: 0 auto;
    padding: 40px;
    .top{
      display: flex;
      .top_left{
        padding-top:20px;
        width: 80%;
        h2{
            margin-bottom: 30px;
        }
        p{  
            padding: 0 40px;
            font-size: 16px;
            span{
                display: inline-block;
                padding: 0 40px;
                border-right: 1px solid #ddd;
            }
            span:first-child{
                padding: 0 40px 0 0;
            }
            span:last-child{
                border-right: none
            }
        }
      }
      .top_right{
          width: 20%;
          text-align: right;
          margin-right: 40px;
          img{
              width: 100px;
              height: 100px;
              border-radius: 50%;
          }
      }
    }
    .title{
       p{
            padding: 30px 20px 10px 0;
            font-size: 16px;
            span{
                display: inline-block;
                padding: 0 40px;
                border-right: 1px solid #ddd;
            }
            span:last-child{
                border-right: none
            }
       }
    } 
    .experience{
       p{
         padding: 30px 40px 10px;
         line-height: 30px;
         .experience_one{
             font-weight: 700;
             font-size: 18px;
             margin-right: 40px;
         }
         .experience_tow{
             font-weight: 700;
         }
         .experience_three{
             font-weight: 700;
             margin-left: 40px;
             color: #9fa3b0
         }
       }
    }
    .educational{
        p{
         padding: 30px 40px 10px;
         line-height: 30px;
         .educational_one{
             font-weight: 700;
             font-size: 18px;
             margin-right: 40px;
         }
         .educational_tow{
             float:right;
             font-weight: 700;
             color: #9fa3b0
         }
       }
    }
    .contact{
        .contact_name{
            display: flex;
            .el-divider{
                background-color: #215089;
                margin-top: -2px;
                width: 6px;
                height: 130px;
            }
            p{
                padding: 0 20px 20px;
                font-size: 16px;
            }
            .contact_mode{
                font-size: 18px;
                font-weight: 700;
                color: #215089;
            }
        }
    }
}
</style>
