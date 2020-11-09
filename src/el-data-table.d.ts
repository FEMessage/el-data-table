import Vue, {VueConstructor, VNode} from 'vue'

import {AxiosRequestConfig} from 'axios'

import {Table,Form, Dialog} from '@femessage/types/element-ui'
import {TableColumn} from '@femessage/types/element-ui/table-column'

declare module '@femessage/el-data-table' {
  class FemessageComponent extends Vue {
    static install(vue: typeof Vue): void
  }

  type CombinedVueInstance<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = Data & Methods & Computed & Props & Instance

  type ExtendedVue<
    Instance extends Vue,
    Data,
    Methods,
    Computed,
    Props
  > = VueConstructor<
    CombinedVueInstance<Instance, Data, Methods, Computed, Props> & Vue
  >

  type Combined<Data, Methods, Computed, Props> = Data &
    Methods &
    Computed &
    Props

  type ElDataTableData = {
    data: any[]
    size: number
    page: number
    total: null | number
    loading: boolean
    selected: any[]
    row: any
    initExtraQuery: any
    isSearchCollapse: boolean
    showNoData: boolean
  }

  type ElDataTableMethods = {
    getList: ({loading}?: {loading?: boolean}) => void

    resetSearch: () => void

    toggleRowSelection: (row: any, isSelected?: boolean) => any

    clearSelection: () => void

    onDefaultDelete: (data: any) => void

    correctPage: () => void
  }

  type ElDataTableComputed = {
    tableEventHandlersInner: any
    hasSelect: boolean
    selectable: () => boolean
    columnsAlign: string
    routerMode: string
    hasSearchForm: boolean
    hasHeader: boolean
    _extraBody: object
    _extraQuery: object
    selectStrategy: any
    searchLocatedSlotKeys: any
    collapseForm: any
    _searchForm: any
  }

  export interface FormContentItem {
    id: string
    label?: string | VNode
    [key: string]: any
  }

  export type FormContent = Array<FormContentItem>

  export interface DataTableColumn {
    label: string
    prop: string
    formatter?: (row: any, column: TableColumn) => any
    [key: string]: any
  }

  export type DataTableColumns = Array<DataTableColumn>

  export type OperationButton = {
    type?: string
    text: string
    atClick: (row: any) => Promise<any>
    show?: (row: any) => boolean
    disabled?: (row: any) => boolean
  }

  export type OperationButtons = OperationButton[]

  // props 都有默认值，都是可选的
  export type ElDataTableProps = Partial<{
    url: string
    id: string
    firstPage: number
    dataPath: string
    totalPath: string
    pageKey: string
    pageSizeKey: string
    columns: DataTableColumns
    searchForm: FormContent
    canSearchCollapse: boolean
    beforeSearch: (formValue: any) => any
    single: boolean
    persistSelection: boolean
    hasOperation: boolean
    extraButtons: OperationButtons
    headerButtons: OperationButtons
    hasNew: boolean
    hasEdit: boolean
    hasView: boolean
    hasDelete: boolean
    newText: string
    editText: string
    viewText: string
    deleteText: string
    deleteMessage: (data: any) => string
    canDelete: (row: any) => boolean
    onNew: (data: any, row?: any) => Promise<any>
    onEdit: (data: any, row: any) => Promise<any>
    onDelete: (data: any) => Promise<any>
    onSuccess: (type: 'new' | 'edit' | 'delete', data: any) => Promise<any>
    hasPagination: boolean
    paginationLayout: string
    paginationSizes: number[]
    paginationSize: number
    noPaginationSize: number
    isTree: boolean
    treeChildKey: string
    treeParentKey: string
    treeParentValue: string
    expandAll: boolean
    tableAttrs: Partial<Table>
    tableEventHandlers: object
    operationAttrs: object
    dialogNewTitle: string
    dialogEditTitle: string
    dialogViewTitle: string
    form: FormContent
    formAttrs: Partial<Form>
    dialogAttrs: Partial<Dialog>
    extraParams: object
    extraBody: object
    beforeConfirm: (data: any, isNew: boolean) => Promise<any>
    customQuery: object
    extraQuery: object
    saveQuery: boolean
    operationButtonType: string
    buttonSize: string
    axiosConfig: AxiosRequestConfig
  }>

  type ElDataTable = Combined<
    ElDataTableData,
    ElDataTableMethods,
    ElDataTableComputed,
    Required<ElDataTableProps>
  >

  export interface ElDataTableType extends FemessageComponent, ElDataTable {}

  const ElDataTableConstruction: ExtendedVue<
    Vue,
    ElDataTableData,
    ElDataTableMethods,
    ElDataTableComputed,
    Required<ElDataTableProps>
  >

  export default ElDataTableConstruction
}
