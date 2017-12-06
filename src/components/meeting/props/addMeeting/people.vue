<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="phone" label="职务" width="90"></el-table-column>
            <el-table-column prop="email" label="密码" width="120"></el-table-column>
            <el-table-column prop="email" label="手机" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="email" label="坐席" width="100"></el-table-column>
            <el-table-column prop="mark" label="同屏"></el-table-column>
        </el-table>
        <el-button type="primary" size="small" class="mar-top15" @click="addEditorData(0, 'add')">新增议程</el-button>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="会议职务">
                    <el-select v-model="form.title" placeholder="选择会议职务" filterable>
                        <el-option label="会议主席" value="会议主席"></el-option>
                        <el-option label="会议秘书" value="会议秘书"></el-option>
                        <el-option label="普通参会人" value="普通参会人"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="手机">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="坐席">

                    <!-- <el-checkbox-group v-model="form.services">
                        <el-checkbox :label="item.config_id" :key="item.config_id" v-for="item in seatList">{{ item.title }}</el-checkbox>
                    </el-checkbox-group>

                    <el-select v-model="form.seat_id" placeholder="选择坐席" filterable>
                        <el-option label="随机" :value="0"></el-option>
                        <el-option label="随机" value="随机" :key="item.id" v-for="item in seatList"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label=" ">
                    <el-checkbox v-model="form.can_sync_screen">允许该参会人发起同屏</el-checkbox>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small">提交信息</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
// 添加会议 => 参会人
export default {
    data () {
        return {
            checked: true,
            marked: 'add',
            dialogVisible: false,
            form: {
                name: '',
                title: 1,
                password: '',
                mobile: '',
                email: '',
                seat_id: '',
                can_sync_screen: false
            },
            seatList: [],
            moduleData: {
                list: []
            },
            meetingId: this.$store.getters.addMeetingNum.meetingId
        }
    },
    created() {
        // this.getModuleData()
        // this.getUserConfereesListFile()
    },
    computed: {
        userId() { return this.$store.getters.getUserId },
        dialogTitle() { return this.marked === 'add' ? '新增参会人' : '编辑参会人' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/User/getUserConfereesList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getUserConfereesListFile() {
            // conference_id
            this.$api.apiCommunication('/User/getUserConfereesListFile', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    console.log(response)
                    // this.seatList = response.data.list ? response.data.list : []
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
