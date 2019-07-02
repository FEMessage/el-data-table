/**
 * 两种多选策略
 */
import {noop} from './util'
let elDataTable // el-data-table的vue实例
const getElTable = () => elDataTable.$refs.table

/**
 * 普通策略。由el-table维护selected
 */
const normal = {
  /**
   * normal模式下只需要监听selection-change事件
   */
  onSelectionChange(val) {
    elDataTable.selected = val
  },
  onSelect: noop,
  onSelectAll: noop,
  /**
   * toggleRowSelection和clearSelection的表现与el-table一致
   */
  toggleRowSelection() {
    return getElTable().toggleRowSelection(...arguments)
  },
  clearSelection() {
    return getElTable().clearSelection()
  },
  /**
   * normal模式下无需手动同步selected和el-table的实际选中状态
   */
  updateElTableSelection: noop
}

/**
 * 跨页保存多选策略。手动维护selected数组
 */
const persistSelection = {
  /**
   * el-table的selection-change事件不适用于开启跨页保存的情况。
   * 比如，当开启persistSelection时，发生以下两个场景：
   * 1. 用户点击翻页
   * 2. 用户点击行首的切换全选项按钮，清空当前页多选项数据
   * 其中场景1应该保持selected不变；而场景2只应该从selected移除当前页所有行，保留其他页面的多选状态。
   * 但el-table的selection-change事件在两个场景中无差别发生，所以这里不处理这个事件
   */
  onSelectionChange: noop,
  /**
   * 用户切换某一行的多选
   */
  onSelect(selection, row) {
    const isChosen = selection.indexOf(row) > -1
    persistSelection.toggleRowSelection(row, isChosen)
  },
  /**
   * 用户切换当前页的多选
   */
  onSelectAll(selection) {
    const isSelected = !!selection.length
    elDataTable.data.forEach(r =>
      persistSelection.toggleRowSelection(r, isSelected)
    )
  },
  /**
   * toggleRowSelection和clearSelection的表现需要手动实现
   * 记得最后要将状态同步到el-table中
   */
  toggleRowSelection(row, isSelected) {
    const {id, selected} = elDataTable
    const foundIndex = selected.findIndex(r => r[id] === row[id])
    if (typeof isSelected === 'undefined') {
      if (foundIndex > -1) {
        selected.splice(foundIndex, 1)
      } else {
        selected.push(row)
      }
    } else if (isSelected && foundIndex === -1) {
      selected.push(row)
    } else if (!isSelected && foundIndex > -1) {
      selected.splice(foundIndex, 1)
    }
    persistSelection.updateElTableSelection()
  },
  clearSelection() {
    elDataTable.selected = []
    persistSelection.updateElTableSelection()
  },
  /**
   * 将selected状态同步到el-table中
   */
  updateElTableSelection() {
    const {data, id, selected} = elDataTable
    data.forEach(r => {
      const isSelected = !!selected.find(r2 => r[id] === r2[id])
      getElTable().toggleRowSelection(r, isSelected)
    })
  }
}

export default function getSelectStrategies(elDataTableInstance) {
  elDataTable = elDataTableInstance
  return {normal, persistSelection}
}
