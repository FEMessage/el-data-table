export default function(content, vm) {
  return content.map(item => {
    const onInput = item.on && item.on.input

    if (item.component || item.type === 'input') {
      return item
    }

    return Object.assign(item, {
      on: Object.assign({}, item.on, {
        input: (...args) => {
          if (typeof onInput === 'function') {
            onInput.call(item, ...args)

            vm.search()
          }
        }
      })
    })
  })
}
