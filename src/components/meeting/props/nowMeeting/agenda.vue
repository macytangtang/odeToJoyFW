<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="主题" width="100"></el-table-column>
            <el-table-column prop="phone" label="起始时间" width="140"></el-table-column>
            <el-table-column prop="email" label="结束时间" width="180"></el-table-column>
            <el-table-column prop="mark" label="主持" ></el-table-column>
        </el-table>
        <div class="form-title">议程录入：</div>
        <el-form ref="form" :model="form" label-width="80px" class="content-form">
            <el-form-item label="议程编号">
                <el-select v-model="form.a" placeholder="选择编号" filterable>
                    <el-option :label="item" :value="item" v-for="item in 10" :key="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="主题">
                <el-input v-model="form.b"></el-input>
            </el-form-item>
            <el-form-item label="开始时间">
                <el-input v-model="form.c"></el-input>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-input v-model="form.d"></el-input>
            </el-form-item>
            <el-form-item label="主持人">
                <el-input v-model="form.e"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" size="small">提交信息</el-button><br>
                <el-button type="success" size="small">刷新信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 当前会议 => 会议议程
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
