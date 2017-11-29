<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议室列表</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column prop="room_id" label="#" width="70"></el-table-column>
                    <el-table-column prop="title" label="会议室名称" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="location" label="位置" width="140"></el-table-column>
                    <el-table-column prop="seats_num" label="坐席数" width="100" ></el-table-column>
                    <el-table-column prop="manager_id" label="负责人" width="100"></el-table-column>
                    <el-table-column prop="img_map" label="布局" width="130"></el-table-column>
                    <el-table-column prop="status" label="状态"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
// 会议室管理 => 坐席设置
export default {
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
            this.$api.apiCommunication('/Rooms/getRoomsList', {}, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    }
}
</script>
