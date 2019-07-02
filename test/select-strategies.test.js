import getSelectStrategies from '../src/utils/select-strategies'

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
  get selectStrategies() {
    return getSelectStrategies(this)
  },
  get selectStrategy() {
    return this.persistSelection
      ? this.selectStrategies.persistSelection
      : this.selectStrategies.normal
  },
  toggleRowSelection() {
    return this.selectStrategy.toggleRowSelection(...arguments)
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
    const before = elDataTableMock.selected.includes(row)
    elDataTableMock.toggleRowSelection(row)
    const after = elDataTableMock.selected.includes(row)
    expect(before).not.toBe(after)
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
