import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import home from '@/components/home'
import userMana from '@/components/baseSetting/userMana.vue'
import systemEmail from '@/components/baseSetting/systemEmail.vue'
import serviceMana from '@/components/baseSetting/serviceMana.vue'
import meetingroomSetting from '@/components/meeting/meetingroomSetting.vue'
import seatSetting from '@/components/meeting/seatSetting.vue'
import addMeeting from '@/components/meeting/addMeeting.vue'
import nowMeeting from '@/components/meeting/nowMeeting.vue'
import endMeeting from '@/components/meeting/endMeeting.vue'
import notfound from '@/components/fengModule/notfound.vue'
import login from '@/components/login'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: home
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },
    {
        name: 'userMana',
        path: '/userMana',
        component: userMana
    },
    {
        name: 'systemEmail',
        path: '/systemEmail',
        component: systemEmail
    },
    {
        name: 'serviceMana',
        path: '/serviceMana',
        component: serviceMana
    },
    {
        name: 'meetingroomSetting',
        path: '/meetingroomSetting',
        component: meetingroomSetting
    },
    {
        name: 'seatSetting',
        path: '/seatSetting/:id',
        props: true,
        component: seatSetting
    },
    {
        name: 'addMeeting',
        path: '/addMeeting',
        component: addMeeting
    },
    {
        name: 'nowMeeting',
        path: '/nowMeeting',
        component: nowMeeting
    },
    {
        name: 'endMeeting',
        path: '/endMeeting',
        component: endMeeting
    },
    {
        name: 'notfound',
        path: '/404',
        component: notfound
    },
    {
        path: '*',
        redirect: '/404'
    }
]

// 路由配置
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: routes
})

// 注册导航全局钩子，检查是否已登录，是否有权限进入下个链接
router.beforeEach((to, from, next) => {
    let token = store.getters.getToken
    if (token != null && to.path == '/login') {
        // 已登录不能进入登录页
        next('/')
    }
    if (token === null && to.path !== '/login' && to.path !== '/404') {
        // 未登录
        next('/login')
    } else {
        next()
    }
})

export  default router
