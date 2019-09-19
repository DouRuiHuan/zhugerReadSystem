/*
 * 配置编译环境和线上环境之间的切换
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * DEBUG: debug状态
 * cancleHTTP: 取消请求头设置
 */
var baseUrl = ''
var routerMode = 'history'
var DEBUG = false
var cancleHTTP = []

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://admin.test.gamereading.com'
  DEBUG = true
} else if (process.env.NODE_ENV === 'testing') {
  baseUrl = 'http://www.bbb.com'
  DEBUG = false
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://admin.test.gamereading.com'
  DEBUG = false
}
export {
  baseUrl,
  routerMode,
  DEBUG,
  cancleHTTP
}
