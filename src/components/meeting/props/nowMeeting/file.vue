<template>
    <div>
        <el-table :data="list" style="width: 100%">
            <el-table-column prop="id" label="#" width="70"></el-table-column>
            <el-table-column prop="name" label="材料名" width="100"></el-table-column>
            <el-table-column prop="phone" label="所属议程" width="140"></el-table-column>
            <el-table-column prop="email" label="材料所属人" width="180"></el-table-column>
            <el-table-column prop="mark" label="材料类型" ></el-table-column>
        </el-table>
        <div class="form-title">材料录入：</div>
        <el-form ref="form" :model="form" label-width="95px" class="content-form">
            <el-form-item label="选择文件">
                <el-input v-model="form.a"></el-input>
            </el-form-item>
            <el-form-item label="所属议程">
                <el-select v-model="form.b" placeholder="选择所属议程" filterable>
                    <el-option label="议程一" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="材料所属人">
                <el-input v-model="form.c"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" size="small">提交信息</el-button>
                <el-button type="success" size="small">刷新信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
// 当前会议 => 会议文件
export default {
    props: ['nowMeeting'],
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
