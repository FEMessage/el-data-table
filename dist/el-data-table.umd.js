(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash.get'), require('element-ui'), require('el-form-renderer'), require('axios')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash.get', 'element-ui', 'el-form-renderer', 'axios'], factory) :
  (factory((global.ElDataTable = {}),global._get,global.elementUi,global.ElFormRenderer,global.axios));
}(this, (function (exports,_get,elementUi,ElFormRenderer,axios) { 'use strict';

  _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
  ElFormRenderer = ElFormRenderer && ElFormRenderer.hasOwnProperty('default') ? ElFormRenderer['default'] : ElFormRenderer;
  axios = axios && axios.hasOwnProperty('default') ? axios['default'] : axios;

  var obj;
  (function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".ms-tree-space[data-v-329e2f74] { position: relative; top: 1px; display: inline-block; font-style: normal; font-weight: 400; line-height: 1; width: 18px; height: 14px; } .ms-tree-space[data-v-329e2f74]::before { content: ''; } .tree-ctrl[data-v-329e2f74] { position: relative; cursor: pointer; color: #2196f3; } @-moz-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @-webkit-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @-o-keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } @keyframes treeTableShow { from { opacity: 0; } to { opacity: 1; } } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();

  // TODO
  // doc
  // test

  // 默认返回的数据格式如下
  // 可根据实际情况传入 data/total 两个字段的路径
  //          {
  //            "code":0,
  //            "msg":"ok",
  //            "payload":{
  //              "content":[], // 数组
  //              "totalElements":2, // 总数
  //            }
  //          }
  // 如果接口不分页, 则传hasPagination=false, 此时数据取 payload, 当然也可以自定义, 设置dataPath即可

  var dataPath = 'payload.content';
  var totalPath = 'payload.totalElements';
  var noPaginationDataPath = 'payload';

  var treeChildKey = 'children';
  var treeParentKey = 'parentId';
  var treeParentValue = 'id';

  var dialogForm = 'dialogForm';

  // TODO 组件文档待补全
  // 相关事件 selection-change, update (数据更新后触发), reset (重置按钮后触发)
  var component = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-data-table"},[(_vm.searchForm.length > 0)?_c('el-form-renderer',{ref:"searchForm",attrs:{"inline":"","content":_vm.searchForm}},[_vm._t("search"),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":_vm.onSearch}},[_vm._v("查询")]),_vm._v(" "),_c('el-button',{on:{"click":_vm.onResetSearch}},[_vm._v("重置")])],1)],2):_vm._e(),_vm._v(" "),(_vm.hasNew || _vm.hasDelete || _vm.headerButtons.length > 0 )?_c('el-form',[_c('el-form-item',[(_vm.hasNew)?_c('el-button',{attrs:{"type":"primary","size":"small"},on:{"click":_vm.onDefaultNew}},[_vm._v("新增")]):_vm._e(),_vm._v(" "),_vm._l((_vm.headerButtons),function(btn,i){return ('show' in btn ? btn.show(_vm.selected) : true)?_c('el-button',_vm._b({key:i,attrs:{"disabled":'disabled' in btn ? btn.disabled(_vm.selected) : false,"size":"small"},on:{"click":function($event){btn.atClick(_vm.selected);}}},'el-button',btn,false),[_vm._v(_vm._s(btn.text))]):_vm._e()}),_vm._v(" "),(_vm.hasSelect && _vm.hasDelete)?_c('el-button',{attrs:{"type":"danger","size":"small","disabled":_vm.single ? (!_vm.selected.length || _vm.selected.length > 1) : !_vm.selected.length},on:{"click":function($event){_vm.onDefaultDelete($event);}}},[_vm._v("删除")]):_vm._e()],2)],1):_vm._e(),_vm._v(" "),_c('el-table',_vm._b({directives:[{name:"loading",rawName:"v-loading",value:(_vm.loading),expression:"loading"}],ref:"table",attrs:{"data":_vm.data,"row-style":_vm.showRow},on:{"selection-change":_vm.handleSelectionChange}},'el-table',_vm.table,false),[(_vm.isTree)?[(_vm.hasSelect)?[_c('el-table-column',_vm._b({key:"selection-key"},'el-table-column',_vm.columns[0],false)),_vm._v(" "),_c('el-table-column',_vm._b({key:"tree-ctrl",scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._l((scope.row._level),function(space){return (_vm.isTree)?_c('span',{key:space,staticClass:"ms-tree-space"}):_vm._e()}),_vm._v(" "),(_vm.isTree && _vm.iconShow(scope.$index, scope.row))?_c('span',{staticClass:"tree-ctrl",on:{"click":function($event){_vm.toggleExpanded(scope.$index);}}},[(!scope.row._expanded)?_c('i',{staticClass:"el-icon-plus"}):_c('i',{staticClass:"el-icon-minus"})]):_vm._e(),_vm._v(" "+_vm._s(scope.row[_vm.columns[1].prop])+" ")]}}])},'el-table-column',_vm.columns[1],false)),_vm._v(" "),_vm._l((_vm.columns.filter(function (c, i) { return i !== 0 && i !== 1; })),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))})]:[_c('el-table-column',_vm._b({key:"tree-ctrl",scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_vm._l((scope.row._level),function(space){return (_vm.isTree)?_c('span',{key:space,staticClass:"ms-tree-space"}):_vm._e()}),_vm._v(" "),(_vm.isTree && _vm.iconShow(scope.$index, scope.row))?_c('span',{staticClass:"tree-ctrl",on:{"click":function($event){_vm.toggleExpanded(scope.$index);}}},[(!scope.row._expanded)?_c('i',{staticClass:"el-icon-plus"}):_c('i',{staticClass:"el-icon-minus"})]):_vm._e(),_vm._v(" "+_vm._s(scope.row[_vm.columns[0].prop])+" ")]}}])},'el-table-column',_vm.columns[0],false)),_vm._v(" "),_vm._l((_vm.columns.filter(function (c, i) { return i !== 0; })),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))})]]:_vm._l((_vm.columns),function(col){return _c('el-table-column',_vm._b({key:col.prop},'el-table-column',col,false))}),_vm._v(" "),(_vm.hasOperation)?_c('el-table-column',_vm._b({attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [(_vm.isTree && _vm.hasNew)?_c('el-button',{attrs:{"type":"primary","size":"small"},on:{"click":function($event){_vm.onDefaultNew(scope.row);}}},[_vm._v("新增")]):_vm._e(),_vm._v(" "),_vm._l((_vm.extraButtons),function(btn,i){return ('show' in btn ? btn.show(scope.row) : true)?_c('el-button',_vm._b({key:i,attrs:{"size":"small"},on:{"click":function($event){btn.atClick(scope.row);}}},'el-button',btn,false),[_vm._v(_vm._s(btn.text))]):_vm._e()}),_vm._v(" "),(_vm.hasEdit)?_c('el-button',{attrs:{"size":"small"},on:{"click":function($event){_vm.onDefaultEdit(scope.row);}}},[_vm._v(" 修改 ")]):_vm._e(),_vm._v(" "),(!_vm.hasSelect && _vm.hasDelete && _vm.canDelete(scope.row))?_c('el-button',{attrs:{"type":"danger","size":"small"},on:{"click":function($event){_vm.onDefaultDelete(scope.row);}}},[_vm._v(" 删除 ")]):_vm._e()]}}])},'el-table-column',_vm.operationColumn,false)):_vm._e(),_vm._v(" "),_vm._t("default")],2),_vm._v(" "),(_vm.hasPagination)?_c('el-pagination',{staticStyle:{"text-align":"right","padding":"10px 0"},attrs:{"current-page":_vm.page,"page-sizes":[10, 20, 30, 40, 50],"page-size":_vm.size,"total":_vm.total,"layout":"total, sizes, prev, pager, next, jumper"},on:{"size-change":_vm.handleSizeChange,"current-change":_vm.handleCurrentChange}}):_vm._e(),_vm._v(" "),(_vm.hasDialog)?_c('el-dialog',{attrs:{"title":_vm.dialogTitle,"visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event;}}},[_c('el-form-renderer',_vm._b({ref:"dialogForm",attrs:{"content":_vm.form}},'el-form-renderer',_vm.formAttrs,false),[_vm._t("form")],2),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isView),expression:"!isView"}],attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"size":"small"},on:{"click":_vm.cancel}},[_vm._v("取 消")]),_vm._v(" "),_c('el-button',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.confirmLoading),expression:"confirmLoading"}],attrs:{"type":"primary","size":"small"},on:{"click":_vm.confirm}},[_vm._v("确 定")])],1)],1):_vm._e()],1)},staticRenderFns: [],_scopeId: 'data-v-329e2f74',
    name: 'el-data-table',
    components: ( obj = {}, obj[elementUi.Table.name] = elementUi.Table, obj[elementUi.TableColumn.name] = elementUi.TableColumn, obj[elementUi.Pagination.name] = elementUi.Pagination, obj[elementUi.Button.name] = elementUi.Button, obj[elementUi.Dialog.name] = elementUi.Dialog, obj[elementUi.Form.name] = elementUi.Form, obj[elementUi.FormItem.name] = elementUi.FormItem, obj.ElFormRenderer = ElFormRenderer, obj),
    props: {
      url: {
        type: String,
        default: ''
      },
      firstPage: {
        type: Number,
        default: 1
      },
      dataPath: {
        type: String,
        default: dataPath
      },
      totalPath: {
        type: String,
        default: totalPath
      },
      columns: {
        type: Array,
        default: function default$1() {
          return []
        }
      },
      // search字段渲染, 配置参考el-form-renderer
      searchForm: {
        type: Array,
        default: function default$2() {
          return []
        }
      },
      // 存放 element table 属性
      // TODO 命名不对 tableAttrs
      table: {
        type: Object,
        default: function default$3() {
          return {}
        }
      },
      // 单选, 适用场景: 不可以批量删除
      single: {
        type: Boolean,
        default: false
      },
      // 是否有操作列
      hasOperation: {
        type: Boolean,
        default: true
      },
      // 自定义按钮
      extraButtons: {
        type: Array,
        default: function default$4() {
          return [
            // {type: '', text: '', atClick: function (row) {}},
          ]
        }
      },
      // 操作列属性
      // TODO 命名不对 operationAttrs
      operationColumn: {
        type: Object,
        default: function default$5() {
          return {width: '', fixed: 'right'}
        }
      },
      hasNew: {
        type: Boolean,
        default: true
      },
      hasEdit: {
        type: Boolean,
        default: true
      },
      // 这个是多选时的删除
      hasDelete: {
        type: Boolean,
        default: true
      },
      headerButtons: {
        type: Array,
        default: function default$6() {
          return []
        }
      },
      // 单选时行内的删除按钮
      // 返回true/false
      canDelete: {
        type: Function,
        default: function default$7() {
          return true
        }
      },
      onNew: {
        type: Function
      },
      onEdit: {
        type: Function
      },
      onDelete: {
        type: Function
      },
      hasPagination: {
        type: Boolean,
        default: true
      },
      // 不分页时的size的大小
      noPaginationSize: {
        type: Number,
        default: 999
      },
      // 树形结构
      isTree: {
        type: Boolean,
        default: false
      },
      treeChildKey: {
        type: String,
        default: treeChildKey
      },
      treeParentKey: {
        type: String,
        default: treeParentKey
      },
      treeParentValue: {
        type: String,
        default: treeParentValue
      },
      expandAll: {
        type: Boolean,
        default: false
      },
      //弹窗
      hasDialog: {
        type: Boolean,
        default: true
      },
      dialogNewTitle: {
        type: String,
        default: '新增'
      },
      dialogEditTitle: {
        type: String,
        default: '修改'
      },
      dialogViewTitle: {
        type: String,
        default: '查看'
      },
      // 弹窗表单
      // 用于新增与修改
      form: {
        type: Array,
        default: function default$8() {
          return []
        }
      },
      formAttrs: {
        type: Object,
        default: function default$9() {
          return {}
        }
      },
      // 新增/修改提交时注入额外的参数
      extraParams: {
        type: Object
      },
      // 外部的search注入额外的查询参数, 键值对形式
      customQuery: {
        type: Object,
        default: function default$10() {
          return {}
        }
      }
    },
    data: function data() {
      return {
        data: [],
        query: {},
        hasSelect: this.columns.length && this.columns[0].type == 'selection',
        size: 10,
        page: this.firstPage,
        total: 0,
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
    mounted: function mounted() {
      this.getList();
    },
    watch: {
      query: function(val, old) {
        this.page = this.firstPage;
        this.getList();
      },
      url: function(val, old) {
        this.page = this.firstPage;
        this.getList();
      },
      dialogVisible: function(val, old) {
        var this$1 = this;

        if (!val) {
          this.isNew = false;
          this.isEdit = false;
          this.isView = false;
          this.confirmLoading = false;

          this.$refs[dialogForm].resetFields();

          // fix element bug https://github.com/ElemeFE/element/issues/8615
          // 重置select 为multiple==true时值为[undefined]
          this.form.forEach(function (entry) {
            if (entry.$type === 'select' && entry.$el && entry.$el.multiple) {
              this$1.$refs[dialogForm].updateValue({id: entry.$id, value: []});
            }
          });
        }
      }
    },
    methods: {
      getList: function getList() {
        var this$1 = this;

        var url = this.url;
        var query = Object.assign({}, this.query, this.customQuery);
        var size = this.hasPagination ? this.size : this.noPaginationSize;

        if (!url) {
          console.warn('DataTable: url 为空, 不发送请求');
          return
        }

        // 拼接 query
        if (url.indexOf('?') > -1) { url += '&'; }
        else { url += '?'; }

        url += "page=" + (this.page) + "&size=" + size;

        // query 有可能值为 0
        var params = Object.keys(query)
          .filter(
            function (k) { return query[k] !== '' && query[k] !== null && query[k] !== undefined; }
          )
          .reduce(function (params, k) { return (params += "&" + k + "=" + (query[k])); }, '');

        url += params;

        // 请求开始
        this.loading = true;

        axios
          .get(url)
          .then(function (resp) {
            var res = resp.data;
            var data = [];

            // 不分页
            if (!this$1.hasPagination) {
              data = _get(res, this$1.dataPath || noPaginationDataPath) || [];
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
            // 返回原始数据
            this$1.$emit('update', data, res);
          })
          .catch(function (err) {
            this$1.loading = false;
          });
      },
      handleSizeChange: function handleSizeChange(val) {
        if (this.size === val) { return }

        this.size = val;
        this.getList();
      },
      handleCurrentChange: function handleCurrentChange(val) {
        if (this.page === val) { return }

        this.page = val;
        this.getList();
      },
      handleSelectionChange: function handleSelectionChange(val) {
        this.selected = val;
        this.$emit('selection-change', val);
      },
      onSearch: function onSearch() {
        var data = this.$refs.searchForm.getFormValue();
        var customQuery = this.customQuery;
        this.query = Object.assign({}, data, customQuery);
      },
      onResetSearch: function onResetSearch() {
        this.$refs.searchForm.resetFields();
        this.query = {};
        this.$emit('reset');
        this.$emit(
          'update:customQuery',
          Object.assign(this.customQuery, JSON.parse(this.initCustomQuery))
        );
      },
      // 弹窗相关
      // 除非树形结构在操作列点击新增, 否则 row 都是 undefined
      onDefaultNew: function onDefaultNew(row) {
        if ( row === void 0 ) row = {};

        if (this.onNew) {
          return this.onNew(row)
        }

        this.row = row;
        this.isNew = true;
        this.isEdit = false;
        this.isView = false;
        this.dialogTitle = this.dialogNewTitle;
        this.dialogVisible = true;
      },
      onDefaultEdit: function onDefaultEdit(row) {
        var this$1 = this;

        if (this.onEdit) {
          return this.onEdit(row)
        }

        this.row = row;
        this.isEdit = true;
        this.isNew = false;
        this.isView = false;
        this.dialogTitle = this.dialogEditTitle;
        this.dialogVisible = true;

        // 给表单填充值
        this.$nextTick(function () {
          this$1.form.forEach(function (entry) {
            var value = row[entry.$id];

            this$1.$refs[dialogForm].updateValue({id: entry.$id, value: value});
          });
        });
      },
      cancel: function cancel() {
        this.dialogVisible = false;
      },
      confirm: function confirm() {
        var this$1 = this;

        this.$refs[dialogForm].validate(function (valid) {
          if (!valid) { return false }

          if (this$1.isView) {
            this$1.cancel();
            return
          }

          var data = Object.assign(
            {},
            this$1.$refs[dialogForm].getFormValue(),
            this$1.extraParams
          );

          // 默认新增
          var method = 'post';
          var url = this$1.url + '';

          if (this$1.isEdit) {
            method = 'put';
            url += "/" + (this$1.row.id || this$1.row._id);
          }

          if (this$1.isTree) {
            if (this$1.isNew)
              { data[this$1.treeParentKey] = this$1.row[this$1.treeParentValue]; }
            else if (this$1.isEdit)
              { data[this$1.treeParentKey] = this$1.row[this$1.treeParentKey]; }
          }

          this$1.confirmLoading = true;

          axios[method](url, data)
            .then(function (resp) {
              this$1.getList();
              this$1.showMessage(true);
              this$1.cancel();
            })
            .catch(function (err) {
              this$1.confirmLoading = false;
            });
        });
      },
      onDefaultDelete: function onDefaultDelete(row) {
        var this$1 = this;

        if (this.onDelete) {
          return this.onDelete(row)
        }
        this.$confirm('确认删除吗', '提示', {
          type: 'warning',
          beforeClose: function (action, instance, done) {
            if (action == 'confirm') {
              instance.confirmButtonLoading = true;

              // 单个删除
              if (!this$1.hasSelect) {
                axios
                  .delete(this$1.url + '/' + row.id || row._id)
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
                axios
                  .delete(
                    this$1.url +
                      '/' +
                      this$1.selected.map(function (v) { return v._id || v.id; }).toString()
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
              record.children,
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
        return record.children && record.children.length > 0
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

  exports.install = install;
  exports.default = component;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
