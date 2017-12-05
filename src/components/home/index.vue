<template>
    <div class="home-wrap">
        <h1 class="wrap-title mar-bottom15">我的个人信息</h1>
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="基本信息" name="info">
                <el-form ref="form" :model="form" label-width="80px" class="content-form">
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-select v-model="form.auth" placeholder="选择权限" disabled filterable>
                            <el-option label="管理员" :value="0"></el-option>
                            <el-option label="督导员" :value="1"></el-option>
                            <el-option label="秘书" :value="2"></el-option>
                            <el-option label="其他" :value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="form.mobile" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input v-model="form.password" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input v-model="form.description" disabled></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <!-- <el-button type="primary" size="small" @click="refresh">刷新信息</el-button> -->
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <!-- <el-tab-pane label="会议列表" name="meeting">
                <div class="">会议列表</div>
                <el-table :data="moduleData.list" style="width: 100%">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="title" label="会议名称" width="250" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="status" label="会议状态" width="100"></el-table-column>
                    <el-table-column label="运行" min-width="180">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="" size="small">查看会议</el-button>
                            <el-button type="danger" @click="" size="small">开始会议</el-button>
					    </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane> -->
        </el-tabs>
        <!-- <el-row class="mar-bottom10 mar-top10">
            <el-col :span="24" class="el-item">
                <h1 class="home-date-title">日历</h1>
                <datepicker :inline="true" :value="newDate" calendar-class="datepicker-cont"></datepicker>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
// import Datepicker from 'vuejs-datepicker'
import '@/static/style/home/index.scss'
export default {
    data () {
        return {
            activeName: 'info',
            form: {
                // name: '',
                // auth: 1,
                // mobile: '',
                // email: '',
                // password: '',
                // description: ''
            },
            moduleData: {
                list: []
            },
            newDate: new Date()
        }
    },
    created() {
        this.getModuleData()
    },
    computed: {
        userId() { return this.$store.getters.getUserId },
        userInfo() { return this.$store.getters.userInfo }
    },
    methods: {
        getModuleData() {
            if(this.userInfo){
                this.form = this.userInfo
                return false
            }
            this.$api.apiCommunication('/User/getUserInfo', { user_id: this.userId }, response => {
                if (response.status === 200) {
                    this.form = response.data
                    this.$store.dispatch('saveUserInfo', response.data)
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        getMeetingList() {
            this.$api.apiCommunication('/Meeting/getMeetingList', {}, response => {
                if (response.status === 200) {
                    this.moduleData.list = response.data.list
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        },
        refresh() {
            this.getModuleData()
        }
    },
    filters: {
        meetingStatus(val) {
            return val === 1 ? '' : ''
        }
    }
    // components: {
    //     Datepicker
    // }
}
</script>
