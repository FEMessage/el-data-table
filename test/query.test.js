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
      result: {
        history: origin + `?${q}` + hash,
        hash: origin + hash + `?${q}`
      }
    },
    {
      href: origin + hash + search,
      result: {
        history: origin + `?${q}` + hash + search,
        hash: origin + hash + search + `&${q}`
      }
    },
    {
      href: origin + search + hash,
      result: {
        history: origin + search + `&${q}` + hash,
        hash: origin + search + hash + `?${q}`
      }
    },
    {
      href: origin + search + hash + search,
      result: {
        history: origin + search + `&${q}` + hash + search,
        hash: origin + search + hash + search + `&${q}`
      }
    }
  ]
})()

describe('测试 transform', () => {
  const {obj, str} = query
  test('转换obj到str', () => {
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
  test('obj通过两次transform之后等于自身', () => {
    expect(transform(transform(obj))).toEqual(obj)
  })
})

describe('测试 set', () => {
  const {obj} = query
  test('通过所有用例', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        expect(set(href, obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
  test('多次set仍是幂等操作', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        const t = set(href, obj, routerMode)
        expect(set(t, obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
  test('url已经有query时会被替换成新的', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        const t = set(href, {x: 1}, routerMode)
        expect(set(t, obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
})

describe('测试 get', () => {
  const {obj} = query
  test('通过所有用例', () => {
    locations.forEach(({href}) => {
      routerModes.forEach(routerMode => {
        expect(get(set(href, obj, routerMode))).toEqual(obj)
      })
    })
  })
})

describe('测试 clear', () => {
  const {obj} = query
  test('通过所有用例', () => {
    locations.forEach(({href}) => {
      routerModes.forEach(routerMode => {
        expect(clear(set(href, obj, routerMode))).toBe(href)
      })
    })
  })
})
