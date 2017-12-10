<template>
    <div>
        <h1 class="wrap-title mar-bottom15">服务列表 <el-button type="primary" @click="addEditorData(0, 'add')" size="mini" class="bread-addbtn">新增服务</el-button></h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="config_id" label="#" width="70"></el-table-column>
                    <!-- <el-table-column prop="config_type" label="类型" width="120">
                        <template slot-scope="scope">
                            {{ scope.row.config_type | configType }}
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="title" label="服务类型" width="150"></el-table-column>
                    <el-table-column prop="images_url" label="服务图片" width="130">
                        <template slot-scope="scope">
                            <el-popover width="350" trigger="click">
                                <img width="100%" :src="scope.row.images_url" alt="获取图片失败">
                                 <el-button size="mini" type="info" slot="reference">查看图片</el-button>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" label="备注" width="180"></el-table-column>
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
                <!-- <el-form-item label="类型">
                    <el-radio-group v-model="form.config_type">
                        <el-radio :label="1">会议室服务</el-radio>
                        <el-radio :label="2">会议室功能</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="服务图片">
                    <feng-image-upload :imageUrl="form.images_url" @increment="handleAvatarScucess"></feng-image-upload>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
// 服务管理
import fengImageUpload from '@/components/fengModule/imageUpload.vue'

export default {
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                config_type: 1,
                title: '',
                images_url: '',
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
        dialogTitle() { return this.marked === 'add' ? '新增服务类型' : '编辑服务类型' }
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
                this.form.config_type = val.row.config_type
                this.form.title = val.row.title
                this.form.images_url = val.row.images_url
                this.form.description = val.row.description
            } else {
                this.form = {
                    config_type: 1,
                    title: '',
                    images_url: '',
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
        },
        handleAvatarScucess(row) {
            // 图片上传成功钩子，接收子组件数据
            this.form.images_url = row
        }
    },
    filters: {
        configType(val) {
            return val === 1 ? '服务' : '功能'
        }
    },
    components: {
        fengImageUpload
    }
}
</script>
