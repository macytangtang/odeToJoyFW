<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="agenda_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="主题" width="100"></el-table-column>
            <el-table-column prop="start_time" label="起始时间" width="180"></el-table-column>
            <el-table-column prop="end_time" label="结束时间" width="180"></el-table-column>
            <el-table-column prop="hostess_id" label="主持"></el-table-column>
        </el-table>
    </div>
</template>
<script>
// 已结束会议 => 会议议程
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
            this.$api.apiCommunication('/Meeting/getAgendaList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list ? response.data.list : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    }
}
</script>
