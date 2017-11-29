<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="表决主题"></el-table-column>
    </el-table>
</template>

<script>
// 当前会议 => 投票结果
export default {
    props: ['nowMeeting'],
    data() {
        return {
            list: []
        }
    }
}
</script>
