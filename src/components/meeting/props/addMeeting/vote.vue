<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="表决主题" width="180"></el-table-column>
            <el-table-column prop="phone" label="表决类型" width="140"></el-table-column>
            <el-table-column prop="email" label="表决项" width="180"></el-table-column>
        </el-table>
        <div class="form-title">表决录入：</div>
        <el-form ref="form" :model="form" label-width="80px" class="content-form">
            <el-form-item label="表决主题">
                <el-input v-model="form.a"></el-input>
            </el-form-item>
            <el-form-item label="表决类型">
                <el-select v-model="form.b" placeholder="选择表决类型" filterable>
                    <el-option label="表决类型1" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" size="small">提交信息</el-button>
                <el-button type="success" size="small">刷新信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 添加会议 => 会议表决
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
