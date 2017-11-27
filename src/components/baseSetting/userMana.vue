<template>
    <div class="user-wrap">
        <h1 class="wrap-title mar-bottom15">用户列表</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="id" label="#" width="70"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                    <el-table-column prop="phone" label="电话" width="140"></el-table-column>
                    <el-table-column prop="email" label="邮箱" width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="password" label="密码" width="130"></el-table-column>
                    <el-table-column prop="mark" label="备注" show-overflow-tooltip></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item">
                <div class="form-title">用户信息编辑：</div>
                <el-form ref="form" :model="form" label-width="80px" class="content-form">
                    <el-form-item label="姓名">
                        <el-input v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-select v-model="form.b" placeholder="选择权限" filterable>
                            <el-option label="管理员" :value="0"></el-option>
                            <el-option label="督导员" :value="1"></el-option>
                            <el-option label="秘书" :value="2"></el-option>
                            <el-option label="其他" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.c"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.d"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.e"></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.f"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" size="small">提交信息</el-button>
                        <el-button type="success" size="small">刷新信息</el-button>
                        <el-button type="danger" size="small">删除信息</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data () {
        return {
            form: {
                a: '',
                b: 0,
                c: '',
                d: '',
                e: '',
                f: ''
            },
            list: [
                {
                    id: 1001,
                    name: '李从胜',
                    phone: 13488717674,
                    email: 'licongsheng@163.com',
                    password: '123456',
                    mark: '我是开发人员'
                }
            ]
        }
    }
}
</script>
