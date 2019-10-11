export default function(content, vm) {
  return content.map(item => {
    const origOnInput = item.on && item.on.input

    if (item.type === 'input') {
      return item
    }

    return Object.assign(item, {
      on: Object.assign({}, item.on, {
        input: (...args) => {
          if (typeof origOnInput === 'function') {
            origOnInput.call(item, ...args)
          }
          vm.search()
        }
      })
    })
  })
}
