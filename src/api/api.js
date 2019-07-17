import {get, post } from '@/api/http'

//国际学校库 学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
    //国际学校库首页 学校搜索
export const getSchoolHomeSearch = p => get('/school/suggest_search.do', p)
    //国际学校库 学校详情页面
export const getSchoolDeatail = p => get('/new/school/detail.do', p)
    //国际学校库首页 行业动态
export const getSchoolHomeInquiry = p => get('/article/list.do', p)
    //国际学校首页 学校城市切换
export const getSchoolCity = p => get('/new/school/list.do', p)
    //微信绑定
export const wechatBind = p => get('/user/WechatBinding.do', p)
    //手机号注册
export const register = p => post('/user/phoneRegister.do', p)
    //验证是否注册过
export const isRegister = p => post('/user/UserMailCheck.do', p)
    //获取验证码
export const getVerifyCode = p => post('/CommonApi/sendSms.do', p)
    //验证短信验证码
export const checkVerifyCode = p => post('/CommonApi/check_code.do', p)
    //手机号登录
export const login = p => post('/user/login.do', p)
    //获取二维码
export const getQrcode = p => post('/user/get_qrcode.do', p)
    //微信扫码登录轮询
export const getCheckLogin = p => get('/user/get_check_login.do', p)
    //微信Id登录
export const weChatLogin = p => get('/user/WechatLogin.do', p)
    //验证是否上传头像
export const CheckImg = p => post('/manager/talent/upload.do', p)