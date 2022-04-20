//平台属性管理模块请求文件
import request from '@/utils/request';

export const reqGetNationalStd = (params) => request({
  url:`national-standard`,
  method:'GET',
  params
})

export const reqAddNationalStd = (data) => request({
  url:`national-standard`,
  method:'POST',
  data
})

export const reqRemoveNationalStd = (params) => request({
  url:`national-standard`,
  method:'DELETE',
  params
})

export const reqUpdateNationalStd = (data) => request({
  url:`national-standard`,
  method:'PUT',
  data
})