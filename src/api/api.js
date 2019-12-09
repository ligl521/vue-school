import {get, post } from '@/api/http'

//国际学校库 学校列表
export const getSchoolLibrary = p => get('/new/school/list.do', p)
    //国际学校库首页 学校搜索
export const getSchoolHomeSearch = p => get('/school/suggest_search.do', p)
    //国际学校库列表页 高级搜索
export const getadvancedSearch = p => get('/new/school/power_search_list.do', p)
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
    //申请访校
export const visitSchool = p => post('/visit/school/save.do', p)
    //机构列表
export const companyList = p => get('/institution/list.do', p)
    // 机构智能搜索
export const suggestSearch = p => get('/institution/suggest_search.do', p)
    // 机构详情
export const companyDetail = p => get('/institution/detail.do', p)
    // 同城学校
export const citySchool = p => get('/new/school/find_city_wide.do', p)
    //四库全书-数据关联
export const relation = p => get('/Relation/search.do', p)
    //用户IP地址查询定位
export const CommonApi = p => post('/CommonApi/ipToLocation.do', p)
    //人才库列表 
export const talentlist = p => get('/manager/talent/list.do', p)
    //人才库详情 
export const talentdetail = p => get('/manager/talent/detail.do', p)