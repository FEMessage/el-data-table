export const defaultFirstPage = 1

export const dataPath = 'payload.content'
export const totalPath = 'payload.totalElements'
export const noPaginationDataPath = 'payload'

export const treeChildKey = 'children'
export const treeParentKey = 'parentId'
export const treeParentValue = 'id'
export const defaultId = 'id'

export const equal = '='
export const equalPattern = /=/g

export const valueSeparator = '~'
export const paramSeparator = ','

export const valueSeparatorPattern = new RegExp(valueSeparator, 'g')

export const queryFlag = 'q='
export const queryPattern = new RegExp('q=.*' + paramSeparator)

export const DialogMode = {
  New: 'new',
  Edit: 'edit',
  View: 'view'
}
