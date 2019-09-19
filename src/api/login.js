import request from "@/utils/request";
import qs from "qs";
// 登录
export function login(data) {
  return request({
    url: "/admin/user/login",
    method: "post",
    data: qs.stringify(data)
  });
}

export function getInfo(token) {
  return request({
    url: "/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/admin/user/login_out",
    method: "get"
  });
}
export function changePassword(data) {
  return request({
    url: "/admin/user/change_password",
    method: "put",
    data: qs.stringify(data)
  });
}
