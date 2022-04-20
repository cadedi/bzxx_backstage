//平台属性管理模块请求文件
import request from '@/utils/request';

export const reqGetEnterpriseStd = (params) => request({
  url:`enterprise-standard`,
  method:'GET',
  params
})

export const reqAddEnterpriseStd = (data) => request({
  url:`enterprise-standard`,
  method:'POST',
  data
})

export const reqRemoveEnterpriseStd = (params) => request({
  url:`enterprise-standard`,
  method:'DELETE',
  params
})

export const reqUpdateEnterpriseStd = (data) => request({
  url:`enterprise-standard`,
  method:'PUT',
  data
})