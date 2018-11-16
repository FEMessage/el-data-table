<template>
    <div class="el-data-table">
        <!--搜索字段-->
        <el-form-renderer v-if="searchForm.length > 0 || !!$slots.search" inline :content="searchForm" ref="searchForm">
          <!--@slot 额外的搜索内容, 当searchForm不满足需求时可以使用-->
            <slot name="search"></slot>
            <el-form-item>
                <!--https://github.com/ElemeFE/element/pull/5920-->
                <el-button native-type="submit" type="primary" @click="search" size="small">查询</el-button>
                <el-button @click="resetSearch" size="small">重置</el-button>
            </el-form-item>
        </el-form-renderer>

        <el-form v-if="hasNew || hasDelete || headerButtons.length > 0 ">
            <el-form-item>
                <el-button v-if="hasNew" type="primary" size="small"
                           @click="onDefaultNew">新增</el-button>
                <el-button v-for="(btn, i) in headerButtons"
                           v-if="'show' in btn ? btn.show(selected) : true"
                           :disabled="'disabled' in btn ? btn.disabled(selected) : false"
                           @click="btn.atClick(selected)"
                           v-bind="btn"
                           :key="i"
                           size="small" >{{btn.text}}</el-button>
                <el-button v-if="hasSelect && hasDelete" type="danger" size="small"
                           @click="onDefaultDelete($event)"
                           :disabled="single ? (!selected.length || selected.length > 1) : !selected.length">删除</el-button>
            </el-form-item>
        </el-form>

        <el-table
            ref="table"
            v-bind="tableAttrs"
            :data="data"
            :row-style="showRow"
            v-loading="loading"
            @selection-change="handleSelectionChange"
        >

            <!--TODO 不用jsx写, 感觉template逻辑有点不清晰了-->
            <template v-if="isTree">

                <!--有多选-->
                <template v-if="hasSelect">
                    <el-table-column key="selection-key" v-bind="columns[0]">
                    </el-table-column>

                    <el-table-column
                        key="tree-ctrl"
                        v-bind="columns[1]" >
                        <template slot-scope="scope">
                            <span v-if="isTree" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
              <span v-if="isTree && iconShow(scope.$index, scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                <i v-else class="el-icon-minus"></i>
              </span>
                            {{scope.row[columns[1].prop]}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-for="(col) in columns.filter((c, i) => i !== 0 && i !== 1)"
                        :key="col.prop"
                        v-bind="col" >
                    </el-table-column>
                </template>

                <!--无选择-->
                <template v-else>

                    <!--展开这列, 丢失 el-table-column属性-->
                    <el-table-column
                        key="tree-ctrl"
                        v-bind="columns[0]" >
                        <template slot-scope="scope">
                            <span v-if="isTree" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
              <span v-if="isTree && iconShow(scope.$index, scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
                <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
                <i v-else class="el-icon-minus"></i>
              </span>
                            {{scope.row[columns[0].prop]}}
                        </template>
                    </el-table-column>

                    <el-table-column
                        v-for="(col) in columns.filter((c, i) => i !== 0)"
                        :key="col.prop"
                        v-bind="col" >
                    </el-table-column>
                </template>
            </template>

            <!--非树-->
            <template v-else>
                <el-table-column
                    v-for="(col) in columns"
                    :key="col.prop"
                    v-bind="col" >
                </el-table-column>
            </template>

            <!--默认操作列-->
            <el-table-column label="操作" v-if="hasOperation"
                             v-bind="operationAttrs"
            >
                <template slot-scope="scope">
                    <el-button v-if="isTree && hasNew" type="primary" size="small"
                               @click="onDefaultNew(scope.row)">新增</el-button>
                    <el-button v-if="hasEdit" size="small"
                               @click="onDefaultEdit(scope.row)">
                        修改
                    </el-button>
                    <el-button v-if="hasView" type="info" size="small"
                               @click="onDefaultView(scope.row)">
                        查看
                    </el-button>
                    <el-button v-for="(btn, i) in extraButtons"
                               v-if="'show' in btn ? btn.show(scope.row) : true"
                               v-bind="btn" @click="btn.atClick(scope.row)" :key="i" size="small">
                        {{btn.text}}
                    </el-button>
                    <el-button v-if="!hasSelect && hasDelete && canDelete(scope.row)" type="danger" size="small"
                               @click="onDefaultDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>

            <!--@slot 自定义操作列, 当extraButtons不满足需求时可以使用 -->
            <slot></slot>

        </el-table>
        <el-pagination
            v-if="hasPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="paginationSizes"
            :page-size="size"
            :total="total"
            style="text-align: right; padding: 10px 0"
            :layout="paginationLayout"
        >
        </el-pagination>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" v-if="hasDialog">
            <!--https://github.com/leezng/el-form-renderer-->
            <el-form-renderer :content="form" ref="dialogForm" v-bind="formAttrs" :disabled="isView">
                <!--@slot 额外的弹窗表单内容, 当form不满足需求时可以使用 -->
                <slot name="form"></slot>
            </el-form-renderer>

            <div slot="footer" v-show="!isView">
                <el-button @click="cancel" size="small">取 消</el-button>
                <el-button type="primary" @click="confirm" v-loading="confirmLoading" size="small">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import _get from 'lodash.get'
import qs from 'qs'

// 默认返回的数据格式如下
//          {
//            "code":0,
//            "msg":"ok",
//            "payload":{
//              "content":[], // 数组
//              "totalElements":2, // 总数
//            }
//          }
// 可根据实际情况传入 data/total 两个字段的路径, 分别对应上面数据结构中的 content/totalElements
// 如果接口不分页, 则传hasPagination=false, 此时数据取 payload, 当然也可以自定义, 设置dataPath即可

const defaultFirstPage = 1

const dataPath = 'payload.content'
const totalPath = 'payload.totalElements'
const noPaginationDataPath = 'payload'

const treeChildKey = 'children'
const treeParentKey = 'parentId'
const treeParentValue = 'id'
const defaultId = 'id'

const dialogForm = 'dialogForm'

const equal = '='
const equalPattern = /=/g

const valueSeparator = '~'
const paramSeparator = ','

const valueSeparatorPattern = new RegExp(valueSeparator, 'g')

const queryFlag = 'q='
const queryPattern = new RegExp('q=.*' + paramSeparator)

export default {
  name: 'ElDataTable',
  props: {
    /**
     * 请求url, 如果为空, 则不会发送请求; 改变url, 则table会重新发送请求
     */
    url: {
      type: String,
      default: ''
    },
    /**
     * 主键，默认值 id，
     * 修改/删除时会用到,请求会根据定义的属性值获取主键,即row[this.id]
     */
    id: {
      type: String,
      default: defaultId
    },
    /**
     * 分页请求的第一页的值(有的接口0是第一页)
     */
    firstPage: {
      type: Number,
      default: defaultFirstPage
    },
    /**
     * 渲染组件的分页数据在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    dataPath: {
      type: String,
      default: dataPath
    },
    /**
     * 分页数据的总数在接口返回的数据中的路径, 嵌套对象使用.表示即可
     */
    totalPath: {
      type: String,
      default: totalPath
    },
    /**
     * 列属性设置, 详情见element-ui官网
     * @link http://element.eleme.io/#/zh-CN/component/table#table-column-attributes
     */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 查询字段渲染, 配置参考el-form-renderer
     * @link https://github.com/leezng/el-form-renderer/blob/dev/README.zh-CN.md
     */
    searchForm: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 点击查询按钮, 查询前执行的函数, 需要返回Promise
     */
    beforeSearch: {
      type: Function,
      default() {
        return Promise.resolve()
      }
    },
    /**
     * 路由模式, hash | history || '', 决定了查询参数存放的形式, 设置为空则不存储查询参数
     */
    routerMode: {
      type: String,
      default: 'hash'
    },
    /**
     * 单选, 适用场景: 不可以批量删除
     */
    single: {
      type: Boolean,
      default: false
    },
    /**
     * 是否有操作列
     */
    hasOperation: {
      type: Boolean,
      default: true
    },
    /**
     * 操作列的自定义按钮, 渲染的是element-ui的button, 支持属性
     * type: '', text: '', atClick: row => {}, show: row => {返回true时显示}
     */
    extraButtons: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 头部的自定义按钮, 渲染的是element-ui的button, 支持属性
     * type: '', text: '', atClick: row => {}, show: row => {返回true时显示}, disabled: selected => {返回true时禁用}
     */
    headerButtons: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 是否有新增按钮
     */
    hasNew: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有编辑按钮
     */
    hasEdit: {
      type: Boolean,
      default: true
    },
    /**
     * 是否有查看按钮
     */
    hasView: {
      type: Boolean,
      default: false
    },
    /**
     * table头部是否有删除按钮(该按钮要多选时才会出现)
     */
    hasDelete: {
      type: Boolean,
      default: true
    },
    /**
     * 某行数据是否可以删除, 返回true表示可以, 控制的是单选时单行的删除按钮
     */
    canDelete: {
      type: Function,
      default() {
        return true
      }
    },
    /**
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用
     */
    onNew: {
      type: Function
    },
    /**
     * 点击修改按钮时的方法, 当默认新增方法不满足需求时使用
     */
    onEdit: {
      type: Function
    },
    /**
     * 点击删除按钮时的方法, 当默认新增方法不满足需求时使用
     */
    onDelete: {
      type: Function
    },
    /**
     * 是否分页
     */
    hasPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 分页组件的子组件布局，子组件名用逗号分隔，对应element-ui pagination的layout属性
     * @link http://element.eleme.io/#/zh-CN/component/pagination
     */
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    /**
     * 分页组件的每页显示个数选择器的选项设置，对应element-ui pagination的page-sizes属性
     * @link http://element.eleme.io/#/zh-CN/component/pagination
     */
    paginationSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    /**
     * 分页组件的每页显示个数选择器默认选项，对应element-ui pagination的page-size属性
     * @link http://element.eleme.io/#/zh-CN/component/pagination
     */
    paginationSize: {
      type: Number,
      default: 10
    },
    /**
     * 不分页时的size的大小
     */
    noPaginationSize: {
      type: Number,
      default: 999
    },
    /**
     * 要渲染的数据是否是树形结构
     */
    isTree: {
      type: Boolean,
      default: false
    },
    /**
     * 树形结构相关: 子节点的字段名
     */
    treeChildKey: {
      type: String,
      default: treeChildKey
    },
    /**
     * 树形结构相关: 父节点的字段名
     */
    treeParentKey: {
      type: String,
      default: treeParentKey
    },
    /**
     * 树形结构相关: 父节点字段值的来源字段。
     * 新增/修改时会用到, 例如, 在id为2的节点新增子节点, 则子节点的parentId为2, 也即parentId的值来源于字段id, 故treeParentValue为id
     */
    treeParentValue: {
      type: String,
      default: treeParentValue
    },
    /**
     * 树形结构相关: 是否展开所有节点
     */
    expandAll: {
      type: Boolean,
      default: false
    },
    /**
     * element table 属性设置, 详情配置参考element-ui官网
     * @link http://element.eleme.io/#/zh-CN/component/table#table-attributes
     */
    tableAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 操作列属性
     */
    operationAttrs: {
      type: Object,
      default() {
        return {width: '', fixed: 'right'}
      }
    },
    /**
     * 是否有弹窗, 用于不需要弹窗时想减少DOM渲染的场景
     */
    hasDialog: {
      type: Boolean,
      default: true
    },
    /**
     * 新增弹窗的标题
     */
    dialogNewTitle: {
      type: String,
      default: '新增'
    },
    /**
     * 修改弹窗的标题
     */
    dialogEditTitle: {
      type: String,
      default: '修改'
    },
    dialogViewTitle: {
      type: String,
      default: '查看'
    },
    /**
     * 弹窗表单, 用于新增与修改, 详情配置参考el-form-renderer
     * @link https://github.com/leezng/el-form-renderer/blob/dev/README.zh-CN.md
     */
    form: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link http://element.eleme.io/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 新增/修改提交时注入额外的参数
     */
    extraParams: {
      type: Object
    },
    /**
     * 在新增/修改弹窗 点击确认时调用，返回false则不会继续执行confirm逻辑
     */
    beforeConfirm: {
      type: Function,
      default() {
        return true
      }
    },
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    customQuery: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      data: [],
      hasSelect: this.columns.length && this.columns[0].type == 'selection',
      size: this.paginationSize || this.paginationSizes[0],
      page: defaultFirstPage,
      // https://github.com/ElemeFE/element/issues/1153
      total: null,
      loading: false,
      selected: [],

      //弹窗
      dialogTitle: this.dialogNewTitle,
      dialogVisible: false,
      isNew: true,
      isEdit: false,
      isView: false,
      confirmLoading: false,
      // 要修改的那一行
      row: {},

      // 初始的customQuery值, 重置查询时, 会用到
      // JSON.stringify是为了后面深拷贝作准备
      initCustomQuery: JSON.stringify(this.customQuery)
    }
  },
  mounted() {
    let searchForm = this.$refs.searchForm

    if (searchForm) {
      // 阻止表单提交的默认行为
      // https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2
      searchForm.$el.setAttribute('action', 'javascript:;')

      // 恢复查询条件
      let matches = location.href.match(queryPattern)

      if (matches) {
        let query = matches[0].substr(2).replace(valueSeparatorPattern, equal)
        let params = qs.parse(query, {delimiter: paramSeparator})

        // page size 特殊处理
        this.page = params.page * 1
        this.size = params.size * 1

        // 对slot=search无效
        Object.keys(params).forEach(k => {
          if (k == 'page' || k == 'size') return
          searchForm.updateValue({id: k, value: params[k]})
        })
      }
    }

    this.$nextTick(() => {
      this.getList()
    })
  },
  watch: {
    url: function(val, old) {
      this.page = defaultFirstPage
      this.getList()
    },
    dialogVisible: function(val, old) {
      if (!val) {
        this.isNew = false
        this.isEdit = false
        this.isView = false
        this.confirmLoading = false

        this.$refs[dialogForm].resetFields()

        // fix element bug https://github.com/ElemeFE/element/issues/8615
        // 重置select 为multiple==true时值为[undefined]
        this.form.forEach(entry => {
          if (entry.$type === 'select' && entry.$el && entry.$el.multiple) {
            this.$refs[dialogForm].updateValue({id: entry.$id, value: []})
          }
        })
      }
    }
  },
  methods: {
    getList(shouldStoreQuery) {
      let searchForm = this.$refs.searchForm
      let formQuery = searchForm ? searchForm.getFormValue() : {}
      // TODO Object.assign IE不支持, 所以后面Object.keys的保守其实是没有必要的。。。
      let query = Object.assign({}, formQuery, this.customQuery)

      let url = this.url
      let params = ''
      let size = this.hasPagination ? this.size : this.noPaginationSize

      if (!url) {
        console.warn('DataTable: url 为空, 不发送请求')
        return
      }

      // 构造查询url
      if (url.indexOf('?') > -1) url += '&'
      else url += '?'

      params += `size=${size}`

      // 无效值过滤. query 有可能值为 0, 所以只能这样过滤
      // TODO Object.values IE11不兼容, 暂时使用Object.keys
      params += Object.keys(query)
        .filter(k => {
          return query[k] !== '' && query[k] !== null && query[k] !== undefined
        })
        .reduce(
          (params, k) =>
            (params += `&${k}=${encodeURIComponent(
              query[k].toString().trim()
            )}`),
          ''
        )

      // 根据偏移值计算接口正确的页数
      let pageOffset = this.firstPage - defaultFirstPage
      let page = this.page + pageOffset

      // 请求开始
      this.loading = true

      this.$axios
        .get(url + params + `&page=${page}`)
        .then(resp => {
          let res = resp.data
          let data = []

          // 不分页
          if (!this.hasPagination) {
            data = _get(res, dataPath) || _get(res, noPaginationDataPath) || []
          } else {
            data = _get(res, this.dataPath) || []
            this.total = _get(res, this.totalPath)
          }

          this.data = data

          // 树形结构逻辑
          if (this.isTree) {
            this.data = this.tree2Array(data, this.expandAll)
          }

          this.loading = false
          /**
           * 请求返回, 数据更新后触发, 返回(data, resp) data是渲染table的数据, resp是请求返回的完整response
           * @event update
           */
          this.$emit('update', data, res)
        })
        .catch(err => {
          /**
           * 请求数据失败，返回err对象
           * @event error
           */
          this.$emit('error', err)
          this.loading = false
        })

      // 存储query记录, 便于后面恢复
      if (this.routerMode && shouldStoreQuery > 0) {
        let newUrl = ''
        let searchQuery =
          queryFlag +
          (params + `&page=${this.page}`)
            .replace(/&/g, paramSeparator)
            .replace(equalPattern, valueSeparator) +
          paramSeparator

        // 非第一次查询
        if (location.href.indexOf(queryFlag) > -1) {
          newUrl = location.href.replace(queryPattern, searchQuery)
        } else if (this.routerMode == 'hash') {
          let search =
            location.hash.indexOf('?') > -1
              ? `&${searchQuery}`
              : `?${searchQuery}`
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            location.hash +
            search
        } else {
          let search = location.search ? `&${searchQuery}` : `?${searchQuery}`
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            search +
            location.hash
        }

        history.pushState(history.state, 'el-data-table search', newUrl)
      }
    },
    search() {
      this.$refs.searchForm.validate(valid => {
        if (!valid) return

        this.beforeSearch()
          .then(() => {
            this.page = defaultFirstPage
            this.getList(true)
          })
          .catch(err => {
            this.$emit('error', err)
          })
      })
    },
    resetSearch() {
      // reset后, form里的值会变成 undefined, 在下一次查询会赋值给query
      this.$refs.searchForm.resetFields()
      this.page = defaultFirstPage

      // 重置
      history.replaceState(
        history.state,
        '',
        location.href.replace(queryPattern, '')
      )

      this.$nextTick(() => {
        this.getList()
      })

      /**
       * 按下重置按钮后触发,
       * 另外, 当customQuery.sync时, 会重置customQuery
       * @event reset
       */
      this.$emit('reset')

      this.$emit(
        'update:customQuery',
        Object.assign(this.customQuery, JSON.parse(this.initCustomQuery))
      )
    },
    handleSizeChange(val) {
      if (this.size === val) return

      this.page = defaultFirstPage
      this.size = val
      this.getList(true)
    },
    handleCurrentChange(val) {
      if (this.page === val) return

      this.page = val
      this.getList(true)
    },
    handleSelectionChange(val) {
      this.selected = val

      /**
       * 多选启用时生效, 返回(selected)已选中行的数组
       * @event selection-change
       */
      this.$emit('selection-change', val)
    },
    // 弹窗相关
    // 除非树形结构在操作列点击新增, 否则 row 都是 undefined
    onDefaultNew(row = {}) {
      if (this.onNew) {
        return this.onNew(row)
      }
      /**
       * 点击新增 触发new事件
       * @event new
       */
      this.$emit('new', row)

      this.row = row
      this.isNew = true
      this.isEdit = false
      this.isView = false
      this.dialogTitle = this.dialogNewTitle
      this.dialogVisible = true
    },
    onDefaultView(row) {
      if (this.onView) {
        return this.onView(row)
      }
      /**
       * 点击查看 触发view事件
       * @event view
       */
      this.$emit('view', row)

      this.row = row
      this.isView = true
      this.isNew = false
      this.isEdit = false
      this.dialogTitle = this.dialogViewTitle
      this.dialogVisible = true
      // 给表单填充值
      this.$nextTick(() => {
        this.form.forEach(entry => {
          let value = row[entry.$id]

          this.$refs[dialogForm].updateValue({id: entry.$id, value})
        })
      })
    },
    onDefaultEdit(row) {
      if (this.onEdit) {
        return this.onEdit(row)
      }
      /**
       * 点击修改 触发edit事件
       * @event edit
       */
      this.$emit('edit', row)

      this.row = row
      this.isEdit = true
      this.isNew = false
      this.isView = false
      this.dialogTitle = this.dialogEditTitle
      this.dialogVisible = true

      // 给表单填充值
      this.$nextTick(() => {
        this.form.forEach(entry => {
          let value = row[entry.$id]

          this.$refs[dialogForm].updateValue({id: entry.$id, value})
        })
      })
    },
    cancel() {
      this.dialogVisible = false
    },
    confirm() {
      if (!this.beforeConfirm()) return

      this.$refs[dialogForm].validate(valid => {
        if (!valid) return false

        if (this.isView) {
          this.cancel()
          return
        }

        let data = Object.assign(
          {},
          this.$refs[dialogForm].getFormValue(),
          this.extraParams
        )

        // 默认新增
        let method = 'post'
        let url = this.url + ''

        if (this.isEdit) {
          method = 'put'
          url += `/${this.row[this.id]}`
        }

        if (this.isTree) {
          if (this.isNew)
            data[this.treeParentKey] = this.row[this.treeParentValue]
          else if (this.isEdit)
            data[this.treeParentKey] = this.row[this.treeParentKey]
        }

        this.confirmLoading = true

        this.$axios[method](url, data)
          .then(resp => {
            this.getList()
            this.showMessage(true)
            this.cancel()
          })
          .catch(err => {
            this.confirmLoading = false
          })
      })
    },
    onDefaultDelete(row) {
      if (this.onDelete) {
        return this.onDelete(row)
      }
      this.$confirm('确认删除吗', '提示', {
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action == 'confirm') {
            instance.confirmButtonLoading = true

            // 单个删除
            if (!this.hasSelect) {
              this.$axios
                .delete(this.url + '/' + row[this.id])
                .then(resp => {
                  instance.confirmButtonLoading = false
                  done()
                  this.showMessage(true)
                  this.getList()
                })
                .catch(er => {
                  instance.confirmButtonLoading = false
                })
            } else {
              // 多选模式
              this.$axios
                .delete(
                  this.url + '/' + this.selected.map(v => v[this.id]).toString()
                )
                .then(resp => {
                  instance.confirmButtonLoading = false
                  done()
                  this.showMessage(true)
                  this.getList()
                })
                .catch(er => {
                  instance.confirmButtonLoading = false
                })
            }
          } else done()
        }
      }).catch(er => {
        /*取消*/
      })
    },
    // 树形table相关
    // https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable
    tree2Array(data, expandAll, parent = null, level = null) {
      let tmp = []
      data.forEach(record => {
        if (record._expanded === undefined) {
          this.$set(record, '_expanded', expandAll)
        }
        let _level = 0
        if (level !== undefined && level !== null) {
          _level = level + 1
        }
        this.$set(record, '_level', _level)
        // 如果有父元素
        if (parent) {
          this.$set(record, 'parent', parent)
        }
        tmp.push(record)

        if (record[this.treeChildKey] && record[this.treeChildKey].length > 0) {
          const children = this.tree2Array(
            record[this.treeChildKey],
            expandAll,
            record,
            _level
          )
          tmp = tmp.concat(children)
        }
      })
      return tmp
    },
    showRow(row) {
      const show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true
      row.row._show = show
      return show
        ? 'animation:treeTableShow 1s-webkit-animation:treeTableShow 1s'
        : 'display:none'
    },
    // 切换下级是否展开
    toggleExpanded(trIndex) {
      const record = this.data[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      //      return index ===0 && record.children && record.children.length > 0;
      return record[this.treeChildKey] && record[this.treeChildKey].length > 0
    },
    showMessage(isSuccess = true) {
      if (isSuccess) {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      } else {
        this.$message({
          type: 'error',
          message: '操作失败'
        })
      }
    }
  }
}
</script>
<style lang="stylus">
.el-data-table {
  color-blue = #2196F3;
  space-width = 18px;

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: space-width;
    height: 14px;

    &::before {
      content: '';
    }
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: color-blue;
  }

  @keyframes treeTableShow {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
}
</style>
