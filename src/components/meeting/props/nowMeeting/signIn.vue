<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="phone" label="签到时间" width="140"></el-table-column>
        <el-table-column prop="email" label="坐席"></el-table-column>
    </el-table>
</template>

<script>
// 当前会议 => 签到情况
export default {
    props: ['nowMeeting'],
    data() {
        return {
            list: []
        }
    }
}
</script>
