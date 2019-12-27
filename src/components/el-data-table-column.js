export default {
  name: 'el-data-table-column',
  functional: true,
  render(h, {data, props}) {
    let children = []
    const align = props.align
    if (props.columns) {
      children = props.columns.map(column =>
        h('el-data-table-column', {
          props: Object.assign({}, {align}, column)
        })
      )
    }
    data.props = {
      ...data.props
    }
    return h('el-table-column', data, children)
  }
}
