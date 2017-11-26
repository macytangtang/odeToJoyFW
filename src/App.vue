<template>
    <div id="app">
        <el-container>
            <el-header height="80px">
                <nav-header></nav-header>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <nav-aside></nav-aside>
                </el-aside>
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
    components: {
        navHeader,
        navAside,
        navFooter
    }
}
</script>
