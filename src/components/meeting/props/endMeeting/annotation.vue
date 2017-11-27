<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="材料名" width="180"></el-table-column>
        <el-table-column prop="phone" label="批注人"></el-table-column>
    </el-table>
</template>

<script>
// 已结束会议 => 批注文件
export default {
    data() {
        return {
            list: []
        }
    }
}
</script>
