<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="所属议程" width="140"></el-table-column>
            <el-table-column prop="email" label="材料所属人" width="180"></el-table-column>
            <el-table-column prop="mark" label="材料类型" ></el-table-column>
        </el-table>
    </div>
</template>

<script>
// 已结束会议 => 会议文件
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
