export const valueSeparator = '~'
export const paramSeparator = ','
export const queryFlag = 'q='
export const queryPattern = new RegExp(queryFlag + '.*' + paramSeparator)

/**
 * 转换query对象成可附在url上的字符串
 * {a: 'a&b', b: true} => 'a=a%26b&b=true'
 *
 * @param {*} query
 * @param {string} [equal='=']
 * @param {string} [delimiter='&']
 */
export function transformQuery(query, equal = '=', delimiter = '&') {
  return Object.keys(query)
    .map(k => `${k}${equal}${encodeURIComponent(('' + query[k]).trim())}`)
    .join(delimiter)
}

/**
 * 将query对象保存到url上
 *
 * @param {string} url
 * @param {object} query
 * @returns {string} 添加了query的url
 */
export function store(url, query) {
  const queryStr =
    queryFlag +
    transformQuery(query, valueSeparator, paramSeparator) +
    paramSeparator

  if (queryPattern.test(url)) {
    return url.replace(queryPattern, queryStr)
  } else if (url.includes('#')) {
    const [, hash] = url.split('#')
    return url + (hash.includes('?') ? '&' : '?') + queryStr
  } else {
    return url + (url.includes('?') ? '&' : '?') + queryStr
  }
}

/**
 * 从url中取出query对象，如果没有，返回null
 * 基本是store的逆过程
 *
 * @param {string} url
 * @return {object|null} 对象类型的query参数
 */
export function retrieve(url) {
  const found = url.match(queryPattern)
  if (!found) return null
  return found[0]
    .replace(queryFlag, '')
    .slice(0, -1) // 移除末尾的paramSeparator
    .split(paramSeparator)
    .map(t => t.split(valueSeparator))
    .reduce((obj, [k, v]) => {
      obj[k] = decodeURIComponent(v)
      return obj
    }, {})
}

/**
 * 从url中移除(?||&)queryPattern
 * @param {string} url
 */
export function clear(url) {
  if (queryPattern.test(url)) {
    return url.replace(queryPattern, '').slice(0, -1)
  } else {
    return url
  }
}
