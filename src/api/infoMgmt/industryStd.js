//平台属性管理模块请求文件
import request from '@/utils/request';

export const reqGetIndustryStd = (params) => request({
  url:`industry-standard`,
  method:'GET',
  params
})

export const reqAddIndustryStd = (data) => request({
  url:`industry-standard`,
  method:'POST',
  data
})

export const reqRemoveIndustryStd = (params) => request({
  url:`industry-standard`,
  method:'DELETE',
  params
})

export const reqUpdateIndustryStd = (data) => request({
  url:`industry-standard`,
  method:'PUT',
  data
})