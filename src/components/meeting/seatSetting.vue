<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议室列表 > 坐席设置<el-button type="primary" @click="addEditorData(0, 'add')" size="mini" class="bread-addbtn">新增坐席</el-button></h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="seat_id" label="#" width="70"></el-table-column>
                    <el-table-column prop="seat_code" label="坐席编号" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="seat_ip" label="ip地址" width="140"></el-table-column>
                    <el-table-column label="操作" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="addEditorData(scope, 'editor')" size="small">编辑</el-button>
						</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                会议室布局图
                <img :src="imgMap" class="meeting-imgmap">
            </el-col>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="坐席编号">
                    <el-input v-model="form.seat_code"></el-input>
                </el-form-item>
                <el-form-item label="ip地址">
                    <el-input v-model="form.seat_ip"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" size="small" @click="submitEditor('form')">提交保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
// 会议室管理 => 坐席设置
import '@/static/style/meeting/index.scss'

export default {
    props: ['id'],
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                seat_code: '',
                seat_ip: ''
            },
            imgMap: '',
            moduleData: {
                list: []
            }
        }
    },
    created() {
        this.getModuleData()
        this.getRoomsInfo()
    },
    computed: {
        dialogTitle() { return this.marked === 'add' ? '新增坐席' : '编辑坐席' }
    },
    methods: {
        getModuleData() {
            // 获取坐席列表
            this.$api.apiCommunication('/Rooms/getRoomsSeatsList', { room_id: this.id }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getRoomsInfo() {
            // 获取会议室信息
            this.$api.apiCommunication('/Rooms/getRoomsInfo', { room_id: this.id }, response => {
                if (response.status === 200) {
                    this.imgMap = response.data.img_map
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        addEditorData(val, type) {
            if(type === 'editor') {
                let param = val.row
                delete param.create_time
                delete param.room_id
                delete param.status
                delete param.update_time
                this.form = param
            } else {
                this.form = {
                    seat_code: '',
                    seat_ip: ''
                }
            }
            this.marked = type
            this.dialogVisible = true
        },
        submitEditor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {
                            room_id: this.id
                        },
                        apiname = this.marked === 'add' ? '/Rooms/createRoomsSeats' : '/Rooms/updateRoomsSeats'
                    Object.assign(param, this.form)
                    // if(this.marked === 'add') {
                    //     apiname = '/Rooms/createRoomsSeats'
                    // } else {
                    //     apiname = '/Rooms/updateRoomsSeats'
                    //     // Object.assign(param, { seat_id:  })
                    // }
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
        }
    }
}
</script>
