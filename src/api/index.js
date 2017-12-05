/**
 * api集成管理
 */
import Vue from 'vue'
import axios from 'axios'
import { basicConfig } from '@/config/'
import querystring from 'querystring'
import store from '@/store'
import { MessageBox, Notification } from 'element-ui'

export default {
    /**
      * 通用api方法
      */
    apiCommunication(apiname, param, callback, type) {
        let params = param
        if(apiname !== '/User/login') {
            Object.assign(params, { token: store.getters.getToken })
        }
        axios.post(basicConfig.API_HOST + apiname, querystring.stringify(params))
            .then(response => {
                callback(response.data)
            })
    }
}

// 添加接口回调拦截器
axios.interceptors.response.use(response => {
    if(response.status === 200) {
        if(response.data.status === 0) {
            // token过期，执行退出登录
            // store.dispatch('switchLoadingStatus', false)
            MessageBox.alert('登录失效，请重新登录', '系统通知', {
                confirmButtonText: '确定',
                type: 'error',
                callback: action => {
                    store.dispatch('outLogin')
                }
            })
        } else {
            return response
        }
    }else {
        MessageBox.alert('接口通讯失败，请尝试刷新页面或者重新登录。如果还是存在问题，请联系管理员[warning]', '系统通知', { confirmButtonText: '确定', type: 'error' })
    }
}, error => {
    // store.dispatch('switchLoadingStatus', false)
    MessageBox.alert(`接口通讯失败，请尝试刷新页面或者重新登录。如果还是存在问题，请联系管理员[error]: ${error}`, '系统通知', { confirmButtonText: '确定', type: 'error' })
    return Promise.reject(error)
})
