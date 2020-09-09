export const isFalsey = value => [undefined, null].includes(value)

export const dealQuery = query =>
  Object.keys(query)
    .filter(k => {
      const value = query[k]
      return Array.isArray(value)
        ? value.length !== 0
        : !['', undefined, null].includes(value)
    })
    .reduce((obj, k) => ((obj[k] = query[k]), obj), {})
