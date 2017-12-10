<template>
    <div>
        <el-table :data="moduleData.list" style="width: 100%">
            <el-table-column prop="attachment_id" label="#" width="70"></el-table-column>
            <el-table-column prop="title" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="所属议程" width="140"></el-table-column>
            <el-table-column prop="email" label="材料所属人" width="180"></el-table-column>
            <el-table-column prop="mark" label="材料类型" ></el-table-column>
        </el-table>
    </div>
</template>
<script>
// 已结束会议 => 会议文件
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
            this.$api.apiCommunication('/Meeting/getAttachmentList', { conference_id: this.meetingId }, response => {
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
