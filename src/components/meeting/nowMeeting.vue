<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议列表</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <!-- <div class="">会议列表</div> -->
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="conference_id" label="#" width="50"></el-table-column>
                    <el-table-column prop="title" label="会议名称" width="250" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="status_name" label="会议状态" width="100"></el-table-column>
                    <el-table-column label="运行" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="checkMeeting(scope)" size="small" v-if="scope.row.status != '3'">查看会议</el-button>
                            <el-button type="danger" @click="startEndMeeting(scope, 'start')" size="small" v-if="scope.row.status == '1'">开始会议</el-button>
                            <el-button type="danger" @click="startEndMeeting(scope, 'end')" size="small" v-if="scope.row.status == '2'">结束会议</el-button>
                            <el-button type="danger" @click="produceNotes(scope)" size="small" v-if="scope.row.status == '3'">生成会议纪要</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 会议列表
export default {
    data () {
        return {
            nowMeeting: '',
            activeName: 'info',
            moduleData: {
                list: []
            }
        }
    },
    created() {
        this.getMeetingList()
    },
    methods: {
        getMeetingList() {
            this.$api.apiCommunication('/Meeting/getMeetingList', {}, response => {
                if (response.status === 200) {
                    if(response.data !== []) {
                        this.moduleData.list = response.data.list
                    } else {
                        this.moduleData.list = []
                    }
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        checkMeeting(val) {
            this.$router.push({ name: 'editorMeeting', params: { id: val.row.conference_id } })
        },
        startEndMeeting(val, type) {
            let _tips = type === 'start' ? '确定开始这个会议吗？' : '确定结束这个会议吗？',
                param = {
                    conference_id: val.row.conference_id,
                    status: type === 'start' ? 2 : 3
                }
            this.$confirm(_tips, '系统通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$api.apiCommunication('/Meeting/endMeeting', param, response => {
                    if (response.status === 200) {
                        this.$notify({ title: '系统通知', message: '操作成功', type: 'success' })
                        this.getMeetingList()
                    } else {
                        this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                    }
                })
            }).catch(() => {
                // 取消
            })

        },
        produceNotes(val) {

        }
    }
}
</script>
