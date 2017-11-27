<template>
    <div class="home-wrap">
        <h1 class="wrap-title mar-bottom15">我的个人信息</h1>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="info">
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
                        <el-button type="primary" size="small">刷新信息</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="会议列表" name="meeting">
                <div class="">会议列表</div>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="name" label="会议名称" width=""></el-table-column>
                    <el-table-column prop="status" label="会议状态" width="100"></el-table-column>
                    <el-table-column label="运行" width="180">
                        <template slot-scope="scope">
                            <el-dropdown trigger="click">
                                <el-button type="primary">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>查看会议详情</el-dropdown-item>
                                    <el-dropdown-item>开始这个会议</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
					    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        <el-row class="mar-bottom10 mar-top10">
            <el-col :span="24" class="el-item">
                <h1 class="home-date-title">日历</h1>
                <datepicker :inline="true" :value="newDate" calendar-class="datepicker-cont"></datepicker>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import '@/static/style/home/index.scss'
export default {
    data () {
        return {
            activeName: 'info',
            form: {
                a: '',
                b: 0,
                c: '',
                d: '',
                e: '',
                f: ''
            },
            tableData: [
                {
                    name: '	关于xxx的大会1',
                    status: '未开会'
                }
            ],
            newDate: new Date()
        }
    },
    methods: {
        handleClick(val) {

        }
    },
    components: {
        Datepicker
    }
}
</script>
