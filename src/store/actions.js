import api from '@/api'
import * as types from '@/store/mutation-types'

/* 切换loading状态 */
export const switchAside = ({ commit }, param) => {
    commit(types.ASIDE_SWITCH, param)
}

/* 获取当前用户信息 */
export const getUserInfo = ({ commit }, param = {}) => {
    return new Promise((resolve, reject) => {
        api.apiCommunication('/User/getUserInfo', param, response => {
            commit(types.USER_INFO_GET, { response })
            resolve()
        })
    })
}

/* 保存当前用户信息 */
export const saveUserInfo = ({ commit }, param) => {
    commit(types.USER_INFO_SAVE, param)
}

/* 记录或清空当前新增的会议 */
export const addMeetingNum = ({ commit }, param) => {
    if(param.type === 'save') {
        commit(types.ADD_MEETING_NUM_SAVE_DEL, param.data)
    } else {
        commit(types.ADD_MEETING_NUM_SAVE_DEL, { pane: 'info', meetingId: '' })
    }
}
