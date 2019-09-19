import request from '@/utils/request'
import qs from 'qs'
// 获取兑换活动详情
export function getList(params) {
  return request({
    url: '/admin/activities',
    method: 'get',
    params
  })
}
// 兑换码生成
export function addRedeemCode(data) {
  return request({
    url: '/admin/activities',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 根据书籍名获取book_id
export function getBookId(params) {
  return request({
    url: '/admin/activities/bid',
    method: 'get',
    params
  })
}
// 获取兑换活动详情
export function checkRedeemCode(data) {
  return request({
    url: '/admin/activities/' + data.id,
    method: 'get',
    data: qs.stringify(data)
  })
}
// 删除兑换活动
export function deleteRedeemCode(data) {
  return request({
    url: '/admin/activities/' + data.id,
    method: 'delete',
    data: qs.stringify(data)
  })
}
