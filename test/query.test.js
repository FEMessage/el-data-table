import {
  valueSeparator,
  paramSeparator,
  paramInnerSeparator,
  queryFlag,
  stringify,
  parse,
  set,
  get,
  clear
} from '../src/utils/query'

const query = {
  obj: {a: '1', b: 'b&c', d: ['1', '2', '3']},
  str(
    equal = valueSeparator,
    delimiter = paramSeparator,
    arrayDelimiter = paramInnerSeparator
  ) {
    return [
      `a${equal}${encodeURIComponent(JSON.stringify('1'))}`,
      `b${equal}${encodeURIComponent(JSON.stringify('b&c'))}`,
      `d${equal}${encodeURIComponent(
        JSON.stringify(['1', '2', '3'])
          .split(',')
          .join(arrayDelimiter)
      )}`
    ].join(`${delimiter}`)
  }
}

const routerModes = ['history', 'hash']
const locations = (() => {
  const origin = 'https://a.b'
  const search = '?c=1'
  const hash = '#d'
  const q = `${queryFlag}${query.str()}${paramSeparator}`
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

describe('测试 stringify', () => {
  test('基本功能', () => {
    expect(stringify(query.obj)).toBe(query.str())
  })
  test('自定义 equal & delimiter & arrayDelimiter', () => {
    const equal = '='
    const delimiter = '&'
    const arrayDelimiter = '$'
    const str = query.str(equal, delimiter, arrayDelimiter)
    expect(stringify(query.obj, equal, delimiter, arrayDelimiter)).toBe(str)
  })
})

describe('测试 parse', () => {
  test('基本功能', () => {
    expect(parse(query.str())).toEqual(query.obj)
  })
  test('自定义 equal & delimiter', () => {
    const equal = '='
    const delimiter = '&'
    const str = query.str(equal, delimiter)
    expect(parse(str, equal, delimiter)).toEqual(query.obj)
  })
})

describe('测试 set', () => {
  test('通过所有用例', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        expect(set(href, query.obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
  test('多次set仍是幂等操作', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        const t = set(href, query.obj, routerMode)
        expect(set(t, query.obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
  test('url已经有query时会被替换成新的', () => {
    locations.forEach(({href, result}) => {
      routerModes.forEach(routerMode => {
        const t = set(href, {x: 1}, routerMode)
        expect(set(t, query.obj, routerMode)).toBe(result[routerMode])
      })
    })
  })
})

describe('测试 get', () => {
  test('通过所有用例', () => {
    locations.forEach(({href}) => {
      routerModes.forEach(routerMode => {
        expect(get(set(href, query.obj, routerMode))).toEqual(query.obj)
      })
    })
  })
})

describe('测试 clear', () => {
  test('通过所有用例', () => {
    locations.forEach(({href}) => {
      routerModes.forEach(routerMode => {
        expect(clear(set(href, query.obj, routerMode))).toBe(href)
      })
    })
  })
})
