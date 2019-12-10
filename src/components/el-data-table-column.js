const defaultAttrs = {
  align: 'center'
}
export default {
  name: 'el-data-table-column',
  functional: true,
  render(h, {data, props}) {
    let children = []
    if (props.columns) {
      children = props.columns.map(column =>
        h('el-data-table-column', {
          props: Object.assign({}, defaultAttrs, column)
        })
      )
    }
    data.props = {
      ...defaultAttrs,
      ...data.props
    }
    return h('el-table-column', data, children)
  }
}
