<template>
    <div>
        <h1 class="wrap-title mar-bottom15">会议室列表</h1>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item pdd-10">
                <el-table :data="list" style="width: 100%">
                    <el-table-column prop="a" label="#" width="70"></el-table-column>
                    <el-table-column prop="b" label="会议室名称" width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="c" label="位置" width="140"></el-table-column>
                    <el-table-column prop="d" label="坐席数" width="100" ></el-table-column>
                    <el-table-column prop="e" label="负责人" width="100"></el-table-column>
                    <el-table-column prop="f" label="布局" width="130"></el-table-column>
                    <el-table-column prop="g" label="状态"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <el-row class="mar-bottom10">
            <el-col :span="24" class="el-item">
                <div class="form-title">会议室信息编辑：</div>
                <el-form ref="form" :model="form" label-width="95px" class="content-form">
                    <el-form-item label="会议室名称">
                        <el-input v-model="form.a"></el-input>
                    </el-form-item>
                    <el-form-item label="位置">
                        <el-input v-model="form.b"></el-input>
                    </el-form-item>
                    <el-form-item label="坐席数量">
                        <el-input v-model="form.c"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人">
                        <el-input v-model="form.d"></el-input>
                    </el-form-item>
                    <el-form-item label="布局">
                        <el-input v-model="form.e"></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                            <el-select v-model="form.f" placeholder="状态" filterable>
                                <el-option label="可用" :value="0"></el-option>
                                <el-option label="禁用" :value="1"></el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" size="small">提交信息</el-button><br>
                        <el-button type="success" size="small">刷新信息</el-button><br>
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
                b: '',
                c: '',
                d: '',
                e: '',
                f: 0
            },
            list: [
                {
                    a: 1001,
                    b: '李从胜',
                    c: '借我点',
                    d: 'licongsheng@163.com',
                    e: '123456',
                    f: 0,
                    g: 'jffjfj'
                }
            ]
        }
    }
}
</script>
