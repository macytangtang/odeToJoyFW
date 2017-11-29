<template>
    <div class="header-wrap">
        <el-button type="text" class="toggle-aside" @click="switchAside"><i class="iconfont icon-menu"></i></el-button>
        <div class="header-logo">
            <h1>方圆智汇</h1>
            <p>无纸化会议系统</p>
        </div>
		<div class="toolbar-features">
			<el-dropdown trigger="click" @command="handleCommand" @visible-change="handleVisibleChange">
				<div class="el-dropdown-link">
                    <img src="../../static/images/header.jpg" alt="头像" class="features-head">
                    <div class="features-name">
                        <h1>李从胜</h1>
                        <p>管理员</p>
                    </div>
                    <i class="features-icon" :class="arrow"></i>
				</div>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="setPassword">Setting</el-dropdown-item>
					<el-dropdown-item command="setPassword">Profile</el-dropdown-item>
					<el-dropdown-item command="setPassword">Logout</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
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
        arrow() {
            return this.arrowStatus ? 'el-icon-arrow-up' : 'el-icon-arrow-down'
        }
    },
    methods: {
        handleCommand() {

        },
        handleVisibleChange(val) {
            this.arrowStatus = val
        },
        switchAside() {
            this.$store.dispatch('switchAside', this.navCollapse ? false : true)
        }
    }
}
</script>
