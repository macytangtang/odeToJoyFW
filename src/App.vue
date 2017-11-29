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
    computed: {
        navCollapse() { return this.$store.getters.navCollapse }
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
