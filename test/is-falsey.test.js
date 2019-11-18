import isFalsey from '../src/utils/is-falsey'

describe('test isFalsey', () => {
  test('判断为 "",undefined或者 null', () => {
    expect(isFalsey(undefined)).toBe(true)
    expect(isFalsey(null)).toBe(true)
    expect(isFalsey('')).toBe(true)
    expect(isFalsey()).toBe(true)
    expect(isFalsey(0)).toBe(false)
    expect(isFalsey({})).toBe(false)
    expect(isFalsey([])).toBe(false)
  })
})
