<template>
  <div class="el-data-table">
    <template v-if="showNoData">
      <!--@slot 获取数据为空时的内容-->
      <slot name="no-data"></slot>
    </template>
    <template v-else>
      <search-form
        v-if="hasSearchForm"
        ref="searchForm"
        :search-form="_searchForm"
        :can-search-collapse="canSearchCollapse"
        :is-search-collapse="isSearchCollapse"
        :located-slot-keys="searchLocatedSlotKeys"
      >
        <slot v-for="slot in searchLocatedSlotKeys" :slot="slot" :name="slot" />
        <!--@slot 额外的搜索内容, 当searchForm不满足需求时可以使用-->
        <slot name="search"></slot>
        <el-form-item>
          <!--https://github.com/ElemeFE/element/pull/5920-->
          <el-button
            native-type="submit"
            type="primary"
            :size="buttonSize"
            @click="search"
            >查询</el-button
          >
          <el-button :size="buttonSize" @click="resetSearch">重置</el-button>
        </el-form-item>
      </search-form>

      <el-form v-if="hasHeader">
        <el-form-item>
          <el-button
            v-if="hasNew"
            type="primary"
            :size="buttonSize"
            @click="onDefaultNew"
            >{{ newText }}</el-button
          >
          <template v-for="(btn, i) in headerButtons">
            <self-loading-button
              v-if="'show' in btn ? btn.show(selected) : true"
              :key="i"
              :disabled="'disabled' in btn ? btn.disabled(selected) : false"
              :click="btn.atClick"
              :params="selected"
              :callback="getList"
              :size="buttonSize"
              v-bind="btn"
            >
              {{
                typeof btn.text === 'function' ? btn.text(selected) : btn.text
              }}
            </self-loading-button>
          </template>
          <el-button
            v-if="hasSelect && hasDelete"
            type="danger"
            :size="buttonSize"
            :disabled="
              single
                ? !selected.length || selected.length > 1
                : !selected.length
            "
            @click="onDefaultDelete($event)"
            >删除</el-button
          >
          <el-button
            v-if="canSearchCollapse"
            type="default"
            :size="buttonSize"
            :icon="`el-icon-arrow-${isSearchCollapse ? 'down' : 'up'}`"
            @click="isSearchCollapse = !isSearchCollapse"
            >{{ isSearchCollapse ? '展开' : '折叠' }}搜索</el-button
          >
          <!--@slot 额外的header内容, 当headerButtons不满足需求时可以使用，作用域传入selected -->
          <slot name="header" :selected="selected" />
        </el-form-item>
      </el-form>

      <el-table
        ref="table"
        v-loading="loading"
        v-bind="tableAttrs"
        :data="data"
        :row-class-name="showRow"
        @selection-change="selectStrategy.onSelectionChange"
        @select="selectStrategy.onSelect"
        @select-all="selectStrategy.onSelectAll"
      >
        <!--TODO 不用jsx写, 感觉template逻辑有点不清晰了-->
        <template v-if="isTree">
          <!--有多选-->
          <template v-if="hasSelect">
            <el-table-column key="selection-key" v-bind="columns[0]" />

            <el-table-column key="tree-ctrl" v-bind="columns[1]">
              <template slot-scope="scope">
                <span
                  v-for="space in scope.row._level"
                  :key="space"
                  class="ms-tree-space"
                />
                <span
                  v-if="iconShow(scope.$index, scope.row)"
                  class="tree-ctrl"
                  @click="toggleExpanded(scope.$index)"
                >
                  <i
                    :class="`el-icon-${scope.row._expanded ? 'minus' : 'plus'}`"
                  />
                </span>
                {{ scope.row[columns[1].prop] }}
              </template>
            </el-table-column>

            <el-table-column
              v-for="col in columns.filter((c, i) => i !== 0 && i !== 1)"
              :key="col.prop"
              v-bind="col"
            />
          </template>

          <!--无选择-->
          <template v-else>
            <!--展开这列, 丢失 el-table-column属性-->
            <el-table-column key="tree-ctrl" v-bind="columns[0]">
              <template slot-scope="scope">
                <span
                  v-for="space in scope.row._level"
                  :key="space"
                  class="ms-tree-space"
                />

                <span
                  v-if="iconShow(scope.$index, scope.row)"
                  class="tree-ctrl"
                  @click="toggleExpanded(scope.$index)"
                >
                  <i
                    :class="`el-icon-${scope.row._expanded ? 'minus' : 'plus'}`"
                  />
                </span>
                {{ scope.row[columns[0].prop] }}
              </template>
            </el-table-column>

            <el-table-column
              v-for="col in columns.filter((c, i) => i !== 0)"
              :key="col.prop"
              v-bind="col"
            />
          </template>
        </template>

        <!--非树-->
        <template v-else>
          <el-table-column
            v-for="col in columns"
            :key="col.prop"
            v-bind="col"
          />
        </template>

        <!--默认操作列-->
        <el-table-column
          v-if="hasOperation"
          label="操作"
          v-bind="operationAttrs"
        >
          <template slot-scope="scope">
            <self-loading-button
              v-if="isTree && hasNew"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultNew(scope.row)"
            >
              {{ newText }}
            </self-loading-button>
            <self-loading-button
              v-if="hasEdit"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultEdit(scope.row)"
            >
              {{ editText }}
            </self-loading-button>
            <self-loading-button
              v-if="hasView"
              type="primary"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultView(scope.row)"
            >
              {{ viewText }}
            </self-loading-button>
            <template v-for="(btn, i) in extraButtons">
              <self-loading-button
                v-if="'show' in btn ? btn.show(scope.row) : true"
                :key="i"
                :is-text="operationButtonType === 'text'"
                v-bind="btn"
                :click="btn.atClick"
                :params="scope.row"
                :callback="getList"
              >
                {{
                  typeof btn.text === 'function'
                    ? btn.text(scope.row)
                    : btn.text
                }}
              </self-loading-button>
            </template>
            <self-loading-button
              v-if="!hasSelect && hasDelete && canDelete(scope.row)"
              type="danger"
              :size="operationButtonType === 'text' ? '' : buttonSize"
              :is-text="operationButtonType === 'text'"
              @click="onDefaultDelete(scope.row)"
            >
              删除
            </self-loading-button>
          </template>
        </el-table-column>

        <!--@slot 自定义操作列, 当extraButtons不满足需求时可以使用 -->
        <slot />
      </el-table>

      <el-pagination
        v-if="hasPagination"
        :current-page="page"
        :page-sizes="paginationSizes"
        :page-size="size"
        :total="total"
        style="text-align: right; padding: 10px 0;"
        :layout="paginationLayout"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

      <the-dialog
        ref="dialog"
        :new-title="dialogNewTitle"
        :edit-title="dialogEditTitle"
        :view-title="dialogViewTitle"
        :form="form"
        :form-attrs="formAttrs"
        :dialog-attrs="dialogAttrs"
        :button-size="buttonSize"
        @confirm="onConfirm"
      >
        <template v-slot="scope">
          <!-- @slot 表单作用域插槽。当编辑、查看时传入row；新增时row=null -->
          <slot name="form" :row="scope.row" />
        </template>
      </the-dialog>
    </template>
  </div>
