<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议室列表 <el-button type="primary" @click="addEditorData(0, 'add')" size="mini" class="bread-addbtn">新增会议室</el-button></h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="room_id" label="#" width="70"></el-table-column>
                    <el-table-column prop="title" label="会议室名称" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="location" label="位置" width="140"></el-table-column>
                    <el-table-column prop="seats_num" label="坐席数" width="100" ></el-table-column>
                    <el-table-column prop="manager_id" label="负责人" width="100"></el-table-column>
                    <el-table-column prop="img_map" label="布局" width="130"></el-table-column>
                    <el-table-column label="状态" width="90">
                        <template slot-scope="scope">
                            {{ scope.row.status | meetingroomStatus }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" min-width="250">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="addEditorData(scope, 'editor')" size="small">编辑</el-button>
                            <el-button type="danger" @click="deleteData(scope)" size="small">删除</el-button>
                            <el-button type="success" size="small" @click="seatSetting(scope)">坐席设置</el-button>
						</template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible">
            <el-form ref="form" :model="form" label-width="95px" class="content-form">
                <el-form-item label="会议室名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="位置">
                    <el-input v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item label="坐席数量">
                    <el-input v-model="form.seats_num"></el-input>
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="form.manager_id"></el-input>
                </el-form-item>
                <el-form-item label="布局">
                    <feng-image-upload :imageUrl="form.img_map" @increment="handleAvatarScucess"></feng-image-upload>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="状态" filterable>
                        <el-option label="可用" :value="1"></el-option>
                        <el-option label="禁用" :value="-1"></el-option>
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
import fengImageUpload from '@/components/fengModule/imageUpload.vue'

export default {
    data () {
        return {
            marked: 'add',
            dialogVisible: false,
            form: {
                title: '',
                location: '',
                seats_num: '',
                manager_id: '',
                img_map: '',
                status: 1
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
        dialogTitle() { return this.marked === 'add' ? '新增会议室' : '编辑会议室' }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/Rooms/getRoomsList', {}, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        addEditorData(val, type) {
            if(type === 'editor') {
                let param = val.row
                delete param.create_time
                delete param.room_code
                delete param.update_time
                this.form = param
            } else {
                this.form = {
                    title: '',
                    location: '',
                    seats_num: '',
                    manager_id: '',
                    img_map: '',
                    status: 1
                }
            }
            this.marked = type
            this.dialogVisible = true
        },
        submitEditor(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let param = {},
                        apiname = this.marked === 'add' ? '/Rooms/createRooms' : '/Rooms/updateRooms'
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
            this.$confirm('确定删除该会议室？', '系统通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.apiCommunication('/Rooms/deleteRooms', { room_id: val.row.room_id }, response => {
                    if (response.status === 200) {
                        this.getModuleData()
                    } else {
                        this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                    }
                })
            }).catch(() => {
                // 取消
            })
        },
        handleAvatarScucess(row) {
            // 图片上传成功钩子，接收子组件数据
            this.form.img_map = row
        },
        seatSetting(val) {
            this.$router.push({ name: 'seatSetting', params: { id: val.row.room_id } })
        }
    },
    filters: {
        meetingroomStatus(val) {
            return val === 1 ? '可用' : '不可用'
        }
    },
    components: {
        fengImageUpload
    }
}
</script>
