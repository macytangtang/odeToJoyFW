<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="所属议程" width="140"></el-table-column>
            <el-table-column prop="email" label="材料所属人" width="180"></el-table-column>
            <el-table-column prop="mark" label="材料类型" ></el-table-column>
        </el-table>

        <el-button type="primary" size="small" class="mar-top15" @click="addEditorData(0, 'add')">材料录入</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="选择文件">
                    <el-input v-model="form.a"></el-input>
                </el-form-item>
                <el-form-item label="所属议程">
                    <el-select v-model="form.b" placeholder="选择所属议程" filterable>
                        <el-option label="议程一" :value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="材料所属人">
                    <el-input v-model="form.c"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small">提交信息</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 添加会议 => 会议文件
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
            meetingId: this.$store.getters.addMeetingNum.meetingId
        }
    },
    created() {
        // this.getModuleData()
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
    },
    filters: {
        configType(val) {
            return val === 1 ? '服务' : '功能'
        }
    }
}
</script>
