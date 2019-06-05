import {get, post } from '@/api/http'

//国际学校库 学校列表
export const getSchoolLibrary = p => get('/school/list.do', p)
//国际学校库 学校详情页面
export const getSchoolDeatail = p => get('/new/school/detail.do', p)
