import request from '@/utils/request'
// 上传
export function qiniuToken() {
  return request({
    url: '/admin/qiniu/token',
    method: 'get'
  })
}
