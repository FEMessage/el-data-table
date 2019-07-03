import getSelectStrategy from '../src/utils/select-strategy'

const elDataTableMock = {
  persistSelection: true,
  selected: [],
  data: [{id: 1}, {id: 2}],
  id: 'id',
  $refs: {
    table: {
      toggleRowSelection() {
        return "calling el-table's toggleRowSelection"
      },
      clearSelection() {
        return "calling el-table's clearSelection"
      }
    }
  },
  get selectStrategy() {
    return getSelectStrategy(this)
  },
  toggleRowSelection(...args) {
    return this.selectStrategy.toggleRowSelection(...args)
  },
  clearSelection() {
    return this.selectStrategy.clearSelection()
  }
}

describe('测试 normal 模式', () => {
  beforeAll(() => {
    elDataTableMock.persistSelection = false
  })

  test('onSelectionChange', () => {
    const selected = [elDataTableMock.data[0]]
    elDataTableMock.selectStrategy.onSelectionChange(selected)
    expect(elDataTableMock.selected).toBe(selected)
  })
  test('toggleRowSelection', () => {
    expect(elDataTableMock.toggleRowSelection()).toBe(
      elDataTableMock.$refs.table.toggleRowSelection()
    )
  })
  test('clearSelection', () => {
    expect(elDataTableMock.clearSelection()).toBe(
      elDataTableMock.$refs.table.clearSelection()
    )
  })
})

describe('测试 persistSelection 模式', () => {
  beforeAll(() => {
    elDataTableMock.persistSelection = true
  })

  test('onSelect', () => {
    const row = elDataTableMock.data[0]
    // 选中
    elDataTableMock.selectStrategy.onSelect([row], row)
    expect(elDataTableMock.selected).toContain(row)
    // 取消选中
    elDataTableMock.selectStrategy.onSelect([], row)
    expect(elDataTableMock.selected).not.toContain(row)
  })
  test('onSelectAll', () => {
    const selection = elDataTableMock.data
    // 选中
    elDataTableMock.selectStrategy.onSelectAll(selection)
    selection.forEach(row => {
      expect(elDataTableMock.selected).toContain(row)
    })
    // 取消选中
    elDataTableMock.selectStrategy.onSelectAll([])
    expect(elDataTableMock.selected.length).toBe(0)
  })
  test('toggleRowSelection', () => {
    const row = elDataTableMock.data[0]
    // 切换
    const init = elDataTableMock.selected.includes(row)
    elDataTableMock.toggleRowSelection(row)
    const toggle = elDataTableMock.selected.includes(row)
    expect(init).not.toBe(toggle)
    elDataTableMock.toggleRowSelection(row)
    const toggleAgain = elDataTableMock.selected.includes(row)
    expect(init).toBe(toggleAgain)
    // 选中
    elDataTableMock.toggleRowSelection(row, true)
    expect(elDataTableMock.selected).toContain(row)
    // 取消选中
    elDataTableMock.toggleRowSelection(row, false)
    expect(elDataTableMock.selected).not.toContain(row)
  })
  test('clearSelection', () => {
    elDataTableMock.clearSelection()
    expect(elDataTableMock.selected.length).toBe(0)
  })
})
