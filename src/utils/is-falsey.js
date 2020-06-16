export default value =>
  ['', undefined, null].indexOf(value) > -1 ||
  (Array.isArray(value) && value.length === 0)
