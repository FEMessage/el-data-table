/**
 * Universal text
 */
const newText = 'New'
const editText = 'Edit'
const viewText = 'View'
const deleteText = 'Delete'
const cancelText = 'Cancel'
const confirmText = 'Confirm'

export default {
  searchForm: {
    searchButtonText: 'Search',
    resetButtonText: 'Reset'
  },
  headerButtons: {
    newButtonText: newText,
    deleteButtonText: deleteText
  },
  operation: {
    columnText: 'Operations',
    newButtonText: newText,
    editButtonText: editText,
    viewButtonText: viewText,
    deleteButtonText: deleteText
  },
  dialog: {
    newTitle: newText,
    editTitle: editText,
    viewTitle: viewText,
    cancelButtonText: cancelText,
    confirmButtonText: confirmText
  },
  deleteMessageBox: {
    message: 'This will permanently delete this record. Continue?',
    title: 'Warning',
    cancelButtonText: cancelText,
    confirmButtonText: confirmText
  },
  showMessage: {
    successText: 'Operation succeed',
    failText: 'Operation failed'
  }
}
