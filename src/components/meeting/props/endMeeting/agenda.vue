<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="主题" width="100"></el-table-column>
            <el-table-column prop="phone" label="起始时间" width="140"></el-table-column>
            <el-table-column prop="email" label="结束时间" width="180"></el-table-column>
            <el-table-column prop="mark" label="主持" ></el-table-column>
        </el-table>
    </div>
</template>
<script>
// 已结束会议 => 会议议程
export default {
    data() {
        return {
            list: [

            ],
            form: {
                a: '',
                b: '',
                c: '',
                d: '',
                e: '',
                f: ''
            }
        }
    }
}
</script>
