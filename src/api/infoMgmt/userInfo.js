//平台属性管理模块请求文件
import request from '@/utils/request';

export const reqGetUser = (params) => request({
  url:`user`,
  method:'GET',
  params
})

export const reqAddUser = (data) => request({
  url:`user`,
  method:'POST',
  data
})

export const reqRemoveUser = (params) => request({
  url:`user`,
  method:'DELETE',
  params
})

export const reqUpdateUser = (data) => request({
  url:`user`,
  method:'PUT',
  data
})

export const reqRemoveUsers = (ids) => request({
  url:'users',
  method:'DELETE',
  data:ids
})