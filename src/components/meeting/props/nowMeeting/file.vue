<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="attachment_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="所属议程" width="140"></el-table-column>
            <el-table-column prop="email" label="材料所属人" width="180"></el-table-column>
            <el-table-column prop="mark" label="材料类型" ></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="mar-top15" @click="addEditorData(0, 'add')">材料录入</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="选择文件">
                    <feng-file-upload text="点击上传" url="/Upload/filesUpload" @increment="handleAvatarScucess"></feng-file-upload>
                </el-form-item>
                <el-form-item label="所属议程">
                    <el-select v-model="form.agenda_id" placeholder="选择所属议程" filterable>
                        <el-option :label="item.title" :value="item.agenda_id" :key="item.agenda_id" v-for="item in agendaList"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="材料所属人">
                    <el-input v-model="form.c"></el-input>
                </el-form-item> -->
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 会议列表 => 查看会议 => 会议文件
import fengFileUpload from '@/components/fengModule/fileUpload.vue'

export default {
    props: ['meetingId'],
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                file_url: '',
                agenda_id: '',
                title: ''
            },
            moduleData: {
                list: []
            },
            agendaList: []
        }
    },
    created() {
        this.getModuleData()
        this.getAgendaList()
    },
    computed: {
        userId() { return this.$store.getters.getUserId },
        dialogTitle() { return this.marked === 'add' ? '新增议程' : '编辑议程' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/Meeting/getAttachmentList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getAgendaList() {
            this.$api.apiCommunication('/Meeting/getAgendaList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.agendaList = response.data.list ? response.data.list : []
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
                    file_url: '',
                    agenda_id: '',
                    title: ''
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
                            owner_id: this.userId
                        },
                        apiname = this.marked === 'add' ? '/Meeting/createAttachment' : '/Meeting/updateAgenda'
                    Object.assign(param, this.form)
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
        },
        handleAvatarScucess(val) {
            this.form.file_url = val.data.url
            this.form.title = val.data.filename
        }
    },
    components: {
        fengFileUpload
    }
}
</script>
