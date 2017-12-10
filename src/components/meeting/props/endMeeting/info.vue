<template>
    <el-form ref="form" :model="form" label-width="95px" class="content-form" style="width: 100%;">
        <el-form-item label="会议名称">
            <el-input v-model="form.title" disabled></el-input>
        </el-form-item>
        <el-form-item label=" ">
            <el-checkbox v-model="form.is_secrecy" disabled>保密会议</el-checkbox>（会议结束后自动系统将删除会议相关材料）
        </el-form-item>
        <el-form-item label="会议室">
            <el-select v-model="form.rooms" placeholder="选择会议室" multiple filterable disabled>
                <el-option :label="item.title" :value="item.room_id" :key="item.room_id" v-for="item in meetingRoom"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-date-picker v-model="form.start_time" type="datetime" placeholder="选择开始时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间">
            <el-date-picker v-model="form.end_time" type="datetime" placeholder="选择结束时间" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" disabled></el-date-picker>
        </el-form-item>
        <el-form-item label="参会人数">
            <el-input v-model="form.conferee_num" disabled></el-input>
        </el-form-item>
        <el-form-item label="会议秘书">
            <el-input v-model="form.clerk_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="申请部门">
            <el-input v-model="form.department" disabled></el-input>
        </el-form-item>
        <el-form-item label="服务提供">
            <el-checkbox-group v-model="form.services" disabled>
                <el-checkbox :label="item.config_id" :key="item.config_id" v-for="item in roomsConfigListService">{{ item.title }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="功能需求">
            <el-checkbox-group v-model="form.functions" disabled>
                <el-checkbox :label="item.config_id" :key="item.config_id" v-for="item in roomsConfigListFunctions">{{ item.title }}</el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.description" disabled></el-input>
        </el-form-item>
    </el-form>
</template>
<script>
// 已结束会议 => 基本信息
export default {
    props: ['meetingId'],
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
        this.getModuleData()
        this.getMeetingRoom()
        this.getRoomsConfigList()
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
        getModuleData() {
            this.$api.apiCommunication('/Meeting/getMeetingInfo', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    let _data = response.data
                    this.form.title = _data.title
                    this.form.is_secrecy = _data.is_secrecy == 1 ? true : false
                    this.form.start_time = new Date(_data.start_time)
                    this.form.end_time = new Date(_data.end_time)
                    this.form.conferee_num = _data.conferee_num
                    this.form.clerk_id = _data.clerk_id
                    this.form.department = _data.department
                    this.form.description = _data.description
                    this.form.services = JSON.parse('[' + String(_data.services.split(',')) + ']')
                    this.form.functions = JSON.parse('[' + String(_data.functions.split(',')) + ']')
                    this.form.rooms = JSON.parse('[' + String(_data.rooms.split(',')) + ']')
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
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
        }
    }
}
</script>
<style >
    .el-checkbox {
        margin-left: 0!important;
        margin-right: 30px;
    }
</style>
