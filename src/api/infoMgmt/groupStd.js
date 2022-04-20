//平台属性管理模块请求文件
import request from '@/utils/request';

export const reqGetGroupStd = (params) => request({
  url:`group-standard`,
  method:'GET',
  params
})

export const reqAddGroupStd = (data) => request({
  url:`group-standard`,
  method:'POST',
  data
})

export const reqRemoveGroupStd = (params) => request({
  url:`group-standard`,
  method:'DELETE',
  params
})

export const reqUpdateGroupStd = (data) => request({
  url:`group-standard`,
  method:'PUT',
  data
})