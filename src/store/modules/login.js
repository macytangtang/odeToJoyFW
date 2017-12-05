/**
 * 账号登录相关
 */
import api from '@/api'
import * as types from '@/store/mutation-types'
import cookie from 'react-cookie'
import { MessageBox } from 'element-ui'

const state = {
    token: cookie.load('schdtoken') || null,
    account: cookie.load('schdaccount') || null,
    authName: cookie.load('schdauthname') || null,
    userId: cookie.load('schduserid') || null
}

const getters = {
    getToken: state => state.token,
    getAccount: state => state.account,
    getAuthName: state => state.authName,
    getUserId: state => state.userId
}

const actions = {
    /**
     * 用户登录
     */
    onLogin({ commit }, param) {
        api.apiCommunication('/User/login', param, function (response) {
            if(response.status !== 200){
                MessageBox.alert(`登录失败，请检查用户名或密码重新填写登录或者联系管理员，服务器返回信息：${response.data}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
                return false
            }
            //设置cookie过期时间
            let exp = new Date()
            exp.setTime(exp.getTime() + 1 * 24 * 60 * 60 * 1000)
            cookie.save('schdtoken', response.data.token, { path: '/', expires: exp })
            // cookie.save('schdaccount', response.data.name, { path: '/', expires: exp })
            cookie.save('schdauthname', response.data.auth_name, { path: '/', expires: exp })
            cookie.save('schduserid', response.data.user_id, { path: '/', expires: exp })
            commit(types.USER_LOGIN_SUCCESS, { response })
            window.location.reload()
        })
    },
    /**
     * 退出登录
     */
    outLogin({ commit }) {
        // 移除cookie
        cookie.remove('schdtoken', { path: '/' })
        cookie.remove('schdaccount', { path: '/' })
        cookie.remove('schdauthname', { path: '/' })
        commit(types.USER_OUT_LOGIN)
        window.location.reload()
    }
}

const mutations = {
    [types.USER_LOGIN_SUCCESS](state, { response }) {
        state.token = response.data.token
        state.account = response.data.name
        state.authName = response.data.auth_name
        state.userId = response.data.user_id
    },
    [types.USER_OUT_LOGIN](state) {
        state.token = null
        state.account = null
        state.authName = null
        state.userId = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
