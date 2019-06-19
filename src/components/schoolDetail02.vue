<template>
<div>
  <div class="schoolList">
      <!-- //swiper -->
      <div class="carousel">
        <div class="swiper-container">
          <div class="swiper-wrapper">
              <div class="swiper-slide">
                <img src="../assets/one.png">
              </div>
              <div class="swiper-slide">
                <img src="../assets/two.png">
              </div>
              <div class="swiper-slide">
                <img src="../assets/san.png">
              </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <!-- //logo以及学校说明 -->
      <div class="schoolSimple">
        <div class="schoolId clearfix"><p>NO.123543{{schoolId}}</p></div>
        <div class="schoolLogo clearfix">
          <p class="schoolLogoLeft"><img src="../assets/school.png" /></p>
          <ul>
            <li>北京哈罗英国学校{{schollDatil.schoolName}}</li>
            <li>Harrow International{{schollDatil.schoolEnglishName}}</li>
            <li>类型：外籍{{schollDatil.schoolProperties}}</li>
          </ul>
          <div class="schoolLogoRight">
            <h1>认证：<span>CIE</span><span>Edexcel</span><span>NEASC</span></h1>
            <p>运营状态：运营中{{schollDatil.operationState}}</p>
            <P>地址：北京 朝阳区 崔各庄乡何各庄村287号{{schollDatil.address}}</P>
          </div>
        </div>
        <div class="schoolTranslate">
          <h1 class="schoolTranslateH1">基本信息</h1>
          <div class="schoolTranslateBox">
            <ul class="schoolTranslateHeader clearfix">
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>建校时间：2005{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-guanwang"></i>www.harrowbeijing.cn{{schollDatil.website}}</p></li>
              <li class="clearfix"><p>学制：<span>小学</span><span>初中</span><span>高中</span></p><p>学费：<span>150000</span><span>150000</span><span>150000</span></p></li>
            </ul>
          </div>
          <div class="intoduce">
            <h1 class="schoolTranslateH1">学校详细介绍</h1>
            <div class="intoduceJeshao">
              <h1>硬件设施</h1>
              <p>{{schollDatil.hardware}}学校位于何各庄的校园设备先进，拥有冷暖空调、三个运动场、多功能体育馆、健身中心、两个游泳池、一个多功能剧场、两个戏剧排练室、十三个个设备齐全的科学实验室、六个大音乐教室及多个小排练教室和一个拥有两万册藏书的图书馆。</p>
              <h1>学校详情介绍</h1>
              <p>{{schollDatil.remark}}     长期以来，我校始终坚持"以育人为中心，以学生为主体"的教育思想和办学传统，努力构建教书、管理、服务、环境四位一体的育人体系，通过开设"大学预科班"、"高中理科试验班"、"马约翰体育班"、"一条龙试验班"和"美术特长班"等特长班，不断强化素质教育，为学生的个性发展提供广阔空间，形成了鲜明开放的办学特色，创建了良好的学风、校风，办学质量和教育水平不断提高。自1983年至今，已有2000多名毕业生进入清华、北大，先后有150多人次获得北京市金帆奖、银帆奖，在教学、科研、管理、人才培养等方面取得了丰硕的成果，为祖国建设和社会发展培养了大批人才。</p>

                <p>如今，清华附中已成为教育部直属大学附中、北京市重点中学、国家级体育传统项目学校、中国数学奥林匹克委员会"中学生数学奥林匹克培训基地"。先后被国家教委和北京市评为"德育先进校"、"北京市校园环境示范校"、"北京市首批示范性普通高中"。学校各种教学设施设备齐全，师资队伍不断壮大，生源质量全面提高，对外交流广泛频繁，不断焕发出勃勃生机。</p>

                <p>在2015年，清华附中继续履行名校责任，配合北京市继续开展优质高中部分招生计划分配到初中校工作并且启动了优质高中资源市级统筹项目，为此清华附中新建将台路校区和奥森校区，两校区都属于清华附中由清华附中直接管理。清华附中朝阳学校副校长朱建宏担任奥森校区和将台路校区执行校长，清华附中杜毓贞副校长一同协调与督导学校工作，清华附中英语高级教师张姝敏老师担任教育教学副校长。教师团队由清华附中统一安排，主要学科的特级与骨干教师由本部派有经验的老教师担任。新教师按清华附中本部统一的标准招聘，和本部教师享受同等待遇，统一分派教学任务。特别是奥森校区和首都体育学院合作，零起点联合培养学生的体育艺术特长，让学生全面、个性发展。将台路校区和清华大学美术学院联合培养，毕业时经过艺术素养测试合格，高考考入有外培计划的市属高校后，可以申请转入该校的外培计划。新校区的建立为清华附中的发展开拓了更大的舞台，为更多学生提供更优质的教育，助力清华附中新百年教育梦的实现!</p>

            </div>
          </div>
          <h1 class="schoolTranslateH1">课程学生</h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
              <li class="clearfix"><p><i class="iconfont icon-shijian"></i>2005{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-dili"></i>{{schollDatil.coveredArea}}300亩</p><p><i class="iconfont icon-jine"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>民办{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>北京 朝阳区 各庄村{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-text_icon"></i>双语国际课；高中AP课程{{schollDatil.course}}</p><p><i class="iconfont icon-laoshi1"></i>教师人数：300{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：2000{{schollDatil.students}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-fenchengbili"></i>中外教比例：{{schollDatil.teacherNum}}1-3{{schollDatil.foreignTeacherNum}}</p><p><i class="iconfont icon-jiaoshi"></i>师生比例：1:4{{schollDatil.teacherStuRatio}}</p><p><i class="iconfont icon-dianhua"></i>18353077779{{schollDatil.telephone}}</p></li>
            </ul>
          </div>
          <h1 class="schoolTranslateH1">师资力量   </h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
             <li class="clearfix"><p><i class="iconfont icon-shijian"></i>2005{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-dili"></i>{{schollDatil.coveredArea}}300亩</p><p><i class="iconfont icon-jine"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>民办{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>北京 朝阳区 各庄村{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
            </ul>
          </div>
          <h1 class="schoolTranslateH1">建设投资</h1>
          <div class="schoolTranslateCenter clearfix">
            <ul class="clearfix">
             <li class="clearfix"><p><i class="iconfont icon-shijian"></i>2005{{schollDatil.foundingTime}}年</p><p><i class="iconfont icon-dili"></i>{{schollDatil.coveredArea}}300亩</p><p><i class="iconfont icon-jine"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont  icon-dibudaohanglan-"></i>民办{{schollDatil.schoolProperties}}</p><p><i class="iconfont icon-dingwei"></i>北京 朝阳区 各庄村{{schollDatil.address}}</p><p><i class="iconfont icon-xuexiao"></i>小学 初中 高中{{schollDatil.schoolSystem}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-text_icon"></i>双语国际课；高中AP课程{{schollDatil.course}}</p><p><i class="iconfont icon-laoshi1"></i>教师人数：300{{schollDatil.teacherNum}}</p><p><i class="iconfont icon-wodexuesheng"></i>学生人数：2000{{schollDatil.students}}</p></li>
              <li class="clearfix"><p><i class="iconfont icon-fenchengbili"></i>中外教比例：{{schollDatil.teacherNum}}1-3{{schollDatil.foreignTeacherNum}}</p><p><i class="iconfont icon-jiaoshi"></i>师生比例：1:4{{schollDatil.teacherStuRatio}}</p><p><i class="iconfont icon-dianhua"></i>18353077779{{schollDatil.telephone}}</p></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- //底部 学校批注 -->
      <div class="detailOrder clearfix">
        <div class="deailOrderLeft">
          <h1>预约开放时间</h1>
          <ul class="clearfix">
            <li class="clearfix">
              <p><el-input v-model="inputName" placeholder="学生中文姓名"></el-input></p>
              <p><el-input v-model="inputTelephone" placeholder="手机电话"></el-input></p>
              <!-- <p><input type="text" placeholder="手机电话" /></p>
              <p><input type="text" placeholder="学生中文姓名" /></p> -->
              <p>
                <el-select v-model="value" placeholder="在读年级">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </p>
              <p><el-radio v-model="radio" label="1">男</el-radio><el-radio v-model="radio" label="2">女</el-radio></p>
            </li>
            <li><el-button type="info">提交</el-button></li>
          </ul>
        </div>
        <div class="deailOrderRight">
          <h1>访校批注</h1>
          <div class="deailAnnotation">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="textarea"
              maxlength="500"
              show-word-limit
              :rows="5"
            >
            </el-input>
          </div>
          <!-- <div class="deailAnnotation" contenteditable="true"></div> -->
          <p><el-button type="info">提交</el-button></p>
        </div>
      </div>
  </div>
  <schoolFooter></schoolFooter>
</div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
import axios from "axios";
import schoolFooter from './schoolFooter.vue'
export default {
  data() {
    return {
      value:"",
      banner:true,
      schollDatil:{},
      schoolSwiper:[],
      schoolAuthentication:[],
      schoolId:"",
      textarea:"",//批注
      radio: '1',
      inputTelephone:"",//手机
      inputName:"", //姓名
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
    }
  },
  methods: {

  },
  components:{
    schoolFooter
  },
  mounted(){
    var mySwiper = new Swiper('.swiper-container', {
      autoplay:{
        disableOnInteraction: false, //用户操作后是否禁止自动循环
        delay: 4000 //自自动循环时间
      },
      loop:true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  },
  created(){

  },
}
</script>
<style scoped>
  .schoolList{
    width: 1110px;
    margin: 0 auto;
    border: 1px solid #ccc;
    padding-bottom: 30px;
    margin-bottom: 100px;
    margin-top: 20px;
    color: #26343f;
  }
/* bannner */
  .swiper-slide{
    height: 400px;
  }
/* .swiper-button-next{
	background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23777'%2F%3E%3C%2Fsvg%3E");

}
.swiper-button-prev{
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23777'%2F%3E%3C%2Fsvg%3E");
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23777'%2F%3E%3C%2Fsvg%3E");
} */
.swiper-button-next{
  background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M27%2C22L5%2C44l-4.2-4.2L18.6%2C22L0.8%2C4.2L5%2C0z'%20fill%3D'%23214f89'%2F%3E%3C%2Fsvg%3E")
}
.swiper-button-prev{
	background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20viewBox%3D'0%200%2027%2044'%3E%3Cpath%20d%3D'M0%2C22L22%2C0l4.2%2C4.2L8.4%2C22l17.8%2C17.8L22%2C44L0%2C22z'%20fill%3D'%23214f89'%2F%3E%3C%2Fsvg%3E");
}



  .carousel img{
    width: 100%;
    height: 100%;
  }
  .schoolId p{
    float: right;
    font-size: 18px;
    border: 2px solid #777;
    padding: 5px 10px;
    margin-top: 15px;
    margin-right: 15px;
    border-radius: 10px;
    color: #777;
  }
  .schoolLogo{
    margin-top: 30px;
    margin-left: 100px;
    margin-right: 100px;
  }
  .schoolLogo ul{
    float: left;
    margin-left: 20px;
    margin-top: 10px;
  }
   .schoolLogo ul li:first-of-type{
    font-size: 32px;
  }
  .schoolLogo ul li:nth-of-type(2){
    font-size: 20px;
    margin-top: 20px;
  }
  .schoolLogo ul li:last-of-type{
    font-size: 16px;
    margin-top: 20px;
  }
  .schoolLogoLeft{
    float: left;
    width: 150px;
    height: 150px;
    margin-left: 0px;
  }
  .schoolLogoLeft img{
    width: 100%;
    height: 100%;
  }
   .schoolLogo ul h1{
     float: left;
     margin-left: 30px;
     font-size: 20px;
   }
   .schoolLogoRight{
     float: left;
     margin-left: 80px;
     margin-top: 15px;
     font-size: 16px;
   }
   .schoolLogoRight span{
     display: inline-block;
     padding: 5px;
     border-radius: 5px;
     background: #777;
     color: #ffffff;
     margin-right: 5px;
   }
   .schoolLogoRight p{
     margin-top: 20px;

   }

  /* 学校信息 */
  .schoolTranslate{
    font-size: 16px;
    margin-left: 100px;
    margin-right: 100px;

  }
  .schoolTranslate ul{
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .schoolTranslate li{
    line-height: 50px;
  }
  .schoolTranslate li p{
  }
  .schoolTranslate li p i{
    font-size: 20px;
    margin-right: 5px;
  }
  .schoolTranslateH1{
    margin-top: 20px;
    /* text-align: center; */
    /* background: #214f89; */
    /* color: #eee; */
    background: #f9f9f9;
    padding: 10px;
    font-size: 24px;
    font-weight: 400;
  }
  .schoolTranslateBox{
    background: #f9f9f9;
  }
  .schoolTranslateHeader{
    width: 80%;
    margin: 0 auto;
    background: #f9f9f9;
  }
  .schoolTranslateHeader p{
    width: 360px;
  }
  .schoolTranslateHeader li{
    float: left;
  }
  .schoolTranslateHeader p span{
    display: inline-block;
    width: 80px;
    text-align: center;
  }
  .schoolTranslateCenter{
    background: #f9f9f9;
  }
  .schoolTranslateCenter ul{
    width: 90%;
    margin: 0 auto;
  }
  .schoolTranslateCenter p{
    float: left;
    width: 270px;
  }


  /* 详情介绍 */
  .intoduce{
    margin-top: 20px;
    background: #f9f9f9;
    padding-bottom: 20px;
  }
  .intoduceJeshao{
    width: 90%;
    margin: 0 auto;
    letter-spacing: 1px;
  }
  .intoduceJeshao h1{
    font-size: 20px;
    margin-bottom: 10px;
    margin-top: 20px;
  }
  .intoduceJeshao h2{
    font-size: 16px;
    margin-top: 30px;
  }
  .intoduceJeshao p{
    line-height: 25px;
    text-indent: 30px;
    letter-spacing:2px;
    font-size: 16px;
  }
  .detailOrder{
    border-top: 2px solid #cccccc;
    margin-top: 30px;
  }
      /* 预约 */
.deailOrderLeft{
  margin-top: 20px;
  margin-left: 100px;
  background: #f7f7f7;
  margin-right: 100px;
  padding-bottom: 30px;
}
.detailOrder h1{
  /* background: #214f89; */
  /* color: #eee; */
  padding: 10px;
  font-size: 18px;
  font-weight: 550;
  /* text-align: center; */
}
.deailOrderLeft li{
  margin-top: 30px;
  line-height: 40px;

}
.deailOrderLeft p{
  float: left;
  font-size: 18px;
  margin-left: 40px;
}
.deailOrderLeft p input[type="text"]{
  height: 30px;
  padding-left: 10px;
}
.deailOrderLeft p select{
  height: 35px;
  width: 176px;
  padding-left: 10px;
}
.deailOrderLeft li:last-of-type{
  text-align: center;
}
.deailOrderLeft span{
  margin-right: 30px;
}
.deailOrderLeft button{
  font-size: 16px;
  padding: 10px 80px;
  margin: 0 auto;
}
.deailOrderRight{
  margin-top: 20px;
  margin-right: 100px;
  margin-left: 100px;
  background: #f7f7f7;
  padding-bottom: 30px;
}
.deailAnnotation{
  margin-top: 30px;
  margin-right: 30px;
  margin-left: 30px;
}
.deailAnnotation:focus{outline:none;}
.deailOrderRight p{
  text-align: center;
}
.deailOrderRight button{
  font-size: 16px;
  padding: 10px 80px;
  margin-top: 20px;
}
</style>
