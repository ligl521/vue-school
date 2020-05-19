<template>
  <div style="background: #f5f5f5;">
    <div class="personalCenter">
      <div class="personalCenter_left">
        <img
          src="https://nsi.oss-cn-zhangjiakou.aliyuncs.com/UserPortrait/929dd8bc-748c-423f-af31-b02f446dde21.png"
          alt=""
          class="userLogo"
        />
        <ul v-for="(tab, index) in tabsName" :key="index">
          <li
            class="tab-link"
            @click="tabsSwitch(index)"
            v-bind:class="{ liActive: tab.isActive }"
          >
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <div class="personalCenter_right">
        <div class="tab-card talentDetails"  v-if="isCheck==0">
          <div class="top">
            <div class="top_left">
              <h2>{{personalContent.username}}</h2>
              <p>
                <span>{{personalContent.age}}岁</span><span>{{personalContent.sex}}</span
                ><span>{{ personalContent.highEducation }}</span
                ><span>{{ personalContent.expreience }}</span>
              </p>
            </div>
          </div>
          <el-divider></el-divider>
          <!-- 期望职位 -->
          <div class="title">
            <div class="title_name">
              <el-divider direction="vertical"></el-divider
              ><span>期望职位</span>
            </div>
            <p>
              <span>{{ personalContent.position }}</span
              ><span>{{ personalContent.expectedWork }}</span
              ><span>{{ personalContent.salary }}</span>
            </p>
          </div>
          <el-divider></el-divider>
          <!-- 工作经历 -->
          <div class="experience">
            <div class="experience_name title_name">
              <el-divider direction="vertical"></el-divider
              ><span>工作经历</span>
            </div>
            <p v-for="(item,index) in personalWork" :key="index">
              <span class="experience_one">{{ item.company }}</span>
              <span class="experience_tow">{{ item.jobType }}</span>
              <span class="experience_three">{{ workDate1 }}-</span>
              <span class="experience_four">{{ workDate2 }}</span>
              <br />
              <span>{{ item.textarea }}</span>
            </p>
          </div>
          <el-divider></el-divider>
          <!-- 教育背景 -->
          <div class="educational">
            <div class="title_name">
              <el-divider direction="vertical"></el-divider>
              <span>教育背景</span>
            </div>
            <p v-for="(item,index) in personalEdu" :key="index">
              <span class="educational_one">{{ item.schoolName }}</span
              ><span>{{ item.schoolMajor }}</span
              ><span class="educational_tow">{{ schoolDate2 }}</span><span class="educational_tow">{{ schoolDate1 }}-</span>
              <br />
              <span>{{ item.schoolTextarea }}</span>
            </p>
          </div>
          <el-divider></el-divider>
          <!-- 培训经历 -->
          <div class="educational">
            <div class="title_name">
              <el-divider direction="vertical"></el-divider
              ><span>培训经历</span>
            </div>
            <!-- <p>
                <span>{{personalContent.training}}</span>
            </p> -->
            <p v-for="(item,index) in personaltraining" :key="index">
              <span class="educational_one">{{ item.trainName }}</span>
              <span class="educational_tow">{{ trainDate2 }}</span><span class="educational_tow">{{ trainDate1 }}-</span>
              <!-- <span class="educational_three">{{ item.trainMajor }}</span> -->
              <br />
              <span>{{ item.trainTextarea }}</span>
            </p>
          </div>
          <el-divider></el-divider>
          <!-- 其他要求 -->
          <div class="educational">
            <div class="title_name">
              <el-divider direction="vertical"></el-divider
              ><span>其他要求</span>
            </div>
            <p>
              <span
                >{{personalContent.other}}</span
              >
            </p>
          </div>
        </div>
        <div class="tab-card personalCenter_rightnull" v-else>
          <div class="rightNullBox">
            <img src="../assets/user_noadd.png" alt="">
            <p  @click="writePersonnel">您还没有上传简历，<span>请填写</span> </p>
          </div>
        </div>
        <div class="tab-card Instructions">
          <h3 class="text-center" style="margin-bottom: 20px;margin-top: 0;">
            《新学说国际学校四库全书用户协议》
          </h3>
          <p style="text-indent: 2em;font-weight: bold;">
            欢迎您使用新学说国际学校四库全书！
          </p>
          <p style="text-indent: 2em;font-weight: bold;">
            为使用新学说文化传媒有限公司（以下简称“新学说”）提供的服务（以下简称“本服务”），
            您应当阅读并遵守《新学说国际学校四库全书用户协议》（以下简称“本协议”）相关协议、及业务规则。请您务必审慎阅读、充分理解各条款内容，特别是限制或免除责任的相应条款，
            以及开通或使用某项服务的单独协议，并选择接受或不接受。限制或免除责任条款可能以
            加粗形式提示您注意。
          </p>
          <p style="text-indent: 2em;font-weight: bold;">
            除非您已阅读并接受本协议所有条款，否则您无权使用本服务。您对本服务的登陆、查看、上传发布、修改信息等行为即视为您已阅读并同意接受本协议的约束。
          </p>
          <p style="text-indent: 2em;font-weight: bold;">
            如果您未满18周岁，请在法定监护人的陪同下阅读本协议，并特别注意未成年人使用条款。
          </p>
          <div>
            <h4 class="Instructions_title">一、【协议的范围】</h4>
            <p>
              本协议是您与新学说文化传媒有限公司之间关于使用本服务所订立的协议。
            </p>
            <h4 class="Instructions_title">二、【用户个人信息保护】</h4>
            <p>
              2.1
              您在申请本服务过程中，需要填写一些必要的信息，请保持这些信息的及时更新，
              以便新学说向您提供帮助，或更好地为您提供服务。若国家法律法规有特殊规定的，您需要填写真实的身份信息。若您填写的信息不完整或不准确，则可能无法使用服务或在使用过程中受到限制。
            </p>
            <p>
              2.2
              新学说与用户一同致力于个人信息的保护，保护用户个人信息是新学说的一项基本原则
              。未经您的同意，我们不会向新学说以外的任何公司、组织和个人披露您的个人信息，但您违反本协议约定导致他人投诉或者主管机关追究责任，以及法律法规另有规定的除外。
            </p>
            <p>2.3 您理解并同意：鉴于本服务的网络共享特性，新学说可以：</p>
            <p style="font-weight: bold;">
              （1）新学说国际学校四库全书中您提交的信息，会记录并公开您的真实姓名。
            </p>
            <p style="font-weight: bold;">
              （2）人才数据库中您提交的个人简历在征得您同意后，会公开给相关机构或个人。
            </p>
            <p>
              2.4
              为更好的保护您的个人信息，您应尽快、充分了解本服务的相关功能、规则和设置，同时，您可合理设定您的个人信息的公开范围。
            </p>
            <p>
              您理解并同意：新学说可能会将您的个人信息的公开范围默认设置为公开，该默认设置会导致他人接触或获取您的个人信息；如您希望变更默认设置，请您在相关服务页面予以变更。
            </p>
            <p>
              2.5
              您应对通过本服务了解、接收或可接触到的包括但不限于其他用户在内的任何人的个人信息予以充分尊重，您不应以搜集、复制、存储、传播或以其他任何方式使用其他用户的个人信息，否则，由此产生的后果由您自行承担。
            </p>

            <h4 class="Instructions_title">三、【数据的储存】</h4>
            <p>
              3.1
              新学说不对您在本服务中相关数据的删除或储存失败负责，您应对重要数据在本服务之外自行进行备份。
            </p>
            <p>
              3.2
              新学说有权根据实际情况自行决定在服务器上对您在本服务中的数据的最长储存期限、为单个用户分配的最大存储使用空间等。您可根据自己的需要自行备份本服务中的相关数据。
            </p>
            <p>
              3.3
              如果您的服务被终止或取消，新学说可以从服务器上永久地删除您的数据。服务终止或取消后，新学说没有义务向您返还或恢复任何数据。
            </p>

            <h4 class="Instructions_title">四、【用户发布的内容】</h4>
            <p style="font-weight: bold;">
              4.1
              您可以在本服务平台上发布和共享信息，但您应当保证拥有这些信息的合法权利或已经得到权利人的授权。
            </p>
            <h4 class="Instructions_title">五、【用户行为规范】</h4>
            <p>
              5.1 您在使用本服务时不得利用本服务从事以下行为，包括但不限于：
            </p>
            <p>
              （1）发布、传送、传播、储存违反国家法律、危害国家安全统一、社会稳定、公序良俗、社会公德以及侮辱、诽谤、淫秽、暴力的内容；
            </p>
            <p>
              （2）发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；
            </p>
            <p>（3）虚构事实、隐瞒真相，误导、欺骗他人；</p>
            <p>（4）发表、传送、传播广告信息及垃圾信息；</p>
            <p>
              （5）从事其他违反法律法规、政策及公序良俗、社会公德等的行为。
            </p>
            <p>
              5.2
              如果新学说发现或收到他人举报您发布的信息违反本协议约定的，新学说有权进行独立判断并采取技术手段予以删除、屏蔽或断开链接。同时，新学说有权视用户的行为性质，采取包括但不限于限制、暂停或终止您使用本服务的全部或部分功能，限制、暂停或终止使用新学说提供的全部或部分功能，追究法律责任等措施。
            </p>
            <p>
              若您违反本协议及本服务相关协议、规则或相关法规政策，被投诉多次的，新学说有权不经您同意而直接解除您的用户关系。
            </p>
            <p>
              5.3
              您违反本条约定，导致任何第三方损害的，您应当独立承担责任；新学说因此遭受损失的，您也应当一并赔偿。
            </p>

            <h4 class="Instructions_title">六、【风险与免责】</h4>
            <p style="font-weight: bold;">
              基于互联网的开放性和网络服务的传播特殊性，新学说特别提醒您谨慎注意以下风险：
            </p>
            <p style="font-weight: bold;">
              6.1
              本服务仅提供一个在线的平台，您应当对其他用户使用本服务所发布的内容进行独立判断并承担因依赖该内容而引起的所有风险，包括但不限于因对内容的正确性、完整性或实用性的依赖而产生的风险以及因您个人信息被其他用户获知而带来的风险。您了解并确认，新学说不对本服务用户之间的纠纷承担任何责任。
            </p>
            <p style="font-weight: bold;">
              6.2
              您在使用本服务过程中所发布的内容有可能会被第三方复制、转载、修改或做其他用途，脱离您的预期和控制，您必须充分意识此类风险的存在，新学说对由此产生的纠纷不予负责。
            </p>
            <p style="font-weight: bold;">
              6.3
              请您切勿在使用本服务时透露任何涉及财产、本服务帐户及密码等重要信息，否则，由此带来的损失由您自行承担。
            </p>
            <p style="font-weight: bold;">6.4.不可抗力条款</p>
            <p style="font-weight: bold;">
              新学说对不可抗力导致的损失不承担责任。本服务条款所指不可抗力包括：天灾、法律法规或政府指令的变更，因网络服务特性而特有的原因，例如境内外基础电信运营商的故障、计算机或互联网相关技术缺陷、互联网覆盖范围限制、计算机病毒、黑客攻击等因素，及其他合法范围内的不能预见、不能避免并不能克服的客观情况。
            </p>

            <h4 class="Instructions_title">七、【其他】</h4>
            <p>
              7.1
              您使用本服务即视为您已阅读并同意受本协议的约束。新学说有权在必要时修改本协议条款。您可以在相关页面中查阅最新的协议条款。本协议条款变更后，如果您继续使用本服务，即视为您已接受修改后的协议。如果您不接受修改后的协议，应当停止使用本服务。
            </p>
            <p>
              7.2新学说可能不断发布的关于本服务的相关协议、业务规则等内容。上述内容一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。上述内容与本协议存在冲突的，以本协议为准。您对前述任何业务规则、协议的接受，即视为您对本协议全部的接受。
            </p>
            <p>
              7.3
              本协议的成立、生效、履行、解释及纠纷解决，适用中华人民共和国大陆地区法律（不包括冲突法）。
            </p>
            <p>
              7.4
              若您和新学说之间发生任何纠纷或争议，首先应友好协商解决；协商不成的，您同意将纠纷或争议提交本协议签订地有管辖权的人民法院管辖。
            </p>
            <p>
              7.5
              本协议所有条款的标题仅为阅读方便，本身并无实际涵义，不能作为本协议涵义解释的依据。
            </p>
            <p>
              7.6
              本协议条款无论因何种原因部分无效或不可执行，其余条款仍有效，对双方具有约束力。（正文完）
            </p>

            <h3 class="text-center" style="margin:20px 0">
              《新学说版权声明》
            </h3>
            <p style="font-weight: bold;">
              1
              、本网所有资料，凡未经特殊注明的，版权均属新学说网站（www.xinxueshuo.cn
              ）所有。
            </p>
            <p style="font-weight: bold;">
              2
              、转载或引用本网内容必须是以新闻性或资料性公共免费信息为使用目的的合理、善意引用，不得对本网内容原意进行曲解、修改。包括但不限于以下内容：
            </p>
            <p>（ 1 ）本网所指向的非本网内容的相关链接内容；</p>
            <p>（ 2 ）已作出不得转载或未经许可不得转载声明的内容；</p>
            <p>
              （ 3 ）未由本网署名或本网引用、转载的他人作品等非本网版权内容；
            </p>
            <p>（ 4 ）本网中特有的图形、标志、页面风格、编排方式、程序等；</p>
            <p>
              （ 5 ）本网中必须具有特别授权或具有注册用户资格方可知晓的内容；
            </p>
            <p>（ 6 ）其他法律不允许或本网认为不适合转载的内容。</p>
            <p style="font-weight: bold;">
              3 、转载或引用本网内容不得进行如下活动：
            </p>
            <p>（ 1 ）损害本网或他人利益；</p>
            <p>（ 2 ）任何违法行为；</p>
            <p>（ 3 ）任何可能破坏公秩良俗的行为；</p>
            <p>（ 4 ）擅自同意他人继续转载、引用本网内容；</p>
            <p style="font-weight: bold;">
              4
              、转载或引用本网内容须注明“资料数据来源：新学说国际学校数据库”字样，并标明本网网址data.xinxueshuo.cn
              ，违者将依法追究责任。
            </p>
            <p style="font-weight: bold;">
              5
              、对于不当转载或引用本网内容而引起的民事纷争、行政处理或其他损失，本网不承担责任。
            </p>
            <p style="font-weight: bold;">
              6
              、对不遵守本声明或其他违法、恶意使用本网内容者，本网保留追究法律责任的权利。
            </p>
            <p style="font-weight: bold;">
              7
              、本网所有资料的解释说明权归新学说所有。新学说有权对拥有版权的资料随时进行修改和更新。
            </p>
            <p style="font-weight: bold;">
              8
              、本网站属于新学说文化传媒有限公司，未经新学说许可，不得接入新学说数据库的内容。
            </p>
            <div class="clearfix">
              <h5 class="pull-right">新学说文化传媒有限公司</h5>
            </div>
          </div>
        </div>
        <div id="problem" class="tab-card problem">
          <h3 class="problem_h3">新学说~~~期待您的反馈，让我们变得更好</h3>
          <h4 style="margin: 20px 0">
            1、您在浏览网页时遇到什么问题？ （可多选）
          </h4>
          <div class="problem_div">
            <el-checkbox
              type="checkbox"
              v-model="checkedBox"
              label="搜索数据不正确"
              value="搜索数据不正确"
            ></el-checkbox>
          </div>
          <div class="problem_div">
            <el-checkbox
              type="checkbox"
              v-model="checkedBox"
              label="网页中排版错乱"
              value="网页中排版错乱"
            ></el-checkbox>
          </div>
          <div class="problem_div">
            <el-checkbox 
              type="checkbox" 
              v-model="checkedBox" 
              label="其他问题" 
              value="其他问题"
            ></el-checkbox>
          </div>
          <h4 style="margin: 20px 0">
            2、您对新学说数据库有什么建议？
            <span style="font-size: 14px;color: #ccc;"
              >（建议说出具体的问题所在）</span
            >
          </h4>
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="textarea"
          >
          </el-input>
          <h4 style="margin: 20px 0">
            3、请留下你的联系方式，我们将会及时通知您问题处理的进展
          </h4>
          <el-input placeholder="请输入联系方式" v-model="input"> </el-input>
          <el-button @click="ruleForm" class="ruleForm">立即提交</el-button>
        </div>
      </div>
      
    </div>
    <schoolFooter></schoolFooter>
  </div>
