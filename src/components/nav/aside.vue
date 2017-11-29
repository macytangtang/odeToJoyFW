<template>
    <div class="aside-wrap">
        <!-- <i class="iconfont icon-home"></i> -->
        <el-menu :default-active="defaultElmenu" :unique-opened="true" mode="vertical" :router="true" background-color="#4549B1" text-color="#fff" active-text-color="#F0A74E">
            <el-menu-item index="/">
                <i class="el-icon-setting"></i>
                <!-- <i class="iconfont icon-home"></i> -->
                <span slot="title">我的主页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>基本设置</span>
                </template>
                <el-menu-item index="/userMana">用户管理</el-menu-item>
                <el-menu-item index="/systemEmail">系统邮箱</el-menu-item>
                <el-menu-item index="/serviceMana">服务管理</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>会议室管理</span>
                </template>
                <el-menu-item index="/meetingroomSetting">会议室设置</el-menu-item>
                <el-menu-item index="/seatSetting">坐席设置</el-menu-item>
            </el-submenu>
            <el-menu-item index="/addMeeting">
                <i class="el-icon-setting"></i>
                <span slot="title">新增会议</span>
            </el-menu-item>
            <el-menu-item index="/nowMeeting">
                <i class="el-icon-setting"></i>
                <span slot="title">当前会议</span>
            </el-menu-item>
            <el-menu-item index="/endMeeting">
                <i class="el-icon-setting"></i>
                <span slot="title">已结束会议</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
import '@/static/style/nav/index.scss'

export default {
    data () {
        return {
            isCollapse: true,
            defaultElmenu: this.$route.path,
            abc: ['asssssss']
        }
    },
    computed: {
        navCollapse() { return this.$store.getters.navCollapse }
    }
}
</script>
