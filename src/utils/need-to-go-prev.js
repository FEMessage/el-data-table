/**
 * 判断是否要回到前一页
 *
 * @param {number} remain - 当前页剩余数据条数
 * @param {number} page - 当前页码
 * @param {number} size - 每页容量
 * @param {number} total - 总共的数据条数
 */
export default function(remain, page, size, total) {
  return remain === 0 && page === Math.ceil(total / size) && page > 1
}
