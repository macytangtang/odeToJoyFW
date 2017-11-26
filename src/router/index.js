import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/components/home'

Vue.use(VueRouter)

// export default new VueRouter({
//     routes: [
//         {
//             path: '/',
//             name: 'HelloWorld',
//             component: HelloWorld
//         }
//     ]
// })

const routes = [
    {
        path: '/',
        name: 'home',
        component: home
    }
]

// 路由配置
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routes
})

// 注册导航全局钩子，检查是否已登录，是否有权限进入下个链接
// router.beforeEach((to, from, next) => {
    // let token = store.getters.getToken
    // if (token != null && to.path == '/login') {
    //     // 已登录不能进入登录页
    //     next('/')
    // }
    // if (token === null && to.path !== '/login' && to.path !== '/404') {
    //     // 未登录
    //     next('/login')
    // } else {
    //     next()
    // }
// })

export  default router
