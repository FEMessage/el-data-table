import extractKeys from '../src/utils/extract-keys'

const slotsObj = {
  search: '',
  'search:name': '',
  'search:cute': ''
}

test('提取指定 key `search:`', () => {
  expect(
    extractKeys(slotsObj, 'search:')
  ).toEqual(['search:name', 'search:cute'])
})

test('提取符合全部 key `search`', () => {
  expect(
    extractKeys(slotsObj, 'search')
  ).toEqual(['search', 'search:name', 'search:cute'])
})

test('提取不存在的 key', () => {
  expect(
    extractKeys(slotsObj, 'form')
  ).toEqual([])
})
