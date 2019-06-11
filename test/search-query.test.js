import {transformQuery, store, retrieve, clear} from '../src/utils/search-query'

const query = {a: '1', b: 'b&c'}
const queryStr = 'a~1,b~b%26c'
const url = 'https://hello.world/?a=1'
const urlHash = `${url}#/`

test('transform query to str', () => {
  expect(transformQuery(query)).toBe('a=1&b=b%26c')
  expect(transformQuery(query, '~', ',')).toBe(queryStr)
})

test('store query into url', () => {
  const newUrl = store(url, query)
  expect(newUrl).toBe(`${url}&q=${queryStr},`)
  expect(store(newUrl, query)).toBe(newUrl)
  expect(store(newUrl, {c: 'c'})).toBe(`${url}&q=c~c,`)
  expect(store(urlHash, query)).toBe(`${urlHash}?q=${queryStr},`)
})

test('retrieve query from url', () => {
  expect(retrieve(store(url, query))).toEqual(query)
})

test('clear url', () => {
  expect(clear(store(url, query))).toEqual(url)
  expect(clear(store(urlHash, query))).toEqual(urlHash)
})
