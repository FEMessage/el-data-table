export default ($slots, name) => {
  const keys = Object.keys($slots)
  return keys.filter(key => key.indexOf(name) > -1)
}
