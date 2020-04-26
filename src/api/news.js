import service from "@/utils/request";
/**
 * 列表
 */

 /**
 * 新增
 */

 /**
 * 编辑
 */

 /**
 * 删除
 */
export function DeleteCategory(data) {
  // axios请求
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data: data
  })
}

 /**
 * 一级分类添加
 */
export function AddFirstCategory(data) {
  // axios请求
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data: data
  })
}

/**
 * 获取信息分类
 */
export function GetCategory(data) {
  // axios请求
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data: data
  })
}
