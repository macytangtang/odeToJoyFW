<template>
    <div id="app">
        <el-container>
            <el-header height="80px">
                <nav-header></nav-header>
            </el-header>
            <el-container>
                <transition name="fade">
                    <el-aside width="300px" v-if="navCollapse">
                        <nav-aside></nav-aside>
                    </el-aside>
                </transition>
                <el-container>
                    <el-main>
                        <router-view/>
                    </el-main>
                    <el-footer height="50px">
                        <nav-footer></nav-footer>
                    </el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import navHeader from '@/components/nav/header.vue'
import navAside from '@/components/nav/aside.vue'
import navFooter from '@/components/nav/footer.vue'
import '@/static/style/base.scss'
export default {
    name: 'app',
    data () {
        return {
            isCollapse: true,
            defaultElmenu: this.$route.path,
            abc: ['asssssss']
        }
    },
    created() {
        this.getModuleData()
    },
    computed: {
        navCollapse() { return this.$store.getters.navCollapse },
        userId() { return this.$store.getters.getUserId }
    },
    methods: {
        getModuleData() {
            this.$api.apiCommunication('/User/getUserInfo', { user_id: this.userId }, response => {
                if (response.status === 200) {
                    this.$store.dispatch('saveUserInfo', response.data)
                } else {
                    this.$alert(`获取数据失败，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                }
            })
        }
    },
    components: {
        navHeader,
        navAside,
        navFooter
    }
}
</script>
<style>
.fade-enter-active {
    animation: fade-in .5s linear;
}
.fade-leave-active {
  animation: fade-out .5s linear;
}
@keyframes fade-in {
    from { width:0; }
      to { width:300px; }
}
@keyframes fade-out {
    from { width:300px; }
      to { width:0; }
}

</style>
