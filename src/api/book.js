import request from "@/utils/request";
import qs from "qs";
// 添加书籍
export function addBook(data) {
  return request({
    url: "/admin/book",
    method: "post",
    data: qs.stringify(data)
  });
}
// 添加书籍--获取兴趣列表
export function getInterestList(params) {
  return request({
    url: "/admin/book/search_interest",
    method: "get",
    params
  });
}
// 添加书籍-获取同伴列表
export function handleCompanion(params) {
  return request({
    url: "/admin/book/search_companion",
    method: "get",
    params
  });
}
// 获取书籍列表
export function getBookList(params) {
  return request({
    url: "/admin/book",
    method: "get",
    params
  });
}
// 编辑查看书籍列表详情
export function getBookDetail(params) {
  return request({
    url: "/admin/book/edit",
    method: "get",
    params
  });
}
// 修改书籍列表详情
export function modifyBookDetail(data) {
  return request({
    url: "/admin/book/" + data.id,
    method: "put",
    data: qs.stringify(data)
  });
}
// 书籍上下架
export function shelf(data) {
  return request({
    url: "admin/book/shelf",
    method: "post",
    data: qs.stringify(data)
  });
}

//
export function getChips(params) {
  
  return request({
    url: "/admin/book/checkpiont_companion",
    method: "get",
    params
  });
}
// 获取关卡列表
export function getStageList(params) {
  return request({
    url: "/admin/book/checkpoint_list",
    method: "get",
    params
  });
}
// 删除关卡
export function delCheckpoint(data) {
  return request({
    url: "/admin/book/delete_checkpoint?id=" + data.id,
    method: "delete",
    data: qs.stringify(data)
  });
}
// 获取未分类关卡列表
export function getUnclassifiedList(params) {
  return request({
    url: "/admin/book/unclassified_checkpoint",
    method: "get",
    params
  });
}
// 新增关卡
export function addCheckpoint(data) {
  return request({
    url: "/admin/book/create_checkpoint",
    method: "post",
    data: qs.stringify(data)
  });
}
// 编辑查看关卡
export function editCheckpoint(params) {
  return request({
    url: "/admin/book/edit_checkpoint",
    method: "get",
    params
  });
}
// 修改关卡
export function modifyCheckpoint(data) {
  return request({
    url: "/admin/book/update_checkpoint",
    method: "put",
    data: qs.stringify(data)
  });
}

// 获取书章列表
export function getChapterList(params) {
  return request({
    url: "/admin/book/chapter_list",
    method: "get",
    params
  });
}
// 删除书章
export function deleteChapter(data) {
  return request({
    url: "/admin/book/delete_chapter?id=" + data.id,
    method: "delete",
    data: qs.stringify(data)
  });
}

// 创建章节
export function addNewChapter(data) {
  return request({
    url: "/admin/book/create_chapter",
    method: "post",
    data: qs.stringify(data)
  });
}
// 编辑查看章节
export function editChapter(params) {
  return request({
    url: "/admin/book/edit_chapter",
    method: "get",
    params
  });
}
// 修改章节
export function modifyChapter(data) {
  return request({
    url: "/admin/book/update_chapter",
    method: "put",
    data: qs.stringify(data)
  });
}
// 获取宝箱id
export function getStoryidList(params) {
  return request({
    url: "/admin/book/get_storyid_list",
    method: "get",
    params
  });
}
// 获取书籍
export function getBooks(data) {
  return request({
    url: "/admin/preview/allbooks",
    method: "get",
    params: data
  });
}
// 获取书籍下的所有关卡
export function getpoints(data) {
  return request({
    url: "/admin/preview/allcheckpoints",
    method: "get",
    params: data
  });
}
// 获取关卡内容
export function getPointContent(data) {
  return request({
    url: "/admin/preview",
    method: "get",
    params: data
  });
}