</template>
<script>
import schoolFooter from "./schoolFooter";
import { feedback,checkUpfile } from "@/api/api";
export default {
  data() {
    return {
      input: "",
      textarea: "",
      checkedBox:[],
      submitter:'',
      tabsName: [
        {
          name: "我的简历",
          isActive: false
        },
        {
          name: "使用说明",
          isActive: false
        },
        {
          name: "问题反馈",
          isActive: false
        }
      ],
      active: false,
      // name: "", //名字
      // education: "", //学历
      // workYear: "", //工作年限
      // sex: "", //性别
      // expectWorkPlace: "", //工作地点
      // expectWorkPosition: "", //期望工作
      // expectSalary: "", //期望年薪
      // educationBackground: [
      //   { name: "泉州师范学院", time: "2010-2014", zy: "汉语国际教育" },
      //   { name: "泉州师范学院-2", time: "2010-2014-2", zy: "汉语国际教育-2" }
      // ], //教育背景
      // workExperience: [
      //   {
      //     time: "2015.7-2016.5-1",
      //     dizhi: "印度尼西亚泗水中文世界-1",
      //     laoshi: "中文老师",
      //     wenben:
      //       "刚再荣升第三任妈妈，照片中见蔡少芬虽然素颜，但精神饱满，已经出院回家安胎，蔡少芬接受传媒访问时开怀地说：“BB重8磅2安士，好健康，老公都有跟入产房剪脐带，好照顾我。”不过她指一开始好害怕，因为又要重新"
      //   },
      //   {
      //     time: "2015.7-2016.5-2",
      //     dizhi: "印度尼西亚泗水中文世界-2",
      //     laoshi: "中文老师",
      //     wenben:
      //       "刚再荣升第三任妈妈，照片中见蔡少芬虽然素颜，但精神饱满，已经出院回家安胎，蔡少芬接受传媒访问时开怀地说：“BB重8磅2安士，好健康，老公都有跟入产房剪脐带，好照顾我。”不过她指一开始好害怕，因为又要重新"
      //   }
      // ],
      isCheck:"",
      personalContent:"",
      personalWork:"",
      personalEdu:"",
      personaltraining:"",
      trainDate1:"",
      trainDate2:"",
      schoolDate1:"",
      schoolDate2:"",
      workDate1:"",
      workDate2:"",
    };
  },
  created() {
      this.submitter = this.getCookie("username"); //名字
      console.log(this.submitter)
  },
  mounted() {
    this.tabsSwitch(this.$route.query.id);
    this.checkPersonnel() 
    console.log(this.$route.query.id)
  },
  methods: {
    //coolie 读取存在
    getCookie(name) {
      var arr,
        reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
      if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
      else return null;
    },
    //选项卡
    tabsSwitch: function(tabIndex) {
      var tabCardCollection = document.querySelectorAll(".tab-card"),
        len = tabCardCollection.length;
      for (var i = 0; i < len; i++) {
        tabCardCollection[i].style.display = "none";
        this.tabsName[i].isActive = false;
      }
      this.tabsName[tabIndex].isActive = true;
      tabCardCollection[tabIndex].style.display = "block";
    },
    ruleForm(){
        console.log(this.checkedBox.join('/')+';'+this.textarea)
        console.log(this.input)
        let that=this
        feedback({
            UserName:that.submitter,
            Content:that.checkedBox.join('/')+';'+that.textarea,
            Contact:that.input,
        }).then(res=>{
            console.log(res)
            alert(res.msg)
        })
    },
    checkPersonnel(){
      checkUpfile({
          userMail:this.getCookie("username")
        }).then(res=>{
          console.log(res)
          this.isCheck=res.code
          this.personalContent=res.data
          this.personalWork=eval('(' + res.data.workExperience + ')')
          this.personalEdu=eval('(' + res.data.education + ')')
          this.personaltraining=eval('(' + res.data.training + ')')

          this.trainDate1=new Date(this.personaltraining[0].trainDate[0]).getFullYear() + '.' + (new Date(this.personaltraining[0].trainDate[0]).getMonth() + 1) + '.' + new Date(this.personaltraining[0].trainDate[0]).getDate();
          this.trainDate2=new Date(this.personaltraining[0].trainDate[1]).getFullYear() + '.' + (new Date(this.personaltraining[0].trainDate[1]).getMonth() + 1) + '.' + new Date(this.personaltraining[0].trainDate[1]).getDate();
          this.schoolDate1=new Date(this.personalEdu[0].schoolDate[0]).getFullYear() + '.' + (new Date(this.personalEdu[0].schoolDate[0]).getMonth() + 1) + '.' + new Date(this.personalEdu[0].schoolDate[0]).getDate();
          this.schoolDate2=new Date(this.personalEdu[0].schoolDate[1]).getFullYear() + '.' + (new Date(this.personalEdu[0].schoolDate[1]).getMonth() + 1) + '.' + new Date(this.personalEdu[0].schoolDate[1]).getDate();
          this.workDate2=new Date(this.personalWork[0].date[1]).getFullYear() + '.' + (new Date(this.personalWork[0].date[1]).getMonth() + 1) + '.' + new Date(this.personalWork[0].date[1]).getDate();
          this.workDate1=new Date(this.personalWork[0].date[0]).getFullYear() + '.' + (new Date(this.personalWork[0].date[0]).getMonth() + 1) + '.' + new Date(this.personalWork[0].date[0]).getDate();
        })
    },
    writePersonnel(){
      this.$router.push('/personnel');
    }
  },
  components: {
    schoolFooter
  }
};
</script>
<style lang="less" scoped>
// 通用的css
.title_name {
  font-size: 22px;
  vertical-align: top;
  .el-divider {
    background-color: #215089;
    margin-top: -2px;
    width: 4px;
  }
  span {
    vertical-align: text-bottom;
  }
}
.personalCenter_rightnull{
  height: 400px;
  text-align: center;
  display: inline-block;
  margin-top: 30px;
  background: #fff;
  width: 800px;
  position: relative;
  .rightNullBox{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    p{
      margin-top:20px;
      span{
        cursor: pointer;
        color: #428bca;
      }
    }
  }
}
.personalCenter {
  margin: 0 auto;
  width: 1100px;
  margin-bottom:120px;
  .personalCenter_left {
    display: inline-block;
    vertical-align: top;
    margin-top: 30px;
    text-align: center;
    background: #215089;
    padding: 40px 20px;
    width: 280px;
    margin-right: 16px;
    border-radius: 4px;
    box-shadow: 0 0 5px #aaaaaa;
    .userLogo {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin-bottom: 20px;
    }
    .tab-link {
      width: 200px;
      height: 40px;
      background: #fff;
      color: #000;
      margin: 20px auto;
      line-height: 40px;
      border-radius: 4px;
      cursor: pointer;
    }
    .liActive {
      background: #d4d4d4;
      color: #fff;
      box-shadow: 0 0 10px #ccc;
    }
  }
  .personalCenter_right {
    display: inline-block;
    margin-top: 30px;
    background: #fff;
    width: 800px;
    .talentDetails {
      padding: 20px;
      .top {
        .top_left {
          h2 {
            margin-bottom: 30px;
          }
          p {
            padding: 0 40px;
            font-size: 16px;
            span {
              display: inline-block;
              padding: 0 40px;
              border-right: 1px solid #ddd;
            }
            span:first-child {
              padding: 0 40px 0 0;
            }
            span:last-child {
              border-right: none;
            }
          }
        }
      }
      .title {
        p {
          padding: 30px 20px 10px 0;
          font-size: 16px;
          span {
            display: inline-block;
            padding: 0 40px;
            border-right: 1px solid #ddd;
          }
          span:last-child {
            border-right: none;
          }
        }
      }
      .experience {
        p {
          padding: 30px 40px 10px;
          line-height: 30px;
          .experience_one {
            font-weight: 700;
            font-size: 18px;
            margin-right: 40px;
          }
          .experience_tow {
            font-weight: 700;
          }
          .experience_three {
            font-weight: 700;
            margin-left: 40px;
            color: #9fa3b0;
          }
           .experience_four {
            font-weight: 700;
            color: #9fa3b0;
          }
        }
      }
      .educational {
        p {
          padding: 30px 40px 10px;
          line-height: 30px;
          .educational_one {
            font-weight: 700;
            font-size: 18px;
            margin-right: 40px;
          }
          .educational_tow {
            float: right;
            font-weight: 700;
            color: #9fa3b0;
          }
        }
      }
      .contact {
        .contact_name {
          display: flex;
          .el-divider {
            background-color: #215089;
            margin-top: -2px;
            width: 6px;
            height: 130px;
          }
          p {
            padding: 0 20px 20px;
            font-size: 16px;
          }
          .contact_mode {
            font-size: 18px;
            font-weight: 700;
            color: #215089;
          }
        }
      }
    }
    .Instructions {
      padding: 20px;
      line-height: 26px;
      .Instructions_title {
        color: #215089;
        margin: 8px 0;
      }
      .clearfix {
        margin-top: 10px;
      }
    }
    .problem {
      padding: 25px;
      .problem_div {
        margin: 0 10px 20px 30px;
      }
      .problem_h3 {
        color: #215089;
        margin: 15px 0;
      }
      .ruleForm {
        background-color: #215089 !important;
        float: right !important;
        margin: 27px auto !important;
        display: block;
        font-size: 18px;
        color: #fff;
        outline: none;
      }
      .ruleForm:hover {
        background-color: #306bb5 !important;
      }
    }
  }
}
</style>
