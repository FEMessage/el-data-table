import _get from 'lodash.get';
import qs from 'qs';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".el-data-table .ms-tree-space { position: relative; top: 1px; display: inline-block; font-style: normal; font-weight: 400; line-height: 1; width: 18px; height: 14px; } .el-data-table .ms-tree-space::before { content: ''; } .el-data-table .tree-ctrl { position: relative; cursor: pointer; color: #2196f3; } @-moz-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @-webkit-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @-o-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

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

var defaultFirstPage = 1;

var dataPath = 'payload.content';
var totalPath = 'payload.totalElements';
var noPaginationDataPath = 'payload';

var treeChildKey = 'children';
var treeParentKey = 'parentId';
var treeParentValue = 'id';
var defaultId = 'id';

var dialogForm = 'dialogForm';

var equal = '=';
var equalPattern = /=/g;

var valueSeparator = '~';
var paramSeparator = ',';

var valueSeparatorPattern = new RegExp(valueSeparator, 'g');

var queryFlag = 'q=';
var queryPattern = new RegExp('q=.*' + paramSeparator);

var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-data-table"},[(_vm.searchForm.length > 0 || !!_vm.$slots.search)?_c('el-form-renderer',{ref:"searchForm",attrs:{"inline":"","content":_vm.searchForm}},[_vm._t("search"),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"native-type":"submit","type":"primary","size":"small"},on:{"click":_vm.search}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{attrs:{"size":"small"},on:{"click":_vm.resetSearch}},[_vm._v("重置")])],1)],2):_vm._e(),_vm._v(" "),(_vm.hasNew || _vm.hasDelete || _vm.headerButtons.length > 0 )?_c('el-form',[_c('el-form-item',[(_vm.hasNew)?_c('el-button',{attrs:{"type":"primary","size":"small"},on:{"click":_vm.onDefaultNew}},[_vm._v("新增")]):_vm._e(),_vm._v(" "),_vm._l((_vm.headerButtons),function(btn,i){return ('show' in btn ? btn.show(_vm.selected) : true)?_c('el-button',_vm._b({directives:[{name:"loading",rawName:"v-loading",value:(_vm.customButtonsLoading),expression:"customButtonsLoading"}],key:i,attrs:{"disabled":'disabled' in btn ? btn.disabled(_vm.selected) : false,"size":"small"},on:{"click":function($event){_vm.onCustomButtonsClick(btn.atClick, _vm.selected);}}},'el-button',btn,false),[_vm._v(_vm._s(btn.text))]):_vm._e()}),_vm._v(" "),(_vm.hasSelect && _vm.hasDelete)?_c('el-button',{attrs:{"type":"danger","size":"small","disabled":_vm.single ? (!_vm.selected.length || _vm.selected.length > 1) : !_vm.selected.length},on:{"click":function($event){_vm.onDefaultDelete($event);}}},[_vm._v("删除")]):_vm._e()],2)],1):_vm._e(),_vm._v(" "),_c('el-table',_vm._b({directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"table",attrs:{"data":_vm.data,"row-style":_vm.showRow},on:{"selection-change":_vm.handleSelectionChange}},'el-table',_vm.tableAttrs,false),[(_vm.isTree)?[(_vm.hasSelect)?[_c('el-table-column',_vm._b({key:"selection-key"},'el-table-column',_vm.columns[0],false)),_vm._v(" "),_c('el-table-column',_vm._b({key:"tree-ctrl",scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._l((scope.row._level),function(space){return (_vm.isTree)?_c('span',{key:space,staticClass:"ms-tree-space"}):_vm._e()}),_vm._v(" "),(_vm.isTree && _vm.iconShow(scope.$index, scope.row))?_c('span',{staticClass:"tree-ctrl",on:{"click":function($event){_vm.toggleExpanded(scope.$index);}}},[(!scope.row._expanded)?_c('i',{staticClass:"el-icon-plus"}):_c('i',{staticClass:"el-icon-minus"})]):_vm._e(),_vm._v(" "+_vm._s(scope.row[_vm.columns[1].prop])+" ")]}}])},'el-table-column',_vm.columns[1],false)),_vm._v(" "),_vm._l((_vm.columns.filter(function (c, i) { return i !== 0 && i !== 1; })),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))})]:[_c('el-table-column',_vm._b({key:"tree-ctrl",scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._l((scope.row._level),function(space){return (_vm.isTree)?_c('span',{key:space,staticClass:"ms-tree-space"}):_vm._e()}),_vm._v(" "),(_vm.isTree && _vm.iconShow(scope.$index, scope.row))?_c('span',{staticClass:"tree-ctrl",on:{"click":function($event){_vm.toggleExpanded(scope.$index);}}},[(!scope.row._expanded)?_c('i',{staticClass:"el-icon-plus"}):_c('i',{staticClass:"el-icon-minus"})]):_vm._e(),_vm._v(" "+_vm._s(scope.row[_vm.columns[0].prop])+" ")]}}])},'el-table-column',_vm.columns[0],false)),_vm._v(" "),_vm._l((_vm.columns.filter(function (c, i) { return i !== 0; })),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))})]]:_vm._l((_vm.columns),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))}),_vm._v(" "),(_vm.hasOperation)?_c('el-table-column',_vm._b({attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.isTree && _vm.hasNew)?_c('el-button',{attrs:{"type":"primary","size":"small"},on:{"click":function($event){_vm.onDefaultNew(scope.row);}}},[_vm._v("新增")]):_vm._e(),_vm._v(" "),(_vm.hasEdit)?_c('el-button',{attrs:{"size":"small"},on:{"click":function($event){_vm.onDefaultEdit(scope.row);}}},[_vm._v(" 修改 ")]):_vm._e(),_vm._v(" "),(_vm.hasView)?_c('el-button',{attrs:{"type":"info","size":"small"},on:{"click":function($event){_vm.onDefaultView(scope.row);}}},[_vm._v(" 查看 ")]):_vm._e(),_vm._v(" "),_vm._l((_vm.extraButtons),function(btn,i){return ('show' in btn ? btn.show(scope.row) : true)?_c('el-button',_vm._b({directives:[{name:"loading",rawName:"v-loading",value:(_vm.customButtonsLoading),expression:"customButtonsLoading"}],key:i,attrs:{"size":"small"},on:{"click":function($event){_vm.onCustomButtonsClick(btn.atClick, scope.row);}}},'el-button',btn,false),[_vm._v(" "+_vm._s(btn.text)+" ")]):_vm._e()}),_vm._v(" "),(!_vm.hasSelect && _vm.hasDelete && _vm.canDelete(scope.row))?_c('el-button',{attrs:{"type":"danger","size":"small"},on:{"click":function($event){_vm.onDefaultDelete(scope.row);}}},[_vm._v(" 删除 ")]):_vm._e()]}}])},'el-table-column',_vm.operationAttrs,false)):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),(_vm.hasPagination)?_c('el-pagination',{staticStyle:{"text-align":"right","padding":"10px 0"},attrs:{"current-page":_vm.page,"page-sizes":_vm.paginationSizes,"page-size":_vm.size,"total":_vm.total,"layout":_vm.paginationLayout},on:{"size-change":_vm.handleSizeChange,"current-change":_vm.handleCurrentChange}}):_vm._e(),_vm._v(" "),(_vm.hasDialog)?_c('el-dialog',{attrs:{"title":_vm.dialogTitle,"visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event;}}},[_c('el-form-renderer',_vm._b({ref:"dialogForm",attrs:{"content":_vm.form,"disabled":_vm.isView}},'el-form-renderer',_vm.formAttrs,false),[_vm._t("form")],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isView),expression:"!isView"}],attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"size":"small"},on:{"click":_vm.cancel}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.confirmLoading),expression:"confirmLoading"}],attrs:{"type":"primary","size":"small"},on:{"click":_vm.confirm}},[_vm._v("确 定")])],1)],1):_vm._e()],1)},staticRenderFns: [],
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
      default: function default$1() {
        return []
      }
    },
    /**
     * 查询字段渲染, 配置参考el-form-renderer
     * @link https://github.com/FEMessage/el-form-renderer/blob/master/README.md
     */
    searchForm: {
      type: Array,
      default: function default$2() {
        return []
      }
    },
    /**
     * 点击查询按钮, 查询前执行的函数, 需要返回Promise
     */
    beforeSearch: {
      type: Function,
      default: function default$3() {
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
     * 操作列的自定义按钮, 渲染的是element-ui的button, 支持包括style在内的以下属性:
     * {type: '', text: '', atClick: row => Promise.resolve(), show: row => return true时显示 }
     * 点击事件 row参数 表示当前行数据, 需要返回Promise, 默认点击后会刷新table, resolve(false) 则不刷新
     */
    extraButtons: {
      type: Array,
      default: function default$4() {
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
      default: function default$5() {
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
      default: function default$6() {
        return true
      }
    },
    /**
     * 点击新增按钮时的方法, 当默认新增方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据, 只有isTree为true时, 点击操作列的新增按钮才会有值
     */
    onNew: {
      type: Function
    },
    /**
     * 点击修改按钮时的方法, 当默认修改方法不满足需求时使用, 需要返回promise
     * 参数(data, row) data 是form表单的数据, row 是当前行的数据
     */
    onEdit: {
      type: Function
    },
    /**
     * 点击删除按钮时的方法, 当默认删除方法不满足需求时使用, 需要返回promise
     * 多选时, 参数为selected, 代表选中的行组成的数组; 非多选时参数为row, 代表单行的数据
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
      default: function () { return [10, 20, 30, 40, 50]; }
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
      default: function default$7() {
        return {}
      }
    },
    /**
     * 操作列属性
     */
    operationAttrs: {
      type: Object,
      default: function default$8() {
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
     * @link https://github.com/FEMessage/el-form-renderer/blob/master/README.md
     */
    form: {
      type: Array,
      default: function default$9() {
        return []
      }
    },
    /**
     * 弹窗表单属性设置, 详情配置参考element-ui官网
     * @link http://element.eleme.io/#/zh-CN/component/form#form-attributes
     */
    formAttrs: {
      type: Object,
      default: function default$10() {
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
     * 在新增/修改弹窗 点击确认时调用，返回Promise, 如果reject, 则不会发送新增/修改请求
     * 参数: (data, isNew) data为表单数据, isNew true 表示是新增弹窗, false 为 编辑弹窗
     */
    beforeConfirm: {
      type: Function,
      default: function default$11() {
        return Promise.resolve()
      }
    },
    /**
     * 外部的注入额外的查询参数, 键值对形式
     */
    customQuery: {
      type: Object,
      default: function default$12() {
        return {}
      }
    }
  },
  data: function data() {
    return {
      data: [],
      hasSelect: this.columns.length && this.columns[0].type == 'selection',
      size: this.paginationSize || this.paginationSizes[0],
      page: defaultFirstPage,
      // https://github.com/ElemeFE/element/issues/1153
      total: null,
      loading: false,
      selected: [],

      customButtonsLoading: false,

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
  watch: {
    url: function(val, old) {
      this.page = defaultFirstPage;
      this.getList();
    },
    dialogVisible: function(val, old) {
      if (!val) {
        this.isNew = false;
        this.isEdit = false;
        this.isView = false;
        this.confirmLoading = false;

        this.$refs[dialogForm].resetFields();
      }
    }
  },
  mounted: function mounted() {
    var this$1 = this;

    var searchForm = this.$refs.searchForm;

    if (searchForm) {
      // 阻止表单提交的默认行为
      // https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2
      searchForm.$el.setAttribute('action', 'javascript:;');

      // 恢复查询条件
      var matches = location.href.match(queryPattern);

      if (matches) {
        var query = matches[0].substr(2).replace(valueSeparatorPattern, equal);
        var params = qs.parse(query, {delimiter: paramSeparator});

        // page size 特殊处理
        this.page = params.page * 1;
        this.size = params.size * 1;

        // 对slot=search无效
        searchForm.updateForm(
          Object.keys(params).reduce(function (acc, k) {
            if (k !== 'page' && k !== 'size') {
              acc[k] = params[k];
            }
            return acc
          }, {})
        );
      }
    }

    this.$nextTick(function () {
      this$1.getList();
    });
  },
  methods: {
    getList: function getList(shouldStoreQuery) {
      var this$1 = this;

      var searchForm = this.$refs.searchForm;
      var formQuery = searchForm ? searchForm.getFormValue() : {};
      // TODO Object.assign IE不支持, 所以后面Object.keys的保守其实是没有必要的。。。
      var query = Object.assign({}, formQuery, this.customQuery);

      var url = this.url;
      var params = '';
      var size = this.hasPagination ? this.size : this.noPaginationSize;

      if (!url) {
        console.warn('DataTable: url 为空, 不发送请求');
        return
      }

      // 构造查询url
      if (url.indexOf('?') > -1) { url += '&'; }
      else { url += '?'; }

      params += "size=" + size;

      // 无效值过滤. query 有可能值为 0, 所以只能这样过滤
      // TODO Object.values IE11不兼容, 暂时使用Object.keys
      params += Object.keys(query)
        .filter(function (k) {
          return query[k] !== '' && query[k] !== null && query[k] !== undefined
        })
        .reduce(
          function (params, k) { return (params += "&" + k + "=" + (encodeURIComponent(
              query[k].toString().trim()
            ))); },
          ''
        );

      // 根据偏移值计算接口正确的页数
      var pageOffset = this.firstPage - defaultFirstPage;
      var page = this.page + pageOffset;

      // 请求开始
      this.loading = true;

      this.$axios
        .get(url + params + "&page=" + page)
        .then(function (resp) {
          var res = resp.data;
          var data = [];

          // 不分页
          if (!this$1.hasPagination) {
            data =
              _get(res, this$1.dataPath) || _get(res, noPaginationDataPath) || [];
          } else {
            data = _get(res, this$1.dataPath) || [];
            this$1.total = _get(res, this$1.totalPath);
          }

          this$1.data = data;

          // 树形结构逻辑
          if (this$1.isTree) {
            this$1.data = this$1.tree2Array(data, this$1.expandAll);
          }

          this$1.loading = false;
          /**
           * 请求返回, 数据更新后触发, 返回(data, resp) data是渲染table的数据, resp是请求返回的完整response
           * @event update
           */
          this$1.$emit('update', data, res);
        })
        .catch(function (err) {
          /**
           * 请求数据失败，返回err对象
           * @event error
           */
          this$1.$emit('error', err);
          this$1.loading = false;
        });

      // 存储query记录, 便于后面恢复
      if (this.routerMode && shouldStoreQuery > 0) {
        var newUrl = '';
        var searchQuery =
          queryFlag +
          (params + "&page=" + (this.page))
            .replace(/&/g, paramSeparator)
            .replace(equalPattern, valueSeparator) +
          paramSeparator;

        // 非第一次查询
        if (location.href.indexOf(queryFlag) > -1) {
          newUrl = location.href.replace(queryPattern, searchQuery);
        } else if (this.routerMode == 'hash') {
          var search =
            location.hash.indexOf('?') > -1
              ? ("&" + searchQuery)
              : ("?" + searchQuery);
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            location.hash +
            search;
        } else {
          var search$1 = location.search ? ("&" + searchQuery) : ("?" + searchQuery);
          newUrl =
            location.origin +
            location.pathname +
            location.search +
            search$1 +
            location.hash;
        }

        history.pushState(history.state, 'el-data-table search', newUrl);
      }
    },
    search: function search() {
      var this$1 = this;

      this.$refs.searchForm.validate(function (valid) {
        if (!valid) { return }

        this$1.beforeSearch()
          .then(function () {
            this$1.page = defaultFirstPage;
            this$1.getList(true);
          })
          .catch(function (err) {
            this$1.$emit('error', err);
          });
      });
    },
    resetSearch: function resetSearch() {
      var this$1 = this;

      // reset后, form里的值会变成 undefined, 在下一次查询会赋值给query
      this.$refs.searchForm.resetFields();
      this.page = defaultFirstPage;

      // 重置
      history.replaceState(
        history.state,
        '',
        location.href.replace(queryPattern, '')
      );

      this.$nextTick(function () {
        this$1.getList();
      });

      /**
       * 按下重置按钮后触发,
       * 另外, 当customQuery.sync时, 会重置customQuery
       * @event reset
       */
      this.$emit('reset');

      this.$emit(
        'update:customQuery',
        Object.assign(this.customQuery, JSON.parse(this.initCustomQuery))
      );
    },
    handleSizeChange: function handleSizeChange(val) {
      if (this.size === val) { return }

      this.page = defaultFirstPage;
      this.size = val;
      this.getList(true);
    },
    handleCurrentChange: function handleCurrentChange(val) {
      if (this.page === val) { return }

      this.page = val;
      this.getList(true);
    },
    handleSelectionChange: function handleSelectionChange(val) {
      this.selected = val;

      /**
       * 多选启用时生效, 返回(selected)已选中行的数组
       * @event selection-change
       */
      this.$emit('selection-change', val);
    },
    // 弹窗相关
    // 除非树形结构在操作列点击新增, 否则 row 都是 undefined
    onDefaultNew: function onDefaultNew(row) {
      if ( row === void 0 ) row = {};

      this.row = row;
      this.isNew = true;
      this.isEdit = false;
      this.isView = false;
      this.dialogTitle = this.dialogNewTitle;
      this.dialogVisible = true;
    },
    onDefaultView: function onDefaultView(row) {
      var this$1 = this;

      this.row = row;
      this.isView = true;
      this.isNew = false;
      this.isEdit = false;
      this.dialogTitle = this.dialogViewTitle;
      this.dialogVisible = true;

      // 给表单填充值
      this.$nextTick(function () {
        this$1.$refs[dialogForm].updateForm(row);
      });
    },
    onDefaultEdit: function onDefaultEdit(row) {
      var this$1 = this;

      this.row = row;
      this.isEdit = true;
      this.isNew = false;
      this.isView = false;
      this.dialogTitle = this.dialogEditTitle;
      this.dialogVisible = true;

      // 给表单填充值
      this.$nextTick(function () {
        this$1.$refs[dialogForm].updateForm(row);
      });
    },
    cancel: function cancel() {
      this.dialogVisible = false;
    },
    confirm: function confirm() {
      var this$1 = this;

      if (this.isView) {
        this.cancel();
        return
      }

      this.$refs[dialogForm].validate(function (valid) {
        if (!valid) { return false }

        var data = Object.assign(
          {},
          this$1.$refs[dialogForm].getFormValue(),
          this$1.extraParams
        );

        if (this$1.isTree) {
          if (this$1.isNew)
            { data[this$1.treeParentKey] = this$1.row[this$1.treeParentValue]; }
          else { data[this$1.treeParentKey] = this$1.row[this$1.treeParentKey]; }
        }

        this$1.beforeConfirm(data, this$1.isNew)
          .then(function (resp) {
            var condiction = 'isNew';
            var customMethod = 'onNew';

            if (this$1.isEdit) {
              condiction = 'isEdit';
              customMethod = 'onEdit';
            }

            if (this$1[condiction] && this$1[customMethod]) {
              this$1[customMethod](data, this$1.row)
                .then(function (resp) {
                  this$1.getList();
                  this$1.showMessage(true);
                  this$1.cancel();
                })
                .catch(function (e) {});
              return
            }

            // 默认新增/修改逻辑
            var method = 'post';
            var url = this$1.url + '';

            if (this$1.isEdit) {
              method = 'put';
              url += "/" + (this$1.row[this$1.id]);
            }

            this$1.confirmLoading = true;

            this$1.$axios[method](url, data)
              .then(function (resp) {
                this$1.getList();
                this$1.showMessage(true);
                this$1.cancel();
              })
              .catch(function (err) {
                this$1.confirmLoading = false;
              });
          })
          .catch(function (e) {});
      });
    },
    onDefaultDelete: function onDefaultDelete(row) {
      var this$1 = this;

      this.$confirm('确认删除吗', '提示', {
        type: 'warning',
        beforeClose: function (action, instance, done) {
          if (action == 'confirm') {
            instance.confirmButtonLoading = true;

            if (this$1.onDelete) {
              this$1.onDelete(
                this$1.hasSelect
                  ? !this$1.single
                    ? this$1.selected
                    : this$1.selected[0]
                  : row
              )
                .then(function (resp) {
                  this$1.showMessage(true);
                  done();
                  this$1.getList();
                })
                .catch(function (e) {})
                .finally(function (e) {
                  instance.confirmButtonLoading = false;
                });
              return
            }

            // 默认删除逻辑
            // 单个删除
            if (!this$1.hasSelect) {
              this$1.$axios
                .delete(this$1.url + '/' + row[this$1.id])
                .then(function (resp) {
                  instance.confirmButtonLoading = false;
                  done();
                  this$1.showMessage(true);
                  this$1.getList();
                })
                .catch(function (er) {
                  instance.confirmButtonLoading = false;
                });
            } else {
              // 多选模式
              this$1.$axios
                .delete(
                  this$1.url + '/' + this$1.selected.map(function (v) { return v[this$1.id]; }).toString()
                )
                .then(function (resp) {
                  instance.confirmButtonLoading = false;
                  done();
                  this$1.showMessage(true);
                  this$1.getList();
                })
                .catch(function (er) {
                  instance.confirmButtonLoading = false;
                });
            }
          } else { done(); }
        }
      }).catch(function (er) {
        /*取消*/
      });
    },
    onCustomButtonsClick: function onCustomButtonsClick(fn, parameter) {
      var this$1 = this;

      if (!fn) { return }

      this.customButtonsLoading = true;

      fn(parameter)
        .then(function (flag) {
          if (flag === false) { return }
          this$1.getList();
        })
        .catch(function (e) {})
        .finally(function (e) {
          this$1.customButtonsLoading = false;
        });
    },
    // 树形table相关
    // https://github.com/PanJiaChen/vue-element-admin/tree/master/src/components/TreeTable
    tree2Array: function tree2Array(data, expandAll, parent, level) {
      var this$1 = this;
      if ( parent === void 0 ) parent = null;
      if ( level === void 0 ) level = null;

      var tmp = [];
      data.forEach(function (record) {
        if (record._expanded === undefined) {
          this$1.$set(record, '_expanded', expandAll);
        }
        var _level = 0;
        if (level !== undefined && level !== null) {
          _level = level + 1;
        }
        this$1.$set(record, '_level', _level);
        // 如果有父元素
        if (parent) {
          this$1.$set(record, 'parent', parent);
        }
        tmp.push(record);

        if (record[this$1.treeChildKey] && record[this$1.treeChildKey].length > 0) {
          var children = this$1.tree2Array(
            record[this$1.treeChildKey],
            expandAll,
            record,
            _level
          );
          tmp = tmp.concat(children);
        }
      });
      return tmp
    },
    showRow: function showRow(row) {
      var show = row.row.parent
        ? row.row.parent._expanded && row.row.parent._show
        : true;
      row.row._show = show;
      return show
        ? 'animation:treeTableShow 1s-webkit-animation:treeTableShow 1s'
        : 'display:none'
    },
    // 切换下级是否展开
    toggleExpanded: function toggleExpanded(trIndex) {
      var record = this.data[trIndex];
      record._expanded = !record._expanded;
    },
    // 图标显示
    iconShow: function iconShow(index, record) {
      //      return index ===0 && record.children && record.children.length > 0;
      return record[this.treeChildKey] && record[this.treeChildKey].length > 0
    },
    showMessage: function showMessage(isSuccess) {
      if ( isSuccess === void 0 ) isSuccess = true;

      if (isSuccess) {
        this.$message({
          type: 'success',
          message: '操作成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '操作失败'
        });
      }
    }
  }
}

// Import vue component

// install function executed by Vue.use()
function install(Vue) {
	if (install.installed) { return; }
	install.installed = true;
	Vue.component('ElDataTable', component);
}

// Create module definition for Vue.use()
var plugin = {
	install: install,
};

// To auto-install when vue is found
var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default component;
export { install };
