<template>
  <div class="schoolBottom hidden-xs-only">
    <footer class="footerBox">
      <section id="footer-sec">
        <div class="container">
          <div class="row">
              <div class="col-xs-4 col-md-4 col-lg-4 footerh5">
              <div class="title">联系我们 <span>Contact</span></div>
              <div class="content">
                  <ul>
                      <li>电话：010-52468286</li>
                      <li>手机：15010927730</li>
                      <li>邮箱：info@xinxueshuo.cn</li>
                      <li>办公室：北京市朝阳区曙光西里时间国际A座1501</li>
                      <li></li>
                  </ul>
              </div>
            </div>
            <div class="col-xs-4 col-md-4 col-lg-4 footerh5">
              <div class="title">关于新学说 <span>About Us</span></div>
              <div class="center-block text-left content">
                <p>
                  新学说(NewSchool Insight)是由国际学校资深专家共同打造的国际学校服务平台。为国际学校提供行业最新资讯，会议组织， 海外考察；研究报告，行业数据库；学校投建，运营管理，品牌管理，人才培养等专业咨询服务。
                  <a id="hovea" href="https://www.xinxueshuo.cn/#/about" target="_blank" >more..</a>
                </p>
              </div>
            </div>
            <div class="col-xs-2 col-md-2 col-lg-2 text-center footerh5">
              <div class="title">微信公众号</div>
              <div class="social-links">
                <img alt="微信二维码" height="120"  width="120" src="http://data.xinxueshuo.cn/nsi/assets/img/wechat_QR.png" />
                <h5 style="font-size: 16px;margin: 20px 0;">微信关注我们</h5>
              </div>
            </div>
            <div class="col-xs-2 col-md-2 col-lg-2 text-center footerh5">
              <div class="title">新学说官网</div>
              <div class="social-links">
                <a href="https://www.xinxueshuo.cn/#/" target="_blank">
                  <img  alt="新学说官网" height="120" width="120" src="http://data.xinxueshuo.cn/nsi/assets/img/www.png" />
                </a>
                <a href="https://www.xinxueshuo.cn/#/" target="_blank"  style="color: #dfd1d1;font-size: 16px;margin-top: 20px;display: inline-block;" >www.xinxueshuo.cn</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </footer>
    <div class="copy-txt">
      <div style="width: 1200px;text-align: center;margin: 0 auto; background: #303c42;">
        <div class="container">
          <div class="row footerH5Fath">
            <div class="col-md-12 set-foot">
              <h5 class="text-center footerH5">
                Copyright © 2017 | 数据来源
                <a href="http://www.xinxueshuo.cn/" target="_blank" title="新学说">新学说</a> All rights reserved.
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.footerBox{
    width: 1200px;
    margin: 0 auto;
    #footer-sec{
        padding: 30px 0px 15px;
        .title{
            font-size: 20px;
            color:#fff;
            span{
                font-size: 16px;
            }
        }
        .content{
            margin-top: 20px;
            font-size: 16px;
            p{
                text-indent: 35px;
                line-height: 30px;
                color:#fff;
            }
            ul{
                li{
                    list-style: none;
                    line-height: 30px;
                    color:#fff;
                }
            }
        }
        .social-links{
            margin-top:25px;
        }
    }
    
}
.schoolBottom {
  background: rgb(33, 79, 137);
  color: #dfd1d1;
}
#hovea {
  color: beige;
}
#hovea:hover {
  color: #777;
}
.copy-txt {
  color: #7c7c7c;
  background: #303c42;
  height: 35px;
  line-height: 35px;
  a{
      color:#fff;
  }
}
.footerH5Fath {
  text-align: center;
}
.footerH5 {
  display: inline;
}
</style>
