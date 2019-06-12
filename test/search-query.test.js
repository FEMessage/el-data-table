import {
  valueSeparator,
  paramSeparator,
  queryFlag,
  transformQuery,
  store,
  retrieve,
  clear
} from '../src/utils/search-query'

const query = {a: '1', b: 'b&c'}
const queryStr = `a${valueSeparator}1${paramSeparator}b${valueSeparator}b%26c`
const url = 'https://hello.world/?a=1'
const urlHash = `${url}#/`

describe('转换 query 对象到 uri string', () => {
  test('默认情况', () => {
    expect(transformQuery(query)).toBe('a=1&b=b%26c')
  })
  test('自定义 equal & delimiter', () => {
    expect(transformQuery(query, valueSeparator, paramSeparator)).toBe(queryStr)
  })
})

describe('保存 query 对象到 url', () => {
  const newUrl = store(url, query)
  test('默认情况', () => {
    expect(newUrl).toBe(`${url}&${queryFlag}${queryStr},`)
  })
  test('多次store仍是幂等操作', () => {
    expect(store(newUrl, query)).toBe(newUrl)
  })
  test('替换的情况', () => {
    expect(store(newUrl, {c: 'c'})).toBe(
      `${url}&${queryFlag}c${valueSeparator}c,`
    )
  })
  test('有hash的url', () => {
    expect(store(urlHash, query)).toBe(`${urlHash}?${queryFlag}${queryStr},`)
  })
})

describe('从 url 提取 query 对象', () => {
  test('无hash的url', () => {
    expect(retrieve(store(url, query))).toEqual(query)
  })
  test('有hash的url', () => {
    expect(retrieve(store(urlHash, query))).toEqual(query)
  })
})

describe('从 url 清除 query参数', () => {
  test('无hash的url', () => {
    expect(clear(store(url, query))).toEqual(url)
  })
  test('有hash的url', () => {
    expect(clear(store(urlHash, query))).toEqual(urlHash)
  })
})
