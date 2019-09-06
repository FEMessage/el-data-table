import extractKeys from '../src/utils/extract-keys'

const store = {
  search: '',
  'search:name': '',
  'search:cute': ''
}

test('提取指定 key `search:`', () => {
  expect(
    extractKeys(store, 'search:')
  ).toEqual(['search:name', 'search:cute'])
})

test('提取符合全部 key `search`', () => {
  expect(
    extractKeys(store, 'search')
  ).toEqual(['search', 'search:name', 'search:cute'])
})

test('提取不存在的 key', () => {
  expect(
    extractKeys(store, 'form')
  ).toEqual([])
})
