<template>
    <div class="user-wrap">
        <h1 class="wrap-title mar-bottom15">用户列表 <el-button type="primary" @click="addEditorData(0, 'add')" size="mini" class="bread-addbtn">新增用户</el-button></h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="user_id" label="#" width="70"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="mobile" label="电话" width="140"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column label="权限" width="130">
                        <template slot-scope="scope">
                            {{ scope.row.auth | authStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="备注" width="130" show-overflow-tooltip></el-table-column>
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
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权限">
                    <el-select v-model="form.auth" placeholder="选择权限" filterable>
                        <el-option label="管理员" :value="1"></el-option>
                        <el-option label="督导员" :value="2"></el-option>
                        <el-option label="秘书" :value="3"></el-option>
                        <el-option label="其他" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
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
                name: '',
                auth: 1,
                mobile: '',
                email: '',
                password: '',
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
        dialogTitle() { return this.marked === 'add' ? '新增用户' : '编辑用户' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/User/getUserList', {}, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        addEditorData(val, type) {
            if(type === 'editor') {
                let param = val.row
                delete param.create_time
                delete param.sex
                delete param.status
                delete param.update_time
                this.form = param
            } else {
                this.form = {
                    name: '',
                    auth: 1,
                    mobile: '',
                    email: '',
                    password: '',
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
                        apiname = this.marked === 'add' ? '/User/createUser' : '/User/updateUser'
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
            this.$api.apiCommunication('/User/deleteUser', { user_id: val.row.user_id }, response => {
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
