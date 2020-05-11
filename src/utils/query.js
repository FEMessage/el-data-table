export const valueSeparator = '~'
export const paramSeparator = ','
export const paramInnerSeparator = '|'
export const queryFlag = 'q='
export const queryPattern = new RegExp(queryFlag + '.*' + paramSeparator)

/**
 * 在浏览器地址栏的 URL 需要做额外处理：兼容持久化数组
 * 直接将数组 encode 时，数组[1,2]会先转成'1,2'再 encode 成 '1%2C2'。但 vue-router 会自动转义 url 参数，导致数组的 ',' 无法和键值对分隔符 ',' 区分开。解决方法：改变数组的分隔符
 * {a: 'a&b', b: true, d: [1,2,3]} => 'a~a%26b,b~true,d~%5B1%7C2%7C3%5D'
 * @param {object} query
 * @param {string} equal - 键和值的分隔符
 * @param {string} delimiter - 键值对之间的分隔符
 * @param {string} arrayDelimiter - 数组项之间的分隔符
 * @return {string}
 */
export function stringify(
  query,
  equal = valueSeparator,
  delimiter = paramSeparator,
  arrayDelimiter = paramInnerSeparator
) {
  return Object.keys(query)
    .map(k => {
      // 数组即便 encode 也会被自动转义，使用别的分割符
      const v = JSON.stringify(query[k])
        .split(',')
        .join(arrayDelimiter)
      return `${k}${equal}${encodeURIComponent(v)}`
    })
    .join(delimiter)
}

/**
 * 转换附在url上的字符串成query对象
 * qs.parse只能自定义delimiter，不能自定义equal
 * 'a~a%26b,b~true' => {a: 'a&b', b: true}
 *
 * @param {string} query
 * @param {string} equal - 键和值的分隔符
 * @param {string} delimiter - 键值对之间的分隔符
 * @return {object}
 */
export function parse(
  query,
  equal = valueSeparator,
  delimiter = paramSeparator,
  arrayDelimiter = paramInnerSeparator
) {
  return query
    .split(delimiter)
    .map(param => param.split(equal))
    .reduce((obj, [k, v]) => {
      // 替换回逗号
      const value = decodeURIComponent(v)
        .split(arrayDelimiter)
        .join(',')
      obj[k] = JSON.parse(value)
      return obj
    }, {})
}

/**
 * 将query对象转换成str插入到url上
 *
 * @param {string} url
 * @param {object} query
 * @param {'history'|'hash'} routerMode
 * @returns {string} 插入了query的url
 */
export function set(url, query, routerMode) {
  const queryStr = queryFlag + stringify(query) + paramSeparator
  const queryPrefix = str => (str.indexOf('?') > -1 ? '&' : '?')

  if (queryPattern.test(url)) {
    return url.replace(queryPattern, queryStr)
  } else if (url.indexOf('#') === -1) {
    return url + queryPrefix(url) + queryStr
  } else {
    const [path, hash] = url.split('#')
    if (routerMode === 'history') {
      return path + queryPrefix(path) + queryStr + '#' + hash
    } else {
      return url + queryPrefix(hash) + queryStr
    }
  }
}

/**
 * 从url中取出query对象，如果没有，返回null
 *
 * @param {string} url
 * @return {object|null} 对象类型的query参数
 */
export function get(url) {
  const found = url.match(queryPattern)
  if (!found) return null
  const queryStr = found[0].replace(queryFlag, '').slice(0, -1) // 移除末尾的paramSeparator
  return parse(queryStr)
}

/**
 * 从url中移除(?||&)queryPattern
 * @param {string} url
 */
export function clear(url) {
  if (queryPattern.test(url)) {
    const replacePattern = RegExp('[?&]' + queryPattern.source)
    return url.replace(replacePattern, '')
  } else {
    return url
  }
}
