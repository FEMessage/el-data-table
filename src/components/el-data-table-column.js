export default {
  name: 'el-data-table-column',
  functional: true,
  render(h, {data, props}) {
    let children = []
    if (props.columns) {
      children = props.columns.map(column =>
        h('el-data-table-column', {
          props: column
        })
      )
    }
    return h('el-table-column', data, children)
  }
}
