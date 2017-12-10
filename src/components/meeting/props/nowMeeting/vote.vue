<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="topic_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="表决主题" width="180"></el-table-column>
            <el-table-column label="表决类型" width="140">
                <template slot-scope="scope">
                    {{ scope.row.topic_type | topicType }}
                </template>
            </el-table-column>
            <el-table-column prop="email" label="表决项"></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="mar-top15" @click="addEditorData(0, 'add')">新增会议表决</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="表决主题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="表决类型">
                    <el-select v-model="form.topic_type" placeholder="选择表决类型" filterable>
                        <el-option label="标准表决 1" :value="1"></el-option>
                        <el-option label="标准表决 2" :value="2"></el-option>
                        <el-option label="自定义表决" :value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="自定义表决" v-if="form.topic_type == '3'">
                    <el-input v-model="form.topic_items"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 会议列表 => 查看会议 => 会议表决
export default {
    props: ['meetingId'],
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                title: '',
                topic_type: '',
                topic_items: ''
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
        dialogTitle() { return this.marked === 'add' ? '新增表决' : '编辑表决' }
    },
    methods: {
        getModuleData() {
            // conference_id
            this.$api.apiCommunication('/Meeting/getVoteList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        addEditorData(val, type) {
            if(type === 'editor') {
                // this.form.config_id = val.row.config_id
            } else {
                this.form = {
                    title: '',
                    topic_type: '',
                    topic_items: ''
                }
            }
            this.marked = type
            this.dialogVisible = true
        },
        submitEditor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                            conference_id: this.meetingId,
                            status: 1
                        },
                        apiname = this.marked === 'add' ? '/Meeting/createVote' : '/Meeting/updateAgenda'
                    Object.assign(param, this.form)
                    if(param.topic_type != 3){
                        delete param.topic_items
                    }
                    this.$api.apiCommunication(apiname, param, response => {
                        this.dialogVisible = false
                        if (response.status === 200) {
                            this.$notify({ title: '系统通知', message: '新增成功', type: 'success' })
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
