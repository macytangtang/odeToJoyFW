<template>
    <el-row class="mar-bottom10">
        <el-col :span="24" class="el-item pdd-10">
            <el-table :data="list" style="width: 100%">
                <el-table-column prop="id" label="#" width="70"></el-table-column>
                <el-table-column prop="name" label="姓名" width="180"></el-table-column>
                <el-table-column prop="phone" label="签到时间" width="140"></el-table-column>
                <el-table-column prop="email" label="坐席"></el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>

<script>
// 已结束会议 => 签到情况
export default {
    data() {
        return {
            list: []
        }
    }
}
</script>
