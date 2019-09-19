import request from '@/utils/request'
import qs from 'qs'
// 内容设置(提交设置)
export function contentSetting(data) {
  return request({
    url: '/admin/parameter/content_setting',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 内容设置(获取设置)
export function getContentSetting(params) {
  return request({
    url: '/admin/parameter/content_setting',
    method: 'get',
    params
  })
}
// 基础设置(获取设置)
export function getBasicSetting(params) {
  return request({
    url: '/admin/parameter/basic_setting',
    method: 'get',
    params
  })
}
// 基础设置(提交设置)
export function basicSetting(data) {
  return request({
    url: '/admin/parameter/basic_setting',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 通关设置(获取设置)
export function getPassSetting(params) {
  return request({
    url: '/admin/parameter/pass_setting',
    method: 'get',
    params
  })
}
// 通过设置(提交设置)
export function passSetting(data) {
  return request({
    url: '/admin/parameter/pass_setting',
    method: 'post',
    data: qs.stringify(data)
  })
}
