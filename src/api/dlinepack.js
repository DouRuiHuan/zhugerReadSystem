
// 离线打包的数据
import request from '@/utils/request'
import qs from 'qs'

// 获取初始的数据
export function getBulidList(params) {
  return request({
    url: '/admin/zip',
    method: 'get',
    params
  })
}

// 打包
export function getBulid(data) {
  return request({
    url: '/admin/zip',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 关闭下载
export function closeDownLoad(data) {
  return request({
    url: '/admin/zip/' + data.id,
    method: 'put',
    data: qs.stringify(data)
  })
}
