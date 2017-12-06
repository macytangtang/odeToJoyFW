<template>
    <el-form ref="form" :model="form" label-width="95px" class="content-form">
        <el-form-item label="会议名称">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-checkbox v-model="form.is_secrecy">保密会议</el-checkbox>（会议结束后自动系统将删除会议相关材料）
        </el-form-item>
        <el-form-item label="会议室">
            <el-select v-model="form.rooms" placeholder="选择会议室" multiple filterable>
                <el-option :label="item.title" :value="item.room_id" :key="item.room_id" v-for="item in meetingRoom"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择结束时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="参会人数">
            <el-input v-model="form.conferee_num"></el-input>
        </el-form-item>
        <el-form-item label="会议秘书">
            <el-input v-model="form.clerk_id"></el-input>
        </el-form-item>
        <el-form-item label="申请部门">
            <el-input v-model="form.department"></el-input>
        </el-form-item>
        <el-form-item label="服务提供">
            <el-checkbox-group v-model="form.services">
                <el-checkbox :label="item.config_id" :key="item.config_id" v-for="item in roomsConfigListService">{{ item.title }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="功能需求">
            <el-checkbox-group v-model="form.functions">
                <el-checkbox :label="item.config_id" :key="item.config_id" v-for="item in roomsConfigListFunctions">{{ item.title }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-button type="primary" size="small" @click="submit('form')">提交信息</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
// 添加会议 => 基本信息
export default {
    data() {
        return {
            checked: false,
            form: {
                title: '',
                is_secrecy: false,
                rooms: [],
                start_time: '',
                end_time: '',
                conferee_num: '',
                clerk_id: '',
                department: '',
                services: [],
                functions: [],
                description: ''
            },
            meetingRoom: [],
            roomsConfigList: []
        }
    },
    created() {
        if(!(this.$store.getters.addMeetingNum.pane !== 'info')) {
            this.getMeetingRoom()
            this.getRoomsConfigList()
        }
    },
    computed: {
        roomsConfigListService() {
            let _arr = []
            for (let item of this.roomsConfigList) {
                if(item.config_type === 1){
                    _arr.push(item)
                }
            }
            return _arr
        },
        roomsConfigListFunctions() {
            let _arr = []
            for (let item of this.roomsConfigList) {
                if(item.config_type === 2){
                    _arr.push(item)
                }
            }
            return _arr
        }
    },
    methods: {
        getMeetingRoom() {
            this.$api.apiCommunication('/Rooms/getRoomsList', {}, response => {
                if (response.status === 200) {
                    if(response.data !== []) {
                        this.meetingRoom = response.data.list
                    } else {
                        this.meetingRoom = []
                    }
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getRoomsConfigList() {
            this.$api.apiCommunication('/Rooms/getRoomsConfigList', {}, response => {
                if (response.status === 200) {
                    if(response.data !== []) {
                        this.roomsConfigList = response.data.list
                    } else {
                        this.roomsConfigList = []
                    }
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                        status: 1
                    }
                    Object.assign(param, this.form)
                    param.services = param.services.join(',')
                    param.functions = param.functions.join(',')
                    param.is_secrecy = param.is_secrecy ? 1 : 0
                    param.rooms = param.rooms.join(',')
                    this.$api.apiCommunication('/Meeting/createMeeting', param, response => {
                        if (response.status === 200) {
                            this.$notify({ title: '系统通知', message: '新增会议成功', type: 'success' })
                            let param = {
                                type: 'save',
                                data: {
                                    pane: 'agenda',
                                    meetingId: response.data
                                }
                            }
                            this.$store.dispatch('addMeetingNum', param)
                        } else {
                            this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                        }
                    })
                } else {
                    this.$notify({ title: '系统通知', message: '必填的字段不能为空或数据格式错误，请检查填写后重新提交', type: 'error' })
                }
            })
        }
    }
}
</script>
