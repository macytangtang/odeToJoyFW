<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="conferee_id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="title" label="职务" width="90"></el-table-column>
            <el-table-column prop="mobile" label="手机" width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="seat_code" label="坐席" width="100"></el-table-column>
            <el-table-column label="同屏">
                <template slot-scope="scope">
                    {{ scope.row.can_sync_screen | canSyncScreenStatus }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
// 已结束会议 => 参会人
export default {
    props: ['meetingId'],
    data () {
        return {
            moduleData: {
                list: []
            }
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
        }
    },
    filters: {
        canSyncScreenStatus(val) {
            return val == 1 ? '允许' : '不允许'
        }
    }
}
</script>
