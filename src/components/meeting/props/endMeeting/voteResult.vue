<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="表决主题"></el-table-column>
    </el-table>
</template>

<script>
// 已结束会议 => 投票结果
export default {
    data() {
        return {
            list: []
        }
    }
}
</script>
