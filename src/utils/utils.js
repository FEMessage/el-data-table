export const isFalsey = value =>
  ['', undefined, null].indexOf(value) > -1 ||
  (Array.isArray(value) && value.length === 0)

export const removeEmptyKeys = query =>
  Object.keys(query)
    .filter(k => {
      const value = query[k]
      return Array.isArray(value)
        ? value.length !== 0
        : !['', undefined, null].includes(value)
    })
    .reduce((obj, k) => ((obj[k] = query[k]), obj), {})