</template>

<script>
import _get from 'lodash.get'
import SelfLoadingButton from './components/self-loading-button.vue'
import TheDialog, {dialogModes} from './components/the-dialog.vue'
import SearchForm from './components/search-form.vue'
import * as queryUtil from './utils/query'
import getSelectStrategy from './utils/select-strategy'
import getLocatedSlotKeys from './utils/extract-keys'
import transformSearchImmediatelyItem from './utils/search-immediately-item'

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

export default {
  name: 'ElDataTable',
  components: {
    SelfLoadingButton,
    TheDialog,
    SearchForm
  },

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
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-column-attributes
     */
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 查询字段渲染, 配置参考el-form-renderer
     * @link https://femessage.github.io/el-form-renderer/
     */
    searchForm: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 是否开启搜索栏折叠功能
     */
    canSearchCollapse: {
      type: Boolean,
      default: false
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
     * 单选, 适用场景: 不可以批量删除
     */
    single: {
      type: Boolean,
      default: false
    },
    /**
     * 切换页面时，已勾选项不会丢失
     */
    persistSelection: {
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
     * 操作列的自定义按钮, 渲染的是element-ui的button, 支持包括style在内的以下属性:
     * {type: '', text: '', atClick: row => Promise.resolve(), show: row => return true时显示 }
     * 点击事件 row参数 表示当前行数据, 需要返回Promise, 默认点击后会刷新table, resolve(false) 则不刷新
     */
    extraButtons: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 头部的自定义按钮, 渲染的是element-ui的button, 支持包括style在内的以下属性:
     * {type: '', text: '', atClick: selected => Promise.resolve(), show: selected => return true时显示, disabled: selected => return true时禁用}
     * 点击事件 selected参数 表示选中行所组成的数组, 函数需要返回Promise, 默认点击后会刷新table, resolve(false) 则不刷新
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
     * 新增按钮文案
     */
    newText: {
      type: String,
      default: '新增'
    },
    /**
     * 修改按钮文案
     */
    editText: {
      type: String,
      default: '修改'
    },
    /**
     * 查看按钮文案
     */
    viewText: {
      type: String,
      default: '查看'
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
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据, 只有isTree为true时, 点击操作列的新增按钮才会有值
     */
    onNew: {
      type: Function,
      default: undefined
    },
    /**
     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onEdit: {
      type: Function,
      default: undefined
    },
    /**
     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise
     * 多选时, 参数为selected, 代表选中的行组成的数组; 非多选时参数为row, 代表单行的数据
     */
    onDelete: {
      type: Function,
      default: undefined
    },
    /**
     * 是否分页。如果不分页，则请求传参page=-1
     */
    hasPagination: {
      type: Boolean,
      default: true
    },
    /**
     * 分页组件的子组件布局，子组件名用逗号分隔，对应element-ui pagination的layout属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    /**
     * 分页组件的每页显示个数选择器的选项设置，对应element-ui pagination的page-sizes属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },
    /**
     * 分页组件的每页显示个数选择器默认选项，对应element-ui pagination的page-size属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/pagination
     */
    paginationSize: {
      type: Number,
      default: 10
    },
    /**
     * @deprecated
     * 不分页时的size的大小(建议接口约定，不分页时传参page=-1，故一般不会用到此属性)
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
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-attributes
     */
    tableAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 操作列属性
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/table#table-column-attributes
     */
    operationAttrs: {
      type: Object,
      default() {
        return {width: '', fixed: 'right'}
      }
    },
    /**
     * 新增弹窗的标题，默认为newText的值
     */
    dialogNewTitle: {
      type: String,
      default() {
        return this.newText
      }
    },
    /**
     * 修改弹窗的标题，默认为editText的值
     */
    dialogEditTitle: {
      type: String,
      default() {
        return this.editText
      }
    },
    /**
     * 查看弹窗的标题，默认为viewText的值
     */
    dialogViewTitle: {
      type: String,
      default() {
        return this.viewText
      }
    },
    /**
     * 弹窗表单, 用于新增与修改, 详情配置参考el-form-renderer
     * @link https://femessage.github.io/el-form-renderer/
     */
    form: {
      type: Array,
      default() {
        return []
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 对话框属性设置, 详情配置参考element-ui官网
     * @link https://element.eleme.cn/2.4/#/zh-CN/component/dialog#attributes
     */
    dialogAttrs: {
      type: Object,
      default() {
        return {}
      }
    },
    /**
     * 同extraBody
     * @deprecated
     */
    extraParams: {
      type: Object,
      default() {
        return undefined
      }
    },
    /**
     * 新增/修改提交时，请求体带上额外的参数。
     */
    extraBody: {
      type: Object,
      default() {
        return undefined
      }
    },
    /**
     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求
     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗
     */
    beforeConfirm: {
      type: Function,
      default() {
        return Promise.resolve()
      }
    },
    /**
     * 同extraQuery
     * @deprecated
     */
    customQuery: {
      type: Object,
      default() {
        return undefined
      }
    },
    /**
     * 向请求url添加的额外参数。
     * 可用.sync修饰，此时点击重置按钮后该参数也会被重置
     */
    extraQuery: {
      type: Object,
      default() {
        return undefined
      }
    },
    /**
     * 是否开启使用url保存query参数的功能
     */
    saveQuery: {
      type: Boolean,
      default: true
    },
    /**
     * 操作栏按钮类型
     * `text` 为文本按钮, `button` 为普通按钮
     */
    operationButtonType: {
      type: String,
      default: 'text'
    },
    /**
     * 设置 `按钮` 大小
     * @see https://element.eleme.cn/#/zh-CN/component/button#bu-tong-chi-cun
     */
    buttonSize: {
      type: String,
      default: 'small'
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
      // 多选项的数组
      selected: [],

      // 要修改的那一行
      row: {},

      // 初始的extraQuery值, 重置查询时, 会用到
      // JSON.stringify是为了后面深拷贝作准备
      initExtraQuery: JSON.stringify(this.extraQuery || this.customQuery || {}),
      isSearchCollapse: false,
      showNoData: false,
      // 是否请求过flag
      hasRequest: false
    }
  },
  computed: {
    routerMode() {
      return this.$router ? this.$router.mode : 'hash'
    },
    hasSearchForm() {
      return this.searchForm.length || this.$slots.search
    },
    hasHeader() {
      return (
        this.hasNew ||
        (this.hasSelect && this.hasDelete) ||
        this.headerButtons.length ||
        this.canSearchCollapse
      )
    },
    _extraBody() {
      return this.extraBody || this.extraParams || {}
    },
    _extraQuery() {
      return this.extraQuery || this.customQuery || {}
    },
    selectStrategy() {
      return getSelectStrategy(this)
    },
    searchLocatedSlotKeys() {
      return getLocatedSlotKeys(this.$slots, 'search:')
    },
    _searchForm() {
      return transformSearchImmediatelyItem(this.searchForm, this)
    }
  },
  watch: {
    url: {
      handler(val) {
        if (!val) return
        this.page = defaultFirstPage
        // mounted处有updateForm的行为，所以至少在初始执行时要等到nextTick
        this.$nextTick(this.getList)
      },
      immediate: true
    },
    selected(val) {
      /**
       * 多选项发生变化
       * @property {array} rows - 已选中的行数据的数组
       */
      this.$emit('selection-change', val)
    }
  },
  mounted() {
    if (this.saveQuery) {
      const query = queryUtil.get(location.href)
      if (query) {
        this.page = parseInt(query.page)
        this.size = parseInt(query.size)
        // 恢复查询条件，但对slot=search无效
        if (this.$refs.searchForm) {
          delete query.page
          delete query.size
          this.$refs.searchForm.updateForm(query)
        }
      }
    }
  },
  methods: {
    /**
     * 手动刷新列表数据
     * @public
     * @param {boolean} saveQuery - 是否保存query到路由上
     */
    getList() {
      const {url} = this

      if (!url) {
        console.warn('DataTable: url 为空, 不发送请求')
        return
      }

      // 构造query对象
      let query = {}
      if (this.$refs.searchForm) {
        Object.assign(query, this.$refs.searchForm.getFormValue())
      }
      Object.assign(query, this._extraQuery)

      query.size = this.hasPagination ? this.size : this.noPaginationSize

      // 根据偏移值计算接口正确的页数
      const pageOffset = this.firstPage - defaultFirstPage
      query.page = this.hasPagination ? this.page + pageOffset : -1

      // 无效值过滤，注意0是有效值
      query = Object.keys(query)
        .filter(k => ['', undefined, null].indexOf(query[k]) === -1)
        .reduce((obj, k) => {
          obj[k] = query[k].toString().trim()
          return obj
        }, {})

      const queryStr =
        (url.indexOf('?') > -1 ? '&' : '?') +
        queryUtil.stringify(query, '=', '&')

      // 请求开始
      this.loading = true

      // 存储query记录, 便于后面恢复
      if (this.saveQuery) {
        // 存储的page是table的页码，无需偏移
        query.page = this.page
        const newUrl = queryUtil.set(location.href, query, this.routerMode)
        history.replaceState(history.state, 'el-data-table search', newUrl)
      }

      this.$axios
        .get(url + queryStr)
        .then(({data: resp}) => {
          let data = []

          // 不分页
          if (!this.hasPagination) {
            data =
              _get(resp, this.dataPath) ||
              _get(resp, noPaginationDataPath) ||
              []
            this.total = data.length
          } else {
            data = _get(resp, this.dataPath) || []
            this.total = _get(resp, this.totalPath)
          }

          this.data = data

          // 树形结构逻辑
          if (this.isTree) {
            this.data = this.tree2Array(data, this.expandAll)
          }

          // 没有请求过
          if (!this.hasRequest) {
            this.showNoData = this.$slots['no-data'] && this.total === 0
            this.hasRequest = true
          }

          this.loading = false
          /**
           * 请求返回, 数据更新后触发
           * @property {object} data - table的数据
           * @property {object} resp - 请求返回的完整response
           */
          this.$emit('update', data, resp)

          // 开启persistSelection时，需要同步selected状态到el-table中
          this.$nextTick(() => {
            this.selectStrategy.updateElTableSelection()
          })
        })
        .catch(err => {
          /**
           * 请求数据失败，返回err对象
           * @event error
           */
          this.$emit('error', err)
          this.loading = false
        })
    },
    search() {
      this.$refs.searchForm.validate(valid => {
        if (!valid) return

        this.beforeSearch()
          .then(() => {
            this.page = defaultFirstPage
            this.getList()
          })
          .catch(err => {
            this.$emit('error', err)
          })
      })
    },
    /**
     * 重置查询，相当于点击「重置」按钮
     *
     * @public
     */
    resetSearch() {
      // reset后, form里的值会变成 undefined, 在下一次查询会赋值给query
      this.$refs.searchForm.resetFields()
      this.page = defaultFirstPage

      // 重置
      if (this.saveQuery) {
        const newUrl = queryUtil.clear(location.href)
        history.replaceState(history.state, '', newUrl)
      }

      /**
       * 按下重置按钮后触发
       */
      this.$emit('reset')

      this.$emit('update:customQuery', JSON.parse(this.initExtraQuery))
      this.$emit('update:extraQuery', JSON.parse(this.initExtraQuery))

      this.$nextTick(() => {
        this.getList()
      })
    },
    handleSizeChange(val) {
      if (this.size === val) return

      this.page = defaultFirstPage
      this.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      if (this.page === val) return

      this.page = val
      this.getList()
    },
    /**
     * 切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否
     *
     * @public
     * @param {object} row - 要更新的数据行
     * @param {boolean} isSelected - 是否被勾选
     */
    toggleRowSelection(row, isSelected) {
      return this.selectStrategy.toggleRowSelection(row, isSelected)
    },
    /**
     * 清空多选项
     *
     * @public
     */
    clearSelection() {
      return this.selectStrategy.clearSelection()
    },
    // 弹窗相关
    // 除非树形结构在操作列点击新增, 否则 row 是 MouseEvent
    onDefaultNew(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.new)
    },
    onDefaultView(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.view, row)
    },
    onDefaultEdit(row) {
      this.row = row
      this.$refs.dialog.show(dialogModes.edit, row)
    },
    async onConfirm(isNew, formValue, done) {
      const data = {
        ...formValue,
        ...this._extraBody
      }

      if (this.isTree) {
        data[this.treeParentKey] = isNew
          ? this.row[this.treeParentValue]
          : this.row[this.treeParentKey]
      }

      try {
        await this.beforeConfirm(data, isNew)
        const customMethod = isNew ? 'onNew' : 'onEdit'

        if (this[customMethod]) {
          await this[customMethod](data, this.row)
        } else {
          // 默认新增/修改逻辑
          const [method, url] = isNew
            ? ['post', this.url]
            : ['put', `${this.url}/${this.row[this.id]}`]

          await this.$axios[method](url, data)
        }
        this.getList()
        this.showMessage(true)
        done()
      } catch (e) {
        // 出错则不关闭dialog
        done(false)
      }
    },
    onDefaultDelete(row) {
      this.$confirm('确认删除吗', '提示', {
        type: 'warning',
        confirmButtonClass: 'el-button--danger',
        beforeClose: async (action, instance, done) => {
          if (action !== 'confirm') return done()

          instance.confirmButtonLoading = true

          try {
            if (this.onDelete) {
              // 自定义删除逻辑
              if (this.hasSelect) {
                await this.onDelete(
                  this.single ? this.selected[0] : this.selected
                )
              } else {
                await this.onDelete(row)
              }
            } else if (this.hasSelect) {
              // 多选模式
              await this.$axios.delete(
                this.url + '/' + this.selected.map(v => v[this.id]).join(',')
              )
            } else {
              // 单个删除
              await this.$axios.delete(this.url + '/' + row[this.id])
            }
            done()
            this.showMessage(true)
            let deleteCount = 1
            if (this.hasSelect) {
              deleteCount = this.selected.length
              this.clearSelection()
            }
            const remain = this.data.length - deleteCount
            const lastPage = Math.ceil(this.total / this.size)
            if (
              remain === 0 &&
              this.page === lastPage &&
              this.page > defaultFirstPage
            )
              this.page--
            this.getList()
          } catch (error) {
            // do nothing
          } finally {
            instance.confirmButtonLoading = false
          }
        }
      }).catch(() => {
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
      return show ? 'row-show' : 'row-hide'
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
<style lang="less">
.el-data-table {
  @color-blue: #2196f3;
  @space-width: 18px;

  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: @space-width;
    height: 14px;

    &::before {
      content: '';
    }
  }

  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: @color-blue;
  }

  @keyframes treeTableShow {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .row-show {
    animation: treeTableShow 1s;
  }

  .row-hide {
    display: none;
  }
}
</style>
