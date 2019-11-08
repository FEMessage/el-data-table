import needToGoPrev from '../src/utils/need-to-go-prev'

test('未删到空', () => {
  const remain = 1
  expect(needToGoPrev(remain)).toBe(false)
})

test('删到空，但不是最后一页', () => {
  const remain = 0
  const page = 1
  const size = 10
  const total = 11
  expect(needToGoPrev(remain, page, size, total)).toBe(false)
})

test('删到空，是最后一页，但也是第一页', () => {
  const remain = 0
  const page = 1
  const size = 10
  const total = 10
  expect(needToGoPrev(remain, page, size, total)).toBe(false)
})

test('删到空，是最后一页，且不是第一页', () => {
  const remain = 0
  const page = 2
  const size = 10
  const total = 11
  expect(needToGoPrev(remain, page, size, total)).toBe(true)
})
