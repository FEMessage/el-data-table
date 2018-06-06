<template>
    <div class="el-data-table">
        <!--搜索字段-->
        <el-form-renderer v-if="searchForm.length > 0" inline :content="searchForm" ref="searchForm">
            <slot name="search"></slot>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="onResetSearch">重置</el-button>
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
            v-bind="table"
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
                             v-bind="operationColumn"
            >
                <template slot-scope="scope">
                    <el-button v-if="isTree && hasNew" type="primary" size="small"
                               @click="onDefaultNew(scope.row)">新增</el-button>
                    <el-button v-for="(btn, i) in extraButtons"
                               v-if="'show' in btn ? btn.show(scope.row) : true"
                               v-bind="btn" @click="btn.atClick(scope.row)" :key="i" size="small">{{btn.text}}</el-button>
                    <el-button v-if="hasEdit" size="small"
                               @click="onDefaultEdit(scope.row)">
                        修改
                    </el-button>
                    <el-button v-if="!hasSelect && hasDelete && canDelete(scope.row)" type="danger" size="small"
                               @click="onDefaultDelete(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>

            <!--自定义操作列-->
            <slot></slot>

        </el-table>
        <el-pagination
            v-if="hasPagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="size"
            :total="total"
            style="text-align: right; padding: 10px 0"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" v-if="hasDialog">
            <!--https://github.com/leezng/el-form-renderer-->
            <el-form-renderer :content="form" ref="dialogForm" v-bind="formAttrs">
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
    import axios from 'axios'

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

    const dataPath = 'payload.content'
    const totalPath = 'payload.totalElements'
    const noPaginationDataPath = 'payload'

    const treeChildKey = 'children'
    const treeParentKey = 'parentId'
    const treeParentValue = 'id'

    const dialogForm = 'dialogForm'

    // TODO 组件文档待补全
    // 相关事件 selection-change, update (数据更新后触发), reset (重置按钮后触发)
    export default {
        name: 'ElDataTable',
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
                default() {
                    return []
                }
            },
            // search字段渲染, 配置参考el-form-renderer
            searchForm: {
                type: Array,
                default() {
                    return []
                }
            },
            // 存放 element table 属性
            // TODO 命名不对 tableAttrs
            table: {
                type: Object,
                default() {
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
                default() {
                    return [
                        // {type: '', text: '', atClick: function (row) {}},
                    ]
                }
            },
            // 操作列属性
            // TODO 命名不对 operationAttrs
            operationColumn: {
                type: Object,
                default() {
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
                default() {
                    return []
                }
            },
            // 单选时行内的删除按钮
            // 返回true/false
            canDelete: {
                type: Function,
                default() {
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
                default() {
                    return []
                }
            },
            formAttrs: {
                type: Object,
                default() {
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
                default() {
                    return {}
                }
            }
        },
        data() {
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
        mounted() {
            this.getList()
        },
        watch: {
            query: function(val, old) {
                this.page = this.firstPage
                this.getList()
            },
            url: function(val, old) {
                this.page = this.firstPage
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
            getList() {
                let url = this.url
                let query = Object.assign({}, this.query, this.customQuery)
                let size = this.hasPagination ? this.size : this.noPaginationSize

                if (!url) {
                    console.warn('DataTable: url 为空, 不发送请求')
                    return
                }

                // 拼接 query
                if (url.indexOf('?') > -1) url += '&'
                else url += '?'

                url += `page=${this.page}&size=${size}`

                // query 有可能值为 0
                let params = Object.keys(query)
                        .filter(
                            k => query[k] !== '' && query[k] !== null && query[k] !== undefined
            )
            .reduce((params, k) => (params += `&${k}=${query[k]}`), '')

                url += params

                // 请求开始
                this.loading = true

                axios
                    .get(url)
                    .then(resp => {
                    let res = resp.data
                    let data = []

                    // 不分页
                    if (!this.hasPagination) {
                    data = _get(res, this.dataPath || noPaginationDataPath) || []
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
                // 返回原始数据
                this.$emit('update', data, res)
            })
            .catch(err => {
                    this.loading = false
            })
            },
            handleSizeChange(val) {
                if (this.size === val) return

                this.size = val
                this.getList()
            },
            handleCurrentChange(val) {
                if (this.page === val) return

                this.page = val
                this.getList()
            },
            handleSelectionChange(val) {
                this.selected = val
                this.$emit('selection-change', val)
            },
            onSearch() {
                const data = this.$refs.searchForm.getFormValue()
                const customQuery = this.customQuery
                this.query = Object.assign({}, data, customQuery)
            },
            onResetSearch() {
                this.$refs.searchForm.resetFields()
                this.query = {}
                this.$emit('reset')
                this.$emit(
                    'update:customQuery',
                    Object.assign(this.customQuery, JSON.parse(this.initCustomQuery))
                )
            },
            // 弹窗相关
            // 除非树形结构在操作列点击新增, 否则 row 都是 undefined
            onDefaultNew(row = {}) {
                if (this.onNew) {
                    return this.onNew(row)
                }

                this.row = row
                this.isNew = true
                this.isEdit = false
                this.isView = false
                this.dialogTitle = this.dialogNewTitle
                this.dialogVisible = true
            },
            onDefaultEdit(row) {
                if (this.onEdit) {
                    return this.onEdit(row)
                }

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
                    url += `/${this.row.id || this.row._id}`
                }

                if (this.isTree) {
                    if (this.isNew)
                        data[this.treeParentKey] = this.row[this.treeParentValue]
                    else if (this.isEdit)
                        data[this.treeParentKey] = this.row[this.treeParentKey]
                }

                this.confirmLoading = true

                axios[method](url, data)
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
                        axios
                            .delete(this.url + '/' + row.id || row._id)
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
                        axios
                            .delete(
                                this.url +
                                '/' +
                                this.selected.map(v => v._id || v.id).toString()
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
                        record.children,
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
                return record.children && record.children.length > 0
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
</style>
