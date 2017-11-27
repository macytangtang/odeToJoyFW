<template>
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="id" label="#" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="phone" label="职务" width="90"></el-table-column>
        <el-table-column prop="email" label="密码" width="120"></el-table-column>
        <el-table-column prop="email" label="手机" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="email" label="坐席" width="100"></el-table-column>
        <el-table-column prop="mark" label="同屏"></el-table-column>
    </el-table>
</template>
<script>
// 已结束会议 => 参会人
export default {
    data() {
        return {
            checked: true,
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
