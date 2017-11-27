<template>
    <div>
        <h1 class="wrap-title mar-bottom15">服务列表</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="id" label="#" width="70"></el-table-column>
                    <el-table-column prop="name" label="服务类型" width="120"></el-table-column>
                    <el-table-column prop="mark" label="备注"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-form ref="form" :model="form" label-width="80px" class="content-form">
                    <el-form-item label="服务类型">
                        <el-input v-model="form.a"></el-input>
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
                    name: '会议',
                    mark: 'sadddd'
                }
            ]
        }
    }
}
</script>
