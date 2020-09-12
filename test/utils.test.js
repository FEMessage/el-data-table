import {isFalsey, removeEmptyKeys} from '../src/utils/utils'

describe('test isFalsey', () => {
  test('判断为 "",undefined或者 null', () => {
    expect(isFalsey(undefined)).toBe(true)
    expect(isFalsey(null)).toBe(true)
    expect(isFalsey('')).toBe(true)
    expect(isFalsey()).toBe(true)
    expect(isFalsey(0)).toBe(false)
    expect(isFalsey({})).toBe(false)
    expect(isFalsey([])).toBe(true)
  })
})

describe('test removeEmptyKeys', () => {
  test('判断 "", undefined, null, 空数组', () => {
    expect(
      removeEmptyKeys({
        a: 1,
        b: '',
        c: undefined,
        d: null,
        e: [],
        f: [2]
      })
    ).toStrictEqual({a: 1, f: [2]})
  })
})
