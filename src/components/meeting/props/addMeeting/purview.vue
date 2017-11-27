<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="a" label="姓名" width="100"></el-table-column>
            <el-table-column prop="phone" label="职务" width="90"></el-table-column>
            <el-table-column prop="email" label="密码" width="120"></el-table-column>
            <el-table-column prop="email" label="手机" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="email" label="坐席" width="100"></el-table-column>
            <el-table-column prop="mark" label="同屏"></el-table-column>
        </el-table>
        <el-table :data="list2" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="a" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="下载" width="90"></el-table-column>
            <el-table-column prop="phone" label="上传" width=""></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [

            ],
            list2: [

            ]
        }
    }
}
</script>
