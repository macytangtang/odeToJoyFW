<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="conferee_id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="title" label="职务" width="90"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="seat_code" label="坐席" width="100"></el-table-column>
            <el-table-column label="同屏" width="100">
                <template slot-scope="scope">
                    {{ scope.row.can_sync_screen | canSyncScreenStatus }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                    <el-button type="primary" @click="editorPurview(scope)" size="small">编辑权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <template v-if="nowConfereeId">

        </template> -->

        <el-button type="primary" @click="ddsds" size="small">11111</el-button>

        <div style="width: 100%; height: 25px; background-color: #EDECED;"></div>
        <p class="mar-top10 mar-bottom10">编辑文件权限</p>
        <el-table :data="fileList" style="width: 100%">
            <el-table-column prop="attachment_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="材料名" width="180"></el-table-column>
            <el-table-column label="下载" width="110">
                <template slot-scope="scope">
                    <el-checkbox @click.native="">允许</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="上传" width="">
                <template slot-scope="scope">
                    <el-checkbox>允许</el-checkbox>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// 新增会议 => 权限管理
export default {
    data() {
        return {
            moduleData: {
                list: []
            },
            fileList: [],
            nowConfereeId: '',
            meetingId: this.$store.getters.addMeetingNum.meetingId
        }
    },
    created() {
        this.getModuleData()
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
        editorPurview(val) {
            this.nowConfereeId = val.row.conferee_id
            let param = {
                conference_id: this.meetingId,
                conferee_id: val.row.conferee_id
            }
            this.$api.apiCommunication('/User/getUserConfereesListFile', param, response => {
                if (response.status === 200) {
                    this.fileList = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        change(val) {
            console.log(val)
        },
        dwdwdwd(val) {
            console.log(val)
        },
        ddsds() {
            let param = {
                conferee_id: 1,
                conference_id: 7,
                upload_file
            }
            this.$api.apiCommunication('/Meeting/getMeetingAuth', param, response => {
                if (response.status === 200) {
                    this.fileList = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    },
    filters: {
        canSyncScreenStatus(val) {
            return val == 1 ? '允许' : '不允许'
        }
    }
}
</script>
