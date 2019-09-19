import request from '@/utils/request'
import qs from 'qs'
// 获取书单列表
export function getBookList(params) {
  return request({
    url: '/admin/booklist',
    method: 'get',
    params
  })
}
// 书单上下架
export function bookListShelf(data) {
  return request({
    url: '/admin/booklist/shelf',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 置顶&取消置顶
export function top(data) {
  return request({
    url: '/admin/booklist/top',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 添加书单
export function addBookList(data) {
  
  return request({
    url: '/admin/booklist',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 编辑书单
export function editBookList(params) {
  return request({
    url: '/admin/booklist/edit',
    method: 'get',
    params
  })
}
// 书单相关--输入同伴名，返回同伴
export function booklistCompanion(params) {
  return request({
    url: '/admin/booklist/booklist_companion',
    method: 'get',
    params
  })
}

// 修改书单
export function modifyBookList(data) {
  return request({
    url: '/admin/booklist/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}

// 获取书单分类/分类名（随参数设置变动）
export function booklistType() {
  return request({
    url: '/admin/booklist/booklist_type',
    method: 'get'
  })
}
