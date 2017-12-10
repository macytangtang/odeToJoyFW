<template>
    <el-table :data="moduleData.list" style="width: 100%">
        <el-table-column prop="sign_in_id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="create_time" label="签到时间" width="180"></el-table-column>
        <el-table-column prop="seat_code" label="坐席"></el-table-column>
    </el-table>
</template>

<script>
// 已结束会议 => 签到情况
export default {
    props: ['meetingId'],
    data() {
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
            this.$api.apiCommunication('/Meeting/signUserList', { conference_id: this.meetingId }, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data ? response.data : []
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
    }
}
</script>
