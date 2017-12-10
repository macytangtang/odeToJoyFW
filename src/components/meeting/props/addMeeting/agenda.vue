<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="agenda_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="主题" width="100"></el-table-column>
            <el-table-column prop="start_time" label="起始时间" width="180"></el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="180"></el-table-column>
            <el-table-column prop="hostess_id" label="主持"></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="mar-top15" @click="addEditorData(0, 'add')">新增议程</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="80px" class="content-form">
                <el-form-item label="议程编号">
                    <el-input v-model="form.agenda_code"></el-input>
                </el-form-item>
                <el-form-item label="主题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择结束时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-form-item>
                <el-form-item label="主持人">
                    <el-select v-model="form.hostess_id" placeholder="选择主持人" filterable>
                        <el-option :label="item.name" :value="item.user_id" :key="item.user_id" v-for="item in userList"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 添加会议 => 会议议程
export default {
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                agenda_code: '',
                title: '',
                start_time: '',
                end_time: '',
                hostess_id: ''
            },
            moduleData: {
                list: []
            },
            userList: [],
            meetingId: this.$store.getters.addMeetingNum.meetingId
        }
    },
    created() {
        this.getModuleData()
        this.getUserList()
    },
    computed: {
        dialogTitle() { return this.marked === 'add' ? '新增议程' : '编辑议程' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/Meeting/getAgendaList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getUserList() {
            this.$api.apiCommunication('/User/getUserList', {}, response => {
                if (response.status === 200) {
                    this.userList = response.data.list ? response.data.list : []
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
                    agenda_code: '',
                    title: '',
                    start_time: '',
                    end_time: '',
                    hostess_id: ''
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
                        apiname = this.marked === 'add' ? '/Meeting/createAgenda' : '/Meeting/updateAgenda'
                    Object.assign(param, this.form)
                    this.$api.apiCommunication(apiname, param, response => {
                        this.dialogVisible = false
                        if (response.status === 200) {
                            this.$notify({ title: '系统通知', message: '新增会议议程成功', type: 'success' })
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
