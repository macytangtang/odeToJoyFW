<template>
    <div>
        <h1 class="wrap-title mar-bottom15">服务列表 <el-button type="primary" @click="addEditorData(0, 'add')" size="mini" class="bread-addbtn">新增服务</el-button></h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="config_id" label="#" width="70"></el-table-column>
                    <el-table-column prop="title" label="服务类型" width="120"></el-table-column>
                    <el-table-column prop="description" label="备注" width="150"></el-table-column>
                    <el-table-column label="操作" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="addEditorData(scope, 'editor')" size="small">编辑</el-button>
                            <el-button type="danger" @click="deleteData(scope)" size="small">删除</el-button>
						</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="80px" class="content-form">
                <el-form-item label="服务类型">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交信息</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                title: '',
                description: ''
            },
            moduleData: {
                list: []
            }
        }
    },
    created() {
        this.getModuleData()
    },
    computed: {
        dialogTitle() { return this.marked === 'add' ? '新增服务' : '编辑服务' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/Rooms/getRoomsConfigList', {}, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        addEditorData(val, type) {
            if(type === 'editor') {
                this.form.config_id = val.row.config_id
                this.form.title = val.row.title
                this.form.description = val.row.description
            } else {
                this.form = {
                    title: '',
                    description: ''
                }
            }
            this.marked = type
            this.dialogVisible = true
        },
        submitEditor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {},
                        apiname = this.marked === 'add' ? '/Rooms/createRoomsConfig' : '/Rooms/updateRoomsConfig'
                    Object.assign(param, this.form)
                    this.$api.apiCommunication(apiname, param, response => {
                        this.dialogVisible = false
                        if (response.status === 200) {
                            this.getModuleData()
                        } else {
                            this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })
                } else {
                    this.$notify({ title: '系统通知', message: '必填的字段不能为空或数据格式错误，请检查填写后重新提交', type: 'error' })
                }
            })
        },
        deleteData(val) {
            this.$api.apiCommunication('/Rooms/deleteRoomsConfig', { config_id: val.row.config_id }, response => {
                if (response.status === 200) {
                    this.getModuleData()
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    }
}
</script>
