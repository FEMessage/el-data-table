import {
  valueSeparator,
  paramSeparator,
  queryFlag,
  transformQuery,
  store,
  retrieve,
  clear
} from '../src/utils/search-query'

const query = {
  obj: {a: '1', b: 'b&c'},
  str: `a${valueSeparator}1${paramSeparator}b${valueSeparator}b${encodeURIComponent(
    '&'
  )}c`
}
const location = {
  origin: 'https://hello.world',
  search: '?a=1',
  hash: '#/',
  get hrefs() {
    const {origin, search, hash} = this
    return [
      origin,
      `${origin}${hash}`,
      `${origin}${hash}${search}`,
      `${origin}${search}`,
      `${origin}${search}${hash}`,
      `${origin}${search}${hash}${search}`
    ]
  },
  seps: ['?', '?', '&', '&', '?', '&'],
  get store() {
    const {hrefs} = this
    const {str} = query
    return this.seps.map(
      (sep, i) => `${hrefs[i]}${sep}${queryFlag}${str}${paramSeparator}`
    )
  }
}

describe('转换 query 对象到 uri string', () => {
  const {obj, str} = query
  test('默认情况', () => {
    expect(transformQuery(obj)).toBe(str)
  })
  test('自定义 equal & delimiter', () => {
    const equal = '='
    const delimiter = '&'
    const str2 = str
      .replace(RegExp(valueSeparator, 'g'), equal)
      .replace(RegExp(paramSeparator, 'g'), delimiter)
    expect(transformQuery(obj, equal, delimiter)).toBe(str2)
  })
  test('过程可逆', () => {
    expect(transformQuery(transformQuery(obj))).toEqual(obj)
  })
})

describe('保存 query 对象到 url', () => {
  test('默认情况', () => {
    location.hrefs.forEach((href, i) => {
      expect(store(href, query.obj)).toBe(location.store[i])
    })
  })
  test('多次store仍是幂等操作', () => {
    location.hrefs.forEach((href, i) => {
      const {obj} = query
      expect(store(store(href, obj), obj)).toBe(location.store[i])
    })
  })
  test('替换的情况', () => {
    location.hrefs.forEach((href, i) => {
      const hrefStore = store(href, {x: 1})
      expect(store(hrefStore, query.obj)).toBe(location.store[i])
    })
  })
})

describe('从 url 提取 query 对象', () => {
  test('默认情况', () => {
    location.hrefs.forEach(href => {
      expect(retrieve(store(href, query.obj))).toEqual(query.obj)
    })
  })
})

describe('从 url 清除 query参数', () => {
  test('默认情况', () => {
    location.hrefs.forEach(href => {
      expect(clear(store(href, query.obj))).toEqual(href)
    })
  })
})
