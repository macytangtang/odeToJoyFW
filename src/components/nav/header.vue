<template>
    <div class="header-wrap">
        <el-button type="text" class="toggle-aside" @click="switchAside"><i class="iconfont icon-menu"></i></el-button>
        <div class="header-logo">
            <h1>方圆智汇</h1>
            <p>无纸化会议系统</p>
        </div>
		<div class="toolbar-features">
			<div class="el-dropdown-link">
                <img src="../../static/images/header.jpg" alt="头像" class="features-head">
                <div class="features-name">
                    <template v-if="userInfo">
                        <h1>{{ userInfo.name }}</h1>
                        <p>{{ userInfo.auth | authStatus }}</p>
                    </template>
                </div>
                <el-button type="text" @click="outLogin"><i class="features-icon iconfont icon-iconfontloginout"></i></el-button>
			</div>
		</div>
    </div>
</template>

<script>
import '@/static/style/nav/index.scss'
export default {
    data () {
        return {
            arrowStatus: false
        }
    },
    computed: {
        navCollapse() { return this.$store.getters.navCollapse },
        account() { return this.$store.getters.getAccount },
        authName() { return this.$store.getters.getAuthName },
        userInfo() { return this.$store.getters.userInfo }
    },
    methods: {
        switchAside() {
            this.$store.dispatch('switchAside', this.navCollapse ? false : true)
        },
        outLogin() {
            this.$confirm('确定退出登录？', '系统通知', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$store.dispatch('outLogin')
            }).catch(() => {
                // 取消
            })
        }
    }
}
</script>
