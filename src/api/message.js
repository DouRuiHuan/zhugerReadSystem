import request from "@/utils/request";
import qs from "qs";
// 新增列表
export function getMessageList(data) {
  return request({
    url: "/admin/system-messages",
    method: "get",
    params: data
  });
}
// 获取跳转分类参数
export function getJumpType() {
  return request({
    url: "/admin/system-messages/jump_type",
    method: "get"
  });
}
// 新增消息
export function addMessage(data) {
  return request({
    url: "/admin/system-messages",
    method: "post",
    data: qs.stringify(data)
  });
}
// 系统消息开关
export function setSwitch(data) {
  return request({
    url: "/admin/system-messages/switch",
    method: "post",
    data: qs.stringify(data)
  });
}
// 获取消息开关状态
export function getSwitch() {
  return request({
    url: "/admin/system-messages/state",
    method: "get"
  });
}
