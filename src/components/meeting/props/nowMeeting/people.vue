<template>
    <div>
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
        <div class="form-title">参会人录入：</div>
        <el-form ref="form" :model="form" label-width="95px" class="content-form">
            <el-form-item label="姓名">
                <el-input v-model="form.a"></el-input>
            </el-form-item>
            <el-form-item label="会议职务">
                <el-select v-model="form.b" placeholder="选择会议职务" filterable>
                    <el-option label="议程一" :value="0"></el-option>
                    <el-option label="议程一" :value="1"></el-option>
                    <el-option label="议程一" :value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.c"></el-input>
            </el-form-item>
            <el-form-item label="手机">
                <el-input v-model="form.d"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.e"></el-input>
            </el-form-item>
            <el-form-item label="坐席">
                <el-select v-model="form.f" placeholder="选择坐席" filterable>
                    <el-option label="随机" :value="0"></el-option>
                    <el-option label="a32" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label=" ">
                <el-checkbox v-model="checked">允许该参会人发起同屏</el-checkbox>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" size="small">提交信息</el-button>
                <el-button type="success" size="small">刷新信息</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
// 当前会议 => 参会人
export default {
    props: ['nowMeeting'],
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
