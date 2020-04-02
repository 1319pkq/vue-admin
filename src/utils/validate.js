// 验证过滤特殊字符
export function stripscript(str) {
  var pattern = new RegExp("[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var result = "";
  for (var i = 0; i < str.length; i++) {
    result = result + str.substr(i, 1).replace(pattern, '');
  }
  return result;
}

/**
 * 没有使用export default导出时,可以同时声明多个export
 * 文件import需要使用花括号导入
 */
