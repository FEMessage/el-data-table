import {
  valueSeparator,
  paramSeparator,
  queryFlag,
  transform,
  set,
  get,
  clear
} from '../src/utils/query'

const query = {
  obj: {a: '1', b: 'b&c'},
  str: `a${valueSeparator}1${paramSeparator}b${valueSeparator}b${encodeURIComponent(
    '&'
  )}c`
}
const routerModes = ['history', 'hash']
const locations = (() => {
  const origin = 'https://a.b'
  const search = '?c=1'
  const hash = '#d'
  const q = `${queryFlag}${query.str}${paramSeparator}`
  return [
    {
      href: origin + hash,
      history: origin + `?${q}` + hash,
      hash: origin + hash + `?${q}`
    },
    {
      href: origin + hash + search,
      history: origin + `?${q}` + hash + search,
      hash: origin + hash + search + `&${q}`
    },
    {
      href: origin + search + hash,
      history: origin + search + `&${q}` + hash,
      hash: origin + search + hash + `?${q}`
    },
    {
      href: origin + search + hash + search,
      history: origin + search + `&${q}` + hash + search,
      hash: origin + search + hash + search + `&${q}`
    }
  ]
})()

describe('转换 query 对象到 uri string', () => {
  const {obj, str} = query
  test('默认情况', () => {
    expect(transform(obj)).toBe(str)
  })
  test('自定义 equal & delimiter', () => {
    const equal = '='
    const delimiter = '&'
    const str2 = str
      .replace(RegExp(valueSeparator, 'g'), equal)
      .replace(RegExp(paramSeparator, 'g'), delimiter)
    expect(transform(obj, equal, delimiter)).toBe(str2)
  })
  test('过程可逆', () => {
    expect(transform(transform(obj))).toEqual(obj)
  })
})

describe('保存 query 对象到 url', () => {
  const {obj} = query
  test('默认情况', () => {
    locations.forEach(l => {
      routerModes.forEach(m => {
        expect(set(l.href, obj, m)).toBe(l[m])
      })
    })
  })
  test('多次set仍是幂等操作', () => {
    locations.forEach(l => {
      routerModes.forEach(m => {
        const t = set(l.href, obj, m)
        expect(set(t, obj, m)).toBe(l[m])
      })
    })
  })
  test('替换的情况', () => {
    locations.forEach(l => {
      routerModes.forEach(m => {
        const t = set(l.href, {x: 1}, m)
        expect(set(t, obj, m)).toBe(l[m])
      })
    })
  })
})

describe('从 url 提取 query 对象', () => {
  const {obj} = query
  test('默认情况', () => {
    locations.forEach(l => {
      routerModes.forEach(m => {
        expect(get(set(l.href, obj, m))).toEqual(obj)
      })
    })
  })
})

describe('从 url 清除 query参数', () => {
  const {obj} = query
  test('默认情况', () => {
    locations.forEach(l => {
      routerModes.forEach(m => {
        expect(clear(set(l.href, obj, m))).toBe(l.href)
      })
    })
  })
})
