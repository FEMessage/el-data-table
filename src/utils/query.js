export const valueSeparator = '~'
export const paramSeparator = ','
export const queryFlag = 'q='
export const queryPattern = new RegExp(queryFlag + '.*' + paramSeparator)

/**
 * 转换query对象成可附在url上的字符串
 * 如果传入字符串则转换回对象
 * {a: 'a&b', b: true} <=> 'a~a%26b,b~true'
 *
 * @param {string|object} query
 * @param {string} equal - 键和值的分隔符
 * @param {string} delimiter - 键值对之间的分隔符
 * @return {object|string}
 */
export function transform(
  query,
  equal = valueSeparator,
  delimiter = paramSeparator
) {
  if (typeof query === 'object') {
    return Object.keys(query)
      .map(k => `${k}${equal}${encodeURIComponent(query[k])}`)
      .join(delimiter)
  } else {
    return query
      .split(delimiter)
      .map(param => param.split(equal))
      .reduce((obj, [k, v]) => {
        obj[k] = decodeURIComponent(v)
        return obj
      }, {})
  }
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
  const queryStr = queryFlag + transform(query) + paramSeparator
  const includes = (str, p) => str.indexOf(p) > -1
  const getSep = str => (includes(str, '?') ? '&' : '?')

  if (queryPattern.test(url)) {
    return url.replace(queryPattern, queryStr)
  } else if (includes(url, '#')) {
    const [path, hash] = url.split('#')
    if (routerMode === 'history') {
      return path + getSep(path) + queryStr + '#' + hash
    } else {
      return url + getSep(hash) + queryStr
    }
  } else {
    return url + getSep(url) + queryStr
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
  return transform(queryStr)
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
