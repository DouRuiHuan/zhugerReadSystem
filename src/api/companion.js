import request from '@/utils/request'
import qs from 'qs'
// 查询同伴列表
export function getCompanion(params) {
  return request({
    url: '/admin/companion',
    method: 'get',
    params
  })
}
// 删除同伴
export function delCompanion(data) {
  return request({
    url: '/admin/companion/' + data.id,
    method: 'delete',
    data: qs.stringify(data)
  })
}
// 编辑查看同伴
export function editCompanion(params) {
  return request({
    url: '/admin/companion/edit?id=' + params.id,
    method: 'get',
    params
  })
}
// 执行修改同伴
export function modifyCompanion(data) {
  return request({
    url: '/admin/companion/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}
// 创建同伴
export function addMap(data) {
  return request({
    url: '/admin/companion',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 同伴组合--获取列表
export function getCombineList(params) {
  return request({
    url: '/admin/combine',
    method: 'get',
    params
  })
}
// 同伴组合--添加新组合
export function addCombine(data) {
  return request({
    url: '/admin/combine',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 同伴组合--删除组合
export function delCombine(data) {
  return request({
    url: '/admin/combine/' + data.id,
    method: 'delete',
    data: qs.stringify(data)
  })
}
// 同伴组合--编辑组合
export function checkCombine(params) {
  return request({
    url: '/admin/combine/edit',
    method: 'get',
    params
  })
}
// 同伴组合--修改组合
export function modifyCombine(data) {
  return request({
    url: '/admin/combine/' + data.combine_id,
    method: 'put',
    data: qs.stringify(data)
  })
}

